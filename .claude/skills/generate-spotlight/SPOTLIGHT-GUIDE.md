---
name: spotlight-guide
description: Guia de engenharia reversa para recriar o spotlight.html. Referência completa de estrutura, estilos, slides e scripts. Use ao criar ou modificar o spotlight.html de uma edição.
---

# Guia de Recriação — spotlight.html

Referência completa para recriar o arquivo `spotlight.html` de cada edição do Tech Spotlight.

---

## 1. Visão Geral

| Aspecto | Valor |
|---------|-------|
| Tema visual | VS Code Dark |
| Fontes | Space Grotesk (headings) + JetBrains Mono (código/dados) |
| Total de slides | 13 (slide-0 a slide-12) |
| Modais | 3 (KPI, Screenshot, Terminal) |
| Controle remoto | WebSocket (host/guest) |
| Timer | Widget fixo com cronômetro |
| Navegação | Teclado (←→), sidebar, dots, tabs |

### Estrutura HTML de alto nível

```
<body>
  ├── .timer-widget          (fixo, canto superior direito)
  ├── .topbar                (barra superior com logo + tabs)
  ├── .main
  │   ├── .sidebar           (navegação lateral)
  │   └── .content           (área dos slides)
  ├── .nav-controls          (dots de navegação inferior)
  ├── .statusbar             (barra roxa inferior)
  ├── .kpi-overlay           (modal de cards/métricas)
  ├── .ss-overlay            (modal de screenshots)
  └── .term-overlay          (modal de terminal animado)
</body>
```

---

## 2. CSS — Design Tokens

### Variáveis (:root)

```css
:root {
  /* Fundos */
  --bg: #0d1117;
  --bg2: #161b22;
  --bg3: #1c2128;
  --bg4: #21262d;

  /* Bordas */
  --border: #30363d;
  --border2: #484f58;

  /* Texto */
  --text: #e6edf3;
  --text2: #8b949e;
  --text3: #6e7681;

  /* Cores de destaque */
  --purple: #a78bfa;
  --purple-d: #7c3aed;
  --purple-bg: #1a1033;
  --teal: #34d399;
  --teal-bg: #0a2218;
  --coral: #fb923c;
  --coral-bg: #2a1100;
  --blue: #60a5fa;
  --blue-bg: #0c1a2e;
  --amber: #fbbf24;
  --amber-bg: #241a00;
  --green: #4ade80;
  --red: #f87171;
  --pink: #f472b6;

  /* Tipografia */
  --font-mono: "JetBrains Mono", monospace;
  --font-sans: "Space Grotesk", sans-serif;

  /* Raios */
  --radius: 8px;
  --radius-lg: 12px;
}
```

### Google Fonts (no `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

## 3. Layout Principal

### Topbar (`.topbar`)
- Altura: 38px
- Background: `var(--bg2)`, border-bottom
- Contém: logo (dots vermelho/âmbar/verde + texto), tabs dinâmicas, info do arquivo à direita
- Tabs são geradas via JS a partir do array `labels`

### Sidebar (`.sidebar`)
- Largura: 220px
- Background: `var(--bg2)`, border-right
- Seções com headers uppercase (font-mono, 10px, letter-spacing 0.1em)
- Items com ícone + nome de arquivo, border-left ativo = `var(--purple)`
- Membros do time no rodapé com avatares circulares e dot de status

### Content (`.content`)
- Flex: 1, overflow hidden
- Slides com `display: none` / `.active` → `display: flex; flex-direction: column`
- Padding: 40px 56px
- Animação fadeIn (opacity + translateY)

### Statusbar (`.statusbar`)
- Altura: 24px
- Background: `var(--purple-d)` (roxo escuro)
- Font-mono 10px, cor branca 85%
- Itens: branch, arquivo atual, slide X/Y, info do time

### Nav Controls (`.nav-controls`)
- Dots circulares para cada slide
- Dot ativo: `var(--purple)`, inativo: `var(--border2)`

---

## 4. Componentes Reutilizáveis

