# Tech Spotlight — Web Team

Central de apresentações do time Web. Cada edição é um "deck" HTML standalone
com tema VS Code (cada slide simula um arquivo aberto na IDE), apresentado a
cada 3 semanas nas sextas-feiras.

**Time:** Ronaldo (Head), Bruno, Thielson

---

## Estrutura do repositório

```
.
├── index.html                  # Hub com a lista de todas as edições
├── assets/
│   └── web-team.svg            # Ícone/logo do time (usado como favicon e capa)
│
├── edition-01/                 # Apresentação de 13/03/2026 (placeholder)
├── edition-02/                 # Apresentação de 02/04/2026 (última realizada)
│   ├── spotlight.html          # Deck principal
│   ├── cards.html              # Lista de cards da sprint
│   ├── standup_periodo.txt     # Standups brutos coletados no período
│   ├── assets/                 # Screenshots referenciados no deck
│   └── resumo/                 # Resumos intermediários do período
│
├── edition-03/                 # Apresentação de 08/05/2026 (em construção)
│   ├── spotlight.html
│   ├── standup_periodo.txt
│   └── resumo/
│       ├── PROCESSO.md         # Documentação do fluxo incremental
│       ├── resumo-semana-1.md
│       └── roteiro-parcial.md
│
└── remote/                     # Servidor Node para controle remoto
    ├── server.js               # Express + WebSocket
    └── package.json
```

---

## Como rodar localmente

Abrir os decks diretamente pelo navegador (file://) funciona para ver os
slides, mas **sem** o controle remoto colaborativo. Para ter o controle
compartilhado entre os 3 apresentadores, suba o servidor:

```bash
cd remote
npm install          # uma vez
node server.js
```

O servidor sobe na porta `3030` e serve o projeto inteiro:

- Hub:       http://localhost:3030
- Host:      http://localhost:3030/edition-03/spotlight.html?role=host&name=Ronaldo
- Guest:     http://localhost:3030/edition-03/spotlight.html?role=guest&name=Bruno
- Guest:     http://localhost:3030/edition-03/spotlight.html?role=guest&name=Thielson

Para compartilhar o controle com quem está geograficamente distante, use o
**Port Forwarding do VS Code** (painel PORTS → Forward a Port 3030 → Public)
e envie o link do tunnel para o time.

---

## Controle remoto colaborativo

O deck suporta múltiplos clientes no mesmo WebSocket, com delegação de controle:

- **Host** (`?role=host`): sempre tem prioridade e nunca perde controle
  inesperadamente. Navega livremente.
- **Guest** (`?role=guest`): vê o mesmo slide do host em tempo real. Só
  consegue navegar/interagir quando o host delega o controle.

### Teclas do host

- `←` / `→` ou `↑` / `↓` — navegar entre slides
- `F` — tela cheia
- `T` — cronômetro
- `R` — reconectar o remoto
- `4` — devolver controle para Ronaldo (host)
- `5` — passar controle para Bruno
- `6` — passar controle para Thielson

Se o guest com controle cai, o controle volta automaticamente para o host.

A barra de peers no canto inferior direito mostra quem está conectado e quem
tem o controle (★ = host, ◉ = quem controla agora).

---

## Como contribuir (Bruno & Thielson)

A ideia é que cada um tenha liberdade para criar o que quiser na sua parte da
apresentação — slides, demos, screenshots, o que fizer sentido para o destaque
técnico que vai apresentar.

### Fluxo de trabalho

1. **Clonar e criar branch:**
   ```bash
   git clone <repo>
   cd tech-spotlight
   git checkout -b feat/<seu-nome>-<assunto>
   ```

2. **Trabalhar na sua parte** dentro da edição atual
   (ex: `edition-03/`):
   - Adicionar screenshots em `edition-XX/assets/` (nomear como `CARD-N.png`)
   - Editar os slides que são seus dentro do `spotlight.html`
     (geralmente o `overview-<seunome>.md` e o spotlight que vai apresentar)
   - Se precisar de um slide novo, copie o padrão de um slide existente

3. **Testar localmente** abrindo o `edition-XX/spotlight.html`:
   - Via `file://` (rápido, sem controle remoto)
   - Ou via `node remote/server.js` para testar com o protocolo host/guest

4. **Abrir um PR para `master`:**
   ```bash
   git add edition-XX/
   git commit -m "feat(edition-XX): <descrição>"
   git push -u origin feat/<seu-nome>-<assunto>
   ```
   Depois abre um Pull Request no GitHub apontando para `master`.

5. Quando o PR for aceito e eu atualizar a cópia local aqui, o conteúdo
   entra na versão final que vou apresentar.

### O que editar

Cada apresentador tem um slide de overview próprio dentro de
`edition-XX/spotlight.html` (procure por `overview-bruno.md` ou
`overview-thielson.md`). Fiquem à vontade para:

- Alterar o conteúdo do seu overview
- Criar slides de spotlight para o destaque técnico que vão apresentar
- Adicionar screenshots em `edition-XX/assets/`
- Criar arquivos `.md` em `edition-XX/resumo/` com notas pessoais, rascunhos, etc.

**Evitar:** mexer nos slides de outras pessoas sem alinhar antes, nem no
`remote/` (protocolo do controle remoto) a não ser que seja uma melhoria que
queira propor.

---

## Processo incremental

O detalhamento do fluxo de coleta (standups diários → resumos semanais →
montagem final do deck) está em
[`edition-03/resumo/PROCESSO.md`](edition-03/resumo/PROCESSO.md).

Resumo: não deixar para acumular tudo na véspera. Colar os standups do dia
(30 segundos), salvar screenshots no momento em que a task é feita, e rodar
o consolidado uma vez por semana.
