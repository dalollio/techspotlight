const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Serve the entire project (index.html, editions, assets, etc.)
const projectRoot = path.join(__dirname, '..');
app.use(express.static(projectRoot));

// ── Session state ─────────────────────────────────────────────
// New protocol: each client joins with { role: 'host'|'guest', name }
// Exactly one hostId (last host wins). controlOwnerId is who actually
// drives navigation/actions right now. Host can always reclaim via
// control-handoff. If controlOwnerId disconnects, control returns to
// the host (or null if no host is connected).
let nextId = 1;
const clients = new Map(); // ws -> { id, name, role }
let hostId = null;
let controlOwnerId = null;
let currentSlide = 0;
let totalSlides = 0;
let slideLabel = '';
let slideActions = [];

function clientList() {
  return [...clients.values()].map(c => ({ id: c.id, name: c.name, role: c.role }));
}

function broadcast(msg, excludeWs = null) {
  const data = JSON.stringify(msg);
  wss.clients.forEach(c => {
    if (c !== excludeWs && c.readyState === 1) c.send(data);
  });
}

function sendTo(ws, msg) {
  if (ws.readyState === 1) ws.send(JSON.stringify(msg));
}

function sessionPayload(extras = {}) {
  return {
    type: 'session',
    hostId,
    controlOwnerId,
    clients: clientList(),
    currentSlide,
    totalSlides,
    slideLabel,
    slideActions,
    ...extras
  };
}

function broadcastSession() {
  broadcast(sessionPayload());
}

function findWsById(id) {
  for (const [ws, c] of clients) if (c.id === id) return ws;
  return null;
}

function findWsByName(name) {
  const target = String(name || '').toLowerCase();
  for (const [ws, c] of clients) if (c.name.toLowerCase() === target) return ws;
  return null;
}

wss.on('connection', (ws) => {
  const id = nextId++;
  console.log(`[${id}] Nova conexao`);

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    switch (msg.type) {

      // ── Handshake ──────────────────────────────────────────
      case 'join': {
        const role = msg.role === 'guest' ? 'guest' : 'host';
        const name = String(msg.name || (role === 'host' ? 'Host' : 'Guest')).slice(0, 40);
        clients.set(ws, { id, name, role });

        if (role === 'host') {
          // Host always reclaims control on (re)connect.
          hostId = id;
          controlOwnerId = id;
          if (typeof msg.totalSlides === 'number') totalSlides = msg.totalSlides;
          if (typeof msg.currentSlide === 'number') currentSlide = msg.currentSlide;
          console.log(`[${id}] HOST: ${name} (slides=${totalSlides})`);
        } else {
          console.log(`[${id}] GUEST: ${name}`);
          // If nobody has control at all (no host yet), give it to this guest
          // as a temporary fallback so the show keeps moving.
          if (controlOwnerId == null) controlOwnerId = id;
        }

        sendTo(ws, sessionPayload({ myId: id }));
        broadcastSession();
        break;
      }

      // ── Navigation / Action (only current control owner) ──
      case 'navigate': {
        const sender = clients.get(ws);
        if (!sender || sender.id !== controlOwnerId) return;
        broadcast({
          type: 'navigate',
          action: msg.action,
          slide: msg.slide,
          from: sender.name,
          fromId: sender.id
        }, ws);
        break;
      }

      case 'action': {
        const sender = clients.get(ws);
        if (!sender || sender.id !== controlOwnerId) return;
        broadcast({
          type: 'action',
          action: msg.action,
          params: msg.params || {},
          from: sender.name,
          fromId: sender.id
        }, ws);
        break;
      }

      case 'slide-update': {
        const sender = clients.get(ws);
        if (!sender || sender.id !== controlOwnerId) return;
        if (typeof msg.currentSlide === 'number') currentSlide = msg.currentSlide;
        if (typeof msg.slideLabel === 'string') slideLabel = msg.slideLabel;
        if (Array.isArray(msg.slideActions)) slideActions = msg.slideActions;
        broadcast({
          type: 'slide-update',
          currentSlide,
          slideLabel,
          slideActions,
          fromId: sender.id
        }, ws);
        break;
      }

      // ── Control delegation (host only) ────────────────────
      case 'control-handoff': {
        const sender = clients.get(ws);
        if (!sender || sender.id !== hostId) {
          sendTo(ws, { type: 'error', error: 'Somente o host pode delegar controle' });
          return;
        }
        let targetWs = null;
        if (typeof msg.targetId === 'number') targetWs = findWsById(msg.targetId);
        else if (msg.targetName) targetWs = findWsByName(msg.targetName);

        if (!targetWs) {
          sendTo(ws, { type: 'error', error: `Alvo nao encontrado: ${msg.targetName || msg.targetId}` });
          return;
        }
        const target = clients.get(targetWs);
        controlOwnerId = target.id;
        console.log(`[${sender.id}] HANDOFF -> [${target.id}] ${target.name}`);
        broadcastSession();
        break;
      }
    }
  });

  ws.on('close', () => {
    const c = clients.get(ws);
    if (!c) {
      console.log(`[${id}] Desconectado (sem sessao)`);
      return;
    }
    console.log(`[${id}] Desconectado: ${c.name} (${c.role})`);
    clients.delete(ws);

    if (c.id === hostId) {
      hostId = null;
      if (controlOwnerId === c.id) controlOwnerId = null;
    } else if (c.id === controlOwnerId) {
      // Guest with control dropped — return control to the host
      controlOwnerId = hostId;
    }

    broadcastSession();
  });
});

const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
  console.log(`\n  Tech Spotlight Server`);
  console.log(`  Hub:       http://localhost:${PORT}`);
  console.log(`  Spotlight: http://localhost:${PORT}/edition-07/spotlight.html`);
  console.log(`  Host:     http://localhost:${PORT}/edition-07/spotlight.html?role=host&name=Carlos\n`);
  console.log(`  Guest:     http://localhost:${PORT}/edition-07/spotlight.html?role=guest&name=Matheus\n`);
  console.log(`  Guest:     http://localhost:${PORT}/edition-07/spotlight.html?role=guest&name=Elias\n`);
});