### Badges
```css
.badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: var(--font-mono); font-size: 11px; font-weight: 500;
  padding: 4px 12px; border-radius: 4px;
}
```
Variações: `.badge-purple`, `.badge-teal`, `.badge-blue`, `.badge-amber`, `.badge-coral`, `.badge-green`, `.badge-red`
Cada uma usa `background: var(--COR-bg); color: var(--COR);`

### Cards com Accent
```css
.card {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 18px 20px;
}
```
Variações de borda esquerda (3px solid): `.card-accent-purple`, `.card-accent-teal`, `.card-accent-blue`, `.card-accent-coral`, `.card-accent-amber`

### Metrics
```css
.metric {
  background: var(--bg3); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 16px; text-align: center;
}
.metric-val { font-family: var(--font-mono); font-size: 36px; font-weight: 700; }
.metric-lbl { font-size: 14px; color: var(--text3); }
.metric-click { cursor: pointer; } /* abre modal KPI ao clicar */
```

### Chips e Pills
```css
.chip {
  background: var(--bg4); border: 1px solid var(--border);
  border-radius: 4px; padding: 3px 12px;
  font-family: var(--font-mono); font-size: 12px; color: var(--text2);
}
.pill {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-mono); font-size: 13px;
  padding: 6px 14px; border-radius: 20px;
  background: var(--bg4); border: 1px solid var(--border); color: var(--text2);
}
```

### Code Blocks
```css
.code-block { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
.code-block-header { padding: 10px 16px; background: var(--bg3); border-bottom: 1px solid var(--border); font-family: var(--font-mono); font-size: 11px; }
.code-body { display: flex; }
.line-numbers { padding: 14px 12px; color: var(--text3); text-align: right; border-right: 1px solid var(--border); font-family: var(--font-mono); font-size: 12px; }
.code-lines { padding: 14px 18px; font-family: var(--font-mono); font-size: 12px; line-height: 1.7; }
```
Syntax highlighting: `.kw` (keyword, purple), `.str` (string, teal), `.cmt` (comment, text3), `.num` (number, coral), `.fn` (function, blue), `.prop` (property, text), `.tag` (tag), `.ok` (green), `.err` (red)

### Progress Bars
```css
.progress-bar { height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
.progress-fill { height: 100%; transition: width 0.5s; }
```

### Grids
```css
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
```

### Overview Cards
```css
.overview-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.overview-card {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 12px 14px;
  cursor: pointer; transition: all 0.2s;
}
.overview-card:hover { border-color: var(--purple); transform: translateY(-2px); }
.overview-card-id { font-family: var(--font-mono); font-size: 10px; color: var(--text3); }
.overview-card-title { font-size: 13px; font-weight: 600; margin: 4px 0; }
.overview-card-hint { font-size: 11px; color: var(--text2); }
.overview-card-badge { margin-top: 8px; }
```

### Timeline
```css
.timeline { display: flex; flex-direction: column; gap: 0; }
.tl-item { display: flex; gap: 16px; padding-bottom: 16px; }
.tl-line { display: flex; flex-direction: column; align-items: center; }
.tl-dot { width: 10px; height: 10px; border-radius: 50%; }
.tl-connector { width: 2px; flex: 1; background: var(--border); min-height: 20px; }
.tl-time { font-family: var(--font-mono); font-size: 11px; color: var(--text3); margin-bottom: 4px; }
```

### Todo Items
```css
.todo-item {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 12px 16px; background: var(--bg2);
  border: 1px solid var(--border); border-radius: var(--radius);
}
.todo-check { width: 16px; height: 16px; border: 1.5px solid var(--border2); border-radius: 3px; flex-shrink: 0; margin-top: 2px; }
.todo-title { font-size: 14px; font-weight: 600; }
.todo-desc { font-size: 12px; color: var(--text2); }
.todo-who { font-family: var(--font-mono); font-size: 11px; color: var(--text3); }
```

