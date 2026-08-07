---
name: new-edition-scaffold
description: Cria o diretório edition-last com toda a estrutura de subdiretórios e arquivos necessários para iniciar uma nova edição do Spotlight. Use quando for preparar o ambiente para a próxima edição.
---

# Scaffold — Nova Edição do Spotlight

Cria o diretório `./edition-last/` com a estrutura completa para uma nova edição.

## Estrutura a criar

```
edition-last/
├── assets/
│   └── .gitkeep
├── resumo/
│   ├── .gitkeep
│   ├── cards.json          (vazio)
│   └── tasks.xlsx          (placeholder — usuário adiciona depois)
└── standup_periodo.txt     (vazio)
```

## Informações a solicitar ao usuário

1. **Data prevista do Spotlight** — data da apresentação (ex: "05/06/2026")
2. **Período da edição** — intervalo coberto (ex: "23/05 – 05/06/2026")

## Execução

1. Verificar se `./edition-last/` já existe. Se existir, avisar o usuário e perguntar se deseja sobrescrever.
2. Determinar o número da próxima edição verificando o último diretório `edition-*` existente e incrementando.
3. Criar o diretório `./edition-last/`
4. Criar `./edition-last/assets/.gitkeep` (arquivo vazio)
5. Criar `./edition-last/resumo/.gitkeep` (arquivo vazio)
6. Criar `./edition-last/resumo/cards.json` (arquivo vazio)
7. Criar `./edition-last/standup_periodo.txt` (arquivo vazio)
8. Atualizar `./index.html`:
   - Alterar o status do card da edição anterior de `today`/`next` para `done` ("Apresentado")
   - Adicionar novo card como primeiro item do grid com status `next` ("Próxima")
   - Adicionar atalho de teclado no `<script>` para a nova edição
   - Atualizar o footer com os atalhos disponíveis
   - Descomentar cards de edições anteriores que estejam comentados
9. Informar ao usuário que a estrutura está pronta e que ele deve:
   - Adicionar o arquivo `tasks.xlsx` em `edition-last/resumo/`
   - Colar standups diários em `standup_periodo.txt`
   - Adicionar screenshots em `assets/` conforme as tasks forem concluídas

### Formato do card no index.html

```html
<div class="card upcoming">
  <div class="card-header">
    <span class="card-edition">#XX</span>
    <span class="card-status next">Próxima</span>
  </div>
  <div class="card-date">DD/MM/YYYY</div>
  <div class="card-period">Período: <code>DD/MM – DD/MM/YYYY</code></div>
  <div class="card-actions">
    <span class="btn-disabled">▶ Spotlight</span>
    <span class="btn-disabled">📋 Cards</span>
  </div>
</div>
```

> Nota: O card usa classe `upcoming` e botões desabilitados (`btn-disabled`) pois a edição ainda não foi gerada. A skill `generate-spotlight` atualizará para links ativos ao final do processo.

## Notas

- O `tasks.xlsx` é exportado manualmente do Azure DevOps pelo usuário
- Screenshots seguem o padrão de nomenclatura: `{CARD-ID}.png`, `{CARD-ID}-2.png`, etc.
- O `standup_periodo.txt` é preenchido incrementalmente ao longo do período
- Após o período, usar a skill `generate-spotlight` para processar tudo
