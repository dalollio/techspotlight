# Processo Incremental — Tech Spotlight

## Visao Geral

A ideia e ir montando o spotlight ao longo das semanas, sem acumular tudo
para a vespera da apresentacao. O processo se divide em 3 fases:

---

## Fase 1: Coleta (diaria)
> Responsavel: Todos | Quando: ao final de cada dia

1. Copiar o standup do Discord para `edition-XX/standup_periodo.txt`
   - Manter o formato padrao (data, nome, projeto, Done/In Progress, Calls)
   - Pode colar direto sem formatacao especial

2. Se alguma task gerou screenshot interessante, salvar em `edition-XX/assets/`
   - Nomear como `CARD-N.png` (ex: `12062-1.png`, `12062-2.png`)
   - Priorizar: dashboards, antes/depois, telas novas, erros corrigidos

**Dica:** Nao precisa ser perfeito. O objetivo e so nao perder o conteudo.

---

## Fase 2: Consolidacao (fim de cada semana)
> Responsavel: Ronaldo | Quando: sexta-feira ou segunda seguinte

1. Abrir o Claude Code (terminal ou VS Code) na pasta do projeto
2. Digitar `/tech-spotlight-web` — e um atalho que carrega todo o contexto
   da apresentacao (estrutura, blocos, tema visual, criterios)
3. Colar os standups acumulados da semana
4. O Claude vai:
   - Extrair metricas (total atividades, features, fixes, sistemas)
   - Identificar candidatos a spotlight
   - Gerar resumo parcial

2. Salvar o resumo gerado em `edition-XX/resumo/`:
   - `resumo-semana-1.md` (standups de 06/04 a 10/04)
   - `resumo-semana-2.md` (standups de 13/04 a 17/04)
   - `resumo-semana-3.md` (standups de 20/04 a 24/04)
   - `resumo-semana-4.md` (standups de 27/04 a 30/04)

3. Marcar no resumo os **potenciais spotlights** (destaques tecnicos):
   - Feature complexa com problema/solucao claros
   - Correcao de bug com impacto mensuravel
   - Arquitetura/ferramenta nova

---

## Fase 3: Montagem (1-2 dias antes da apresentacao)
> Responsavel: Ronaldo | Quando: quarta ou quinta antes da apresentacao

1. Revisar os resumos semanais e escolher:
   - 2-3 Spotlights (problema -> solucao -> resultado -> demo)
   - 1 Lightning Tech (dica tecnica de 5 min)
   - 3 Engineering Wins (reconhecimentos)
   - 3 itens de Roadmap

2. Rodar novamente o `/tech-spotlight-web` com todos os standups do periodo
   para gerar o roteiro final completo

3. Gerar o `spotlight.html` da edicao (copiar da edicao anterior e atualizar conteudo)

4. Coletar screenshots finais que faltaram

5. Testar o controle remoto:
   ```bash
   cd remote
   node server.js
   ```
   - Expor porta 3030 no VS Code (PORTS -> Public)
   - Enviar link do controle para Bruno e Thielson

---

## Checklist Rapido

```
edition-XX/
  standup_periodo.txt    <- Fase 1: colar standups diarios
  assets/                <- Fase 1: screenshots das tasks
    CARD-1.png
    CARD-2.png
  resumo/
    resumo-semana-1.md   <- Fase 2: resumo consolidado
    resumo-semana-2.md
    resumo-semana-3.md
    roteiro-final.md     <- Fase 3: roteiro da apresentacao
  spotlight.html         <- Fase 3: slides finais
  cards.html             <- Fase 3: cards individuais (opcional)
```

---

## Cronograma Edition #03 (4 semanas - excepcional)

> Excecao: dois feriados no periodo (Tiradentes 21/04 e Dia do Trabalho 01/05)
> fizeram nenhuma equipe apresentar no fim de abril, esticando o ciclo para
> 4 semanas. A partir da edition-04 voltamos ao padrao de 3 semanas.

| Semana | Dias        | Fase 1 (Coleta) | Fase 2 (Consolidacao) |
|--------|-------------|------------------|-----------------------|
| 1      | 06-10/04    | Standups diarios | Resumo sexta 10/04    |
| 2      | 13-17/04    | Standups diarios | Resumo sexta 17/04    |
| 3      | 20-24/04    | Standups diarios | Resumo sexta 24/04    |
| 4      | 27-30/04    | Standups diarios | Montagem 06-07/05     |
| Apres. | 08/05       | -                | Apresentar!           |

---

## Dicas

- **Nao espere acumular** — colar o standup leva 30 segundos
- **Screenshot no momento** — e mais facil tirar o print quando esta trabalhando
  do que tentar reproduzir depois
- **O Claude faz o trabalho pesado** — ele analisa os standups e monta o roteiro,
  voce so valida e ajusta
- **Reutilize o template** — o spotlight.html da edicao anterior e a base,
  so troca o conteudo dos slides