### Win Cards
```css
.win-card {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 16px 20px;
  display: flex; flex-direction: column; gap: 8px;
}
.win-icon { font-size: 24px; }
.win-who { font-family: var(--font-mono); font-size: 11px; color: var(--text3); }
.win-text { font-size: 13px; color: var(--text2); line-height: 1.5; }
```

### Helpers
```css
.mb-8 { margin-bottom: 8px; }
.mb-16 { margin-bottom: 16px; }
.mb-20 { margin-bottom: 20px; }
.mb-24 { margin-bottom: 24px; }
.flex-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.section-label { font-family: var(--font-mono); font-size: 11px; color: var(--text3); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px; }
.tag-list { display: flex; flex-wrap: wrap; gap: 6px; }
.num { font-family: var(--font-mono); }
```

---

## 5. Slides — Ordem e Conteúdo

Cada slide é um `<div class="slide" id="slide-N">` dentro de `.content`.
Apenas o slide ativo tem classe `.active` (display: flex).

### Slide 0 — Capa (`slide-0`)
- **Título**: `// Tech Spotlight — Edition ${numero_edicao}`
- **Layout**: `.cover-grid` (2 colunas: info à esquerda, código à direita)
- **Conteúdo esquerdo**:
  - Ícone do time (`<img>` com `../assets/web-team.svg`)
  - Tag da edição (`.cover-tag`)
  - Título grande: "Mobile / Engineering / Team" (`.cover-title`, com `.accent` no "Engineering")
  - Subtítulo: data por extenso + duração (`.cover-subtitle`)
  - Pills com nomes dos membros (🧑‍💻 Carlos, 🧑‍💻 Elias, 🧑‍💻 Matheus)
  - Badges de tecnologias usadas no período
- **Conteúdo direito** (`.cover-code`):
  - Header: "📄 README.md — agrotrace-v3"
  - Body: bloco de código simulando classe TechSpotlight com edition, team, cards count, topics[]
- **Rodapé**: instruções de navegação (←→, F, T)

### Slide 1 — Agenda (`slide-1`)
- **Título**: `// agenda.ts`
- **Heading**: "Agenda de **hoje**"
- **Alerta**: box âmbar com tempo programado/cap/buffer
- **Timeline** (`.timeline`): 7 itens com:
  - Dot colorido (cor do apresentador/tipo)
  - Horário + apresentador + duração
  - Badge de tipo + título do tópico
- **Ordem padrão**:
  1. Abertura (Métricas) — Carlos — 2min — badge-purple
  2. Spotlight 1 — Elias — 5min — badge-blue
  3. Spotlight 2 — Matheus — 4min — badge-teal
  4. Spotlight 3 — Carlos — 5min — badge-purple
  5. Lightning Tech — Elias — 3min — badge-amber
  6. Wins — Carlos — 2min — badge-green
  7. Roadmap + Close — Carlos — 2min — badge-coral

### Slide 2 — Stats (`slide-2`)
- **Título**: `// stats.json`
- **Heading**: "Métricas do **período**" + data do período (📅 DD/MM – DD/MM/YYYY)
- **Filtros**: botões por membro (Todos, Carlos, Elias, Matheus) com `filterStats()`
- **Métricas clicáveis** (`.metric-click`, grid 5 colunas):
  - Cards entregues (purple) — abre modal com todos
  - Features (teal) — abre modal filtrado
  - Bugs corrigidos (coral) — abre modal filtrado
  - Refactors (blue) — abre modal filtrado
  - Tests (amber) — abre modal filtrado
- **Grid 2 colunas**:
  - Esquerda: sistemas atendidos (badges) + stack (chips) + cards por dev (3 métricas menores clicáveis)
  - Direita: distribuição por tipo (progress bars com gradientes)
- **IDs dinâmicos**: `mv-all`, `mv-feat`, `mv-fix`, `mv-ref`, `mv-test`, `mv-ronaldo`, `mv-bruno`, `mv-thielson`, `statsCount`, `statsDistribution`

