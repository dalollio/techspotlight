# Destaques Técnicos — Edition #07

> Período: 18/07 – 07/08/2026 · Mobile Team
> Fonte: export do Azure DevOps (projeto AGROTRACE) por *Assigned To*, states `Done` e `Test QA`.
> Total: **39 cards** no time fixo — Carlos 15 · Matheus 13 · Elias 11 — **+ 1 card do Thielson**
> (apoio pontual, fora do trio fixo do time).
>
> **Nota:** os blocos "Problema → Solução → Resultado" abaixo foram montados a partir dos
> **títulos** das tasks (não temos descrição detalhada na exportação). Cada apresentador
> precisa completar com o contexto real — causa raiz, decisões tomadas, prints/telas — antes
> da apresentação. Os itens ainda em **Test QA** estão marcados; não foram para produção.
>
> **Ausência:** Carlos não estará presente nesta edição — o Elias cobre o spotlight dele
> (igual foi feito na #06), com os destaques do período reunidos por tema em vez de um
> card único em foco, já que o Elias não tem o contexto direto de cada um.

---

## 🟪 Matheus — Ajustes do PEC em teste & MVP Satélite

Sem card único em foco — destaque para o **conjunto de ajustes** que vieram dos testes
iniciais do módulo PEC (RAT, animal, diagnóstico), com as melhorias em primeiro plano e os
relatórios do PEC em segundo plano. Fecha com um overview do próximo passo: MVP de Análise
de Imagens via Satélite.

**Melhorias/ajustes do período (primeiro plano)**
- `#12946` Tela de cadastro de animal — em QA
- `#12947` Atualizar Score do animal — em QA
- `#12835` Liberar protocolo de animais lactantes
- `#12841` Alterar data do atendimento produtivo
- `#12779` Ajuste no diagnóstico pós-parto
- `#12799` Retirar recibo do RAT do módulo PEC

**Relatórios do PEC (segundo plano — mencionar rápido, sem aprofundar)**
- `#12991` Ajuste dos relatórios do PEC com problema em produção

**Próximo passo — MVP Análise de Imagens via Satélite**
Período de pesquisa concluído, pronto para começar o desenvolvimento. Ainda sem card
aberto. *(Matheus: trazer objetivo do MVP, fonte das imagens e escopo antes de
apresentar — o deck só tem o gancho, não o conteúdo.)*

**Outros cards do Matheus no período (7)**
- Done: `#12837` Módulo Financeiro — Saldo (fix) · `#12645` Trabalhar nos relatórios
  vindos do CheckMilk · `#12760` Sync de dados do Qualidade do Leite
- Em **Test QA**: `#12910` Recibo e Assinatura — Cacau/Biodiesel · `#12935` Melhorar
  pergunta GPS no Form Dinâmico · `#12950` Limite mínimo de anexos por atendimento

---

## 🟦 Carlos — O período do Carlos *(ausente — apresentado por Elias)*

Sem Carlos presente pra dar contexto, o bloco reúne os destaques dele **por tema** em
vez de aprofundar um card só — leitura direta do Elias, sem detalhe de causa raiz.

**Segurança & Login**
- `#12907` Correção da regressão que travava o login
- `#12887` Verificação/ajuste da funcionalidade de 2FA em produção
- `#12908` Melhoria do fluxo de login usando MFA

**Estabilidade**
- `#12883` Correção de crash — app fechando sozinho
- `#12868` Dificuldade ao trocar de programa
- `#12885` Impressão fora de ordem (Laudos Biodiesel-Cacau)
- `#12889` Impressão do Formulário Dinâmico falha para formulários compartilhados

**RAT**
- `#12924` Tabela de qualidade no RAT
- `#12928` Tamanho da fonte no RAT

**PEC**
- `#12899` Correção no envio dos dados do PEC
- `#12918` Ajustes no módulo PEC

**Outros**
- `#12768` Filtro de perguntas no aplicativo — criado
- `#12812` Atualizar Entidade Pessoa
- `#12978` Publicar nova versão em PROD
- `#12979` Ferramenta de análise

**Resultado**
App mais estável, login mais seguro (MFA + 2FA) e RAT mais completo.

---

## 🟩 Elias — PEC no Produtor, Respostas Recursivas & Novas Versões

Resumo do próprio Elias: *"Durante o período, foram realizadas atividades relacionadas
ao desenvolvimento, manutenção e publicação de novas versões do aplicativo."*

**PEC na visão do Produtor** — `#12610` `#12612`
Implementação do módulo PEC na visão do produtor, adicionando as funcionalidades de
listagem de animais, parto e pesagem. Pesagem (`#12612`) já concluída; o restante
(`#12610`) segue em QA.

**Respostas automáticas recursivas** — `#12997` (em QA)
Melhoria na funcionalidade de respostas automáticas do questionário diagnóstico — o
aplicativo agora responde as respostas automáticas de forma recursiva.

**Publicação de versões** — `#12980`
Preparação, validação e atualização das versões dos aplicativos **Pectrace, Agroplus,
3S e CocoaVerified** para Android e iOS, garantindo que todos estejam na versão mais
recente.

**Outros cards do Elias no período (7)**
- Done: `#12994` Backup e Instruções não funcionando (fix)
- Em **Test QA**: `#13010` Restringir safras (API) · `#13027` Data errada na
  impressão — Form Dinâmico · `#12944` Baixar dados do PEC (fix) · `#9967` App
  fechando sozinho na tela de localização da propriedade · `#12623` Restringir safras
  no APP · `#13043` Pergunta fora de ordem — Form Atividade Produtiva

---

## 💡 Elias — Dica técnica: 9Router

Sugestão de ferramenta pro time, sem vínculo com cards da sprint — [9router.com](https://9router.com/).

> O 9Router conecta suas ferramentas de código (Cursor, Claude Code, Copilot, etc.) a
> mais de 60 provedores de IA por um único endpoint. O grande truque é: quando a cota
> de um provedor acaba, ele troca sozinho para outro — de assinatura → barato → grátis
> — sem parar seu trabalho. Ainda economiza de 20 a 65% de tokens automaticamente.

---

## Wins do período (cross-team)

- **PEC segue como maior frente do time:** 8 cards distribuídos entre os três devs
  (`#12899` `#12918` `#12799` `#12991` — Carlos/Matheus · `#12610` `#12612` `#12944` —
  Elias · `#13036` — Thielson).
- **Estabilidade:** 2 crashes corrigidos — `#12883` (Carlos) e `#9967` (Elias, em QA).
- **Formulário Dinâmico:** 4 ajustes/correções no período — `#12889` (Carlos),
  `#12935` `#13027` `#13043` (Elias/Matheus, em QA).
- **Segurança de acesso:** MFA + 2FA reforçados por Carlos (`#12887` `#12907` `#12908`)
  — coberto no Spotlight 2, pelo Elias.

**Nota:** `#13036` (Adicionar escore no diagnóstico) foi trabalhado pelo **Thielson**,
que não faz parte do trio fixo do time — vale decidir se ele participa da apresentação
ou se o card entra como menção rápida no wrap-up.

---

## Agenda (30min — rascunho, ajustar tempos)

| Horário | Quem | Bloco |
|---|---|---|
| 00:00 – 04:00 · 4min | Elias | Abertura & Métricas do período |
| 04:00 – 12:00 · 8min | Matheus | Spotlight 1 — Ajustes do PEC em teste & MVP Satélite |
| 12:00 – 18:00 · 6min | Elias (pelo Carlos) | Spotlight 2 — O período do Carlos |
| 18:00 – 24:00 · 6min | Elias | Spotlight 3 — PEC no Produtor, Respostas Recursivas & Novas Versões |
| 24:00 – 27:00 · 3min | Elias | Dica técnica — 9Router |
| 27:00 – 30:00 · 3min | Matheus | Wrap-up — Wins & Roadmap |

## Sistemas / temas do período

Agrotrace · PEC (Pecuária) · RAT · Form Dinâmico · Login &amp; MFA/2FA · Análise de
Imagens via Satélite (pesquisa → MVP) — *lista construída a partir dos títulos das
tasks + o novo tema do Matheus; revisar se cobre a stack técnica real usada.*

### Pendências
- [ ] Matheus: trazer objetivo, fonte das imagens e escopo do MVP Satélite antes de
      apresentar — hoje só existe o gancho no deck.
- [ ] Elias agora carrega 3 blocos seguidos (spotlight do Carlos + o dele + a dica
      técnica do 9Router) — ver se o tempo fecha no ensaio.
- [ ] Confirmar se Thielson apresenta o `#13036` ou se fica como menção.
- [ ] Screenshots em `assets/` (padrão `{CARD-ID}.png`) — sugeridos: `12946`, `12907`,
      `12610`, `12997`.
- [ ] `standup_periodo.txt` já tem os standups reais de 18/07–07/08 — conferir se
      cobre o período inteiro antes da apresentação.