### Slide 3 — Spotlight 1 (`slide-3`)
- **Título**: `// spotlight 1 — {nome} — {X} min`
- **Heading**: Título do destaque técnico
- **Badges**: tipo (feature/fix/ref), card IDs, tags relevantes
- **Layout**: 3 cards em coluna:
  1. **Problema** (`.card-accent-coral`): descrição do problema
  2. **Solução** (`.card-accent-purple` ou `.card-accent-teal`): lista de pontos da solução
  3. **Resultado** (`.card-accent-teal`): impacto/resultado
- **Visual extra** (opcional): grid de screenshots ou bloco de código

### Slide 4 — Spotlight 2 (`slide-4`)
- Mesma estrutura do Slide 3, com apresentador diferente
- Pode incluir `.code-block` com exemplo de código relevante

### Slide 5 — Spotlight 3 (`slide-5`)
- Mesma estrutura do Slide 3, com apresentador diferente
- Pode incluir mapa visual do dashboard ou diagrama

### Slide 6 — Overview Membro 1 (`slide-6`)
- **Título**: `// overview — {nome}`
- **Heading**: "Entregas em destaque"
- **Layout**: `.overview-grid` (grid 4 colunas)
- **Cada card** (`.overview-card`):
  - ID do card (`.overview-card-id`)
  - Título curto (`.overview-card-title`)
  - Hint/descrição (`.overview-card-hint`)
  - Badge de tipo (`.overview-card-badge`)
  - `onclick="openScreenshot('{id}', '{titulo}')"` — abre modal de screenshot
- Quantidade: 4-6 cards por membro

### Slide 7 — Lightning Tech (`slide-7`)
- **Título**: `// lightning — {nome} — {X} min`
- **Heading**: Título da tech talk rápida
- **Badges**: Lightning, tecnologia, projeto
- **Conteúdo**:
  - `.code-block` com exemplo de código real
  - Card com features/pontos-chave (grid 2x3 ou lista)
  - Card com pontos para comentar (lista numerada)
  - Chips de tecnologias relacionadas

### Slide 8 — Overview Membro 2 (`slide-8`)
- Mesma estrutura do Slide 6, para o segundo membro
- 4-6 overview cards

### Slide 9 — Overview Membro 3 (`slide-9`)
- Mesma estrutura do Slide 6, para o terceiro membro
- 4-6 overview cards

### Slide 10 — Wins (`slide-10`)
- **Título**: `// wins.log — 2 min`
- **Heading**: "Engineering Wins"
- **Layout**: `.grid-3` com 3 `.win-card`:
  - `.win-icon`: emoji representativo
  - `.win-who`: quem participou (font-mono, text3)
  - `<strong>`: título do win
  - `.win-text`: descrição do win

### Slide 11 — Roadmap (`slide-11`)
- **Título**: `// roadmap.todo — Edition #XX (DD/MM a DD/MM) — 2 min`
- **Heading**: "Próximas prioridades"
- **Layout**: lista de `.todo-item` (6 itens):
  - `.todo-check`: checkbox visual (vazio)
  - `.todo-content`:
    - `.todo-title`: título da prioridade
    - `.todo-desc`: descrição curta
    - `.todo-who`: responsável (@nome)

### Slide 12 — Exit (`slide-12`)
- **Título**: `// exit.ts`
- **Heading**: "Obrigado pela presença!"
- **Conteúdo**:
  - Mensagem de encerramento (texto simples)
  - `.code-block` com código exit.ts (team.nextDate, team.dismiss())
  - Pills: "Edition #XX concluída" + "Edition #YY — DD/MM/YYYY"

---

## 6. Sidebar — Mapeamento para Slides

A sidebar reflete a estrutura de "arquivos" do projeto. Cada item tem `id="si-N"` e `onclick="goTo(N)"`.

```
EXPLORER (header)
├── 📋 README.md          → slide-0
├── 📅 agenda.ts          → slide-1
└── 📊 stats.json         → slide-2

{MEMBRO 1} (header)
├── 🤖 {arquivo}.ts       → slide-3 (spotlight)
└── 📸 overview-{nome}.md → slide-6

{MEMBRO 2} (header)
├── ⚡ {arquivo}.ts       → slide-4 (spotlight)
└── 📸 overview-{nome}.md → slide-8

{MEMBRO 3} (header)
├── 📊 {arquivo}.ts       → slide-5 (spotlight)
└── 📸 overview-{nome}.md → slide-9

LIGHTNING (header)
└── ⚡ {arquivo}.ts       → slide-7

WRAP-UP (header)
├── 🏆 wins.log           → slide-10
├── 🗺️ roadmap.todo       → slide-11
└── 👋 exit.ts            → slide-12

── divider ──

TIME MOBILE (sidebar-team)
├── {Membro1} (av-r, dot online)
├── {Membro2} (av-b, dot online)
└── {Membro3} (av-t, dot online)
```

### Avatares dos membros na sidebar
- `.av-r`: background `var(--purple-bg)`, color `var(--purple)` — Carlos
- `.av-b`: background `var(--blue-bg)`, color `var(--blue)` — Elias
- `.av-t`: background `var(--teal-bg)`, color `var(--teal)` — Matheus

---

## 7. Modais

### Modal KPI (`.kpi-overlay`)
Exibe tabela de cards filtrada por tipo ou membro.

```html
<div class="kpi-overlay" id="kpiOverlay" onclick="if(event.target===this)closeKpiModal()">
  <div class="kpi-modal">
    <div class="kpi-modal-header">
      <div class="kpi-modal-title" id="kpiTitle">Cards</div>
      <button class="kpi-modal-close" onclick="closeKpiModal()">✕ Fechar</button>
    </div>
    <div class="kpi-modal-body">
      <table class="kpi-table">
        <thead><tr><th>#Card</th><th>Título</th><th>Tipo</th><th>Responsável</th></tr></thead>
        <tbody id="kpiBody"></tbody>
      </table>
    </div>
  </div>
</div>
```

- Aberto por `openKpiModal(kpi)` — filtra `KPI_CARDS` por tipo
- Respeita filtro de membro ativo (`statsMember`)
- Cada linha tem link para Azure DevOps: `https://dev.azure.com/ibsbiosistemico/AGROTRACE/_workitems/edit/{id}`
- Badge de tipo com cores: `KPI_COLORS` e `KPI_BG`

### Modal Screenshot (`.ss-overlay`)
Carrossel de imagens para overview cards.

```html
<div class="ss-overlay" id="ssOverlay" onclick="if(event.target===this)closeScreenshot()">
  <div class="ss-modal">
    <div class="ss-header">
      <span class="ss-card-id" id="ssCardId">#00000</span>
      <span class="ss-title" id="ssTitle">Título</span>
      <button class="ss-close" onclick="closeScreenshot()">✕ Fechar</button>
    </div>
    <div class="ss-body" id="ssBody"><!-- carrossel renderizado via JS --></div>
  </div>
</div>
```

- Aberto por `openScreenshot(cardId, title)`
- Busca imagens sequenciais: `assets/{CARD-ID}.png`, `assets/{CARD-ID}-2.png`, etc.
- Usa `probeNext()` para detectar quantas imagens existem
- Navegação: `ssNav(1)` / `ssNav(-1)` ou teclas ←→ quando modal aberto

### Modal Terminal (`.term-overlay`)
Terminal animado com sequências de comandos.

```html
<div class="term-overlay" id="termOverlay" onclick="if(event.target===this)closeTermDemo()">
  <div class="term-window">
    <div class="term-titlebar">
      <div class="dot dot-red"></div><div class="dot dot-amber"></div><div class="dot dot-green"></div>
      <div class="term-titlebar-text" id="termTitle">Terminal</div>
      <button class="term-close-btn" onclick="closeTermDemo()">✕ Fechar</button>
    </div>
    <div class="term-body" id="termBody"></div>
  </div>
</div>
```

- Aberto por `openTermDemo(which)` — `which` é chave do objeto `TERM_SEQUENCES`
- Anima linha por linha com delay configurável
- Classes de syntax: `TERM_CLASSES` mapeia prefixos para cores

---

## 8. JavaScript — Variáveis e Funções

### Variáveis Globais

```javascript
// Navegação
const slides = document.querySelectorAll(".slide");
const sidebarItems = document.querySelectorAll('[id^="si-"]');
const total = slides.length; // 13
let cur = 0;

// Labels das tabs (1 por slide)
const labels = [
  "README.md", "agenda.ts", "stats.json",
  "{spotlight1}.ts", "{spotlight2}.ts", "{spotlight3}.ts",
  "overview-{membro1}.md", "{lightning}.ts",
  "overview-{membro2}.md", "overview-{membro3}.md",
  "wins.log", "roadmap.todo", "exit.ts"
];

// Ícones das tabs (1 por slide)
const icons = ["📋","📅","📊","🤖","⚡","📊","📸","⚡","📸","📸","🏆","🗺️","👋"];

// KPI_CARDS — array com todos os cards da edição
const KPI_CARDS = [
  { id: "#12345", type: "feat", title: "Título", who: "Carlos" },
  // ...
];

// Cores e nomes para KPI
const KPI_COLORS = { feat: "var(--teal)", fix: "var(--coral)", ref: "var(--blue)", test: "var(--amber)" };
const KPI_BG = { feat: "var(--teal-bg)", fix: "var(--coral-bg)", ref: "var(--blue-bg)", test: "var(--amber-bg)" };
const KPI_NAMES = { feat: "feature", fix: "fix", ref: "refactor", test: "test" };
```

### Funções de Navegação

```javascript
function goTo(n) {
  // Desativa slide atual, ativa slide n
  // Atualiza sidebar (.active), tabs (.active), dots (.active)
  // Atualiza statusbar (arquivo atual, slide X/Y)
  // Emite slide-update via WebSocket se conectado
}
function next() { goTo(Math.min(cur + 1, total - 1)); }
function prev() { goTo(Math.max(cur - 1, 0)); }
```

### Funções de Stats

```javascript
function filterStats(member) {
  // Filtra KPI_CARDS por membro
  // Atualiza contadores: mv-all, mv-feat, mv-fix, mv-ref, mv-test
  // Atualiza contadores por dev: mv-ronaldo, mv-bruno, mv-thielson
  // Atualiza progress bars de distribuição
}
```

### Event Listeners (teclado)

```javascript
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { /* fecha modais */ }
  if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
  if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
  if (e.key === "f" || e.key === "F") { /* toggle fullscreen */ }
  if (e.key === "t" || e.key === "T") toggleTimer();
  if (e.key === "r" || e.key === "R") toggleRemote();
  // 4, 5, 6: delegação de controle (apenas host)
});
```

---

## 9. Timer Widget

### HTML
```html
<div class="timer-widget" id="timerBtn" onclick="toggleTimer()" title="Clique para iniciar (ou pressione T)">
  <span class="timer-icon" id="timerIcon">▶</span>
  <span class="timer-display" id="timerDisplay">00:00</span>
</div>
```

### CSS
- Posição: `fixed`, top 46px, right 16px, z-index 900
- Background: `var(--bg2)`, border, border-radius, box-shadow
- Estados visuais:
  - Parado: ícone ▶, cor `var(--text3)`
  - Rodando: ícone ⏸, cor `var(--teal)`
  - Warning (≥40min): cor `var(--amber)`
  - Overtime (≥50min): cor `var(--red)`

### Lógica
```javascript
let timerInterval = null, timerStart = null, timerElapsed = 0, timerRunning = false;

function toggleTimer() {
  if (!timerRunning) {
    timerStart = Date.now() - timerElapsed;
    timerInterval = setInterval(updateTimer, 1000);
    timerRunning = true;
  } else {
    clearInterval(timerInterval);
    timerElapsed = Date.now() - timerStart;
    timerRunning = false;
  }
}
function updateTimer() {
  timerElapsed = Date.now() - timerStart;
  const totalSec = Math.floor(timerElapsed / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  // Atualiza display e classes de warning/overtime
}
```

---

## 10. Controle Remoto (WebSocket)

### Conexão
- URL: `ws://` ou `wss://` + `location.host`
- Parâmetros de URL: `?role=host|guest&name=Nome`
- Reconexão automática em caso de queda

### Protocolo de mensagens

| Tipo | Direção | Campos |
|------|---------|--------|
| `join` | Cliente→Servidor | role, name, totalSlides, currentSlide |
| `session` | Servidor→Cliente | myId, hostId, controlOwnerId, clients[] |
| `slide-update` | Cliente↔Servidor | currentSlide, slideLabel, slideActions[] |
| `navigate` | Cliente→Servidor | action (next/prev/goto), slide |
| `action` | Cliente↔Servidor | action, params |
| `control-handoff` | Host→Servidor | targetId, targetName |
| `peer-update` | Servidor→Cliente | clients[], controlOwnerId |
| `error` | Servidor→Cliente | error |

### Delegação de controle (teclas do host)
- `4` → Carlos (host)
- `5` → Elias
- `6` → Matheus

### UI de Peers
- Barra fixa no canto inferior direito
- Mostra status de conexão, peers online
- ★ = host, ◉ = quem controla agora
- Flash de status temporário para feedback

---

## 11. Placeholders — O que muda entre edições

| Placeholder/Local | Exemplo | Onde |
|-------------------|---------|------|
| `${data_spotlight}` | "22/05/2026" | `<title>` |
| `${numero_edicao}` | "05" | cover-tag |
| Data por extenso | "22 de maio de 2026" | cover-subtitle |
| Período | "27/04 – 22/05/2026" | stats heading, cover-code, hero-sub |
| Duração | "30 min (target)" | cover-subtitle |
| Tempo programado | "23min · Cap: 30min · Buffer: 7min" | agenda alert |
| `KPI_CARDS[]` | array de objetos | `<script>` |
| Contadores (~50, ~25...) | números reais | métricas |
| Nomes dos membros | Carlos, Elias, Matheus | múltiplos locais |
| Sistemas atendidos | badges | slide 2 |
| Stack | chips | slide 2 |
| Topics da cover | array de strings | cover-code |
| `labels[]` | nomes de arquivo | `<script>` |
| Conteúdo dos spotlights | cards problema/solução/resultado | slides 3-5 |
| Overview cards | lista de entregas | slides 6, 8, 9 |
| Lightning tech | código + features | slide 7 |
| Wins | 3 win cards | slide 10 |
| Roadmap | 6 todo items | slide 11 |
| Próxima edição | "Edition #XX — DD/MM/YYYY" | slide 12 |
| Sidebar items | nomes de arquivo | sidebar |
| Atalhos de delegação | 4=Carlos, 5=Elias, 6=Matheus | keydown listener |

---

## 12. Ordem de Montagem (checklist)

1. Copiar `spotlight.example.html` como base
2. Substituir `${data_spotlight}` e `${numero_edicao}`
3. Substituir nomes: Ronaldo→Carlos, Bruno→Elias, Thielson→Matheus
4. Atualizar todas as datas do período
5. Preencher `KPI_CARDS[]` com dados do `cards.json`
6. Atualizar contadores de métricas (slide 2)
7. Atualizar sistemas atendidos e stack (slide 2)
8. Montar agenda/timeline (slide 1) com tópicos e tempos
9. Criar conteúdo dos 3 spotlights (slides 3-5)
10. Preencher overview cards de cada membro (slides 6, 8, 9)
11. Criar lightning tech (slide 7)
12. Preencher wins (slide 10)
13. Preencher roadmap (slide 11)
14. Atualizar exit com próxima edição (slide 12)
15. Atualizar `labels[]` e sidebar items
16. Atualizar cover-code (edition, cards, topics)
