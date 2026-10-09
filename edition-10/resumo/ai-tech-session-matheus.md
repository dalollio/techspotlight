# AI Tech Session — Matheus

Fine-tuning do Julia-1 para busca por tela na PEC.

---

**Tema**: Fine-tuning do Julia-1 para busca por tela na PEC

**Ferramenta(s)**: Julia-1 (144M, ONNX Runtime) · PyTorch · SQLite FTS5 · LoRA

**Fluxo/demo**: 6 rodadas de treino — dataset, fine-tuning, avaliação e export pra ONNX — de 57% zero-shot a 93% na bateria de tela e 85% com busca por palavra-chave (FTS5) no aparelho.

**Problema**: o modelo decorava os exemplos em vez de generalizar — frases citando o processo (inseminação, protocolo) perto do resultado confundiam a resposta, e treinar áreas novas sozinhas apagava o que já tinha aprendido.

**Motivação**: o app roda 100% offline — a tela certa precisa ser decidida sem internet, e cada ponto de acerto a menos é fricção real pro usuário no campo.

**Solução**: pipeline próprio (dataset → treino → avaliação → export), perguntas hierárquicas em vez de uma lista única de opções, regras de negócio fixas com o usuário, FTS5 como primeira camada de busca e LoRA + pré-treino de domínio nas rodadas finais.

---

## 📝 Campos obrigatórios no slide

| Campo | Valor |
|-------|-------|
| `// título` | Fine-tuning do Julia-1 para busca por tela na PEC |
| `Ferramenta(s):` | Julia-1 (144M, ONNX Runtime) · PyTorch · SQLite FTS5 · LoRA |
| `Fluxo/demo:` | 6 rodadas de treino — de 57% zero-shot a 93% na bateria de tela |
| `Problema / Motivação / Solução` | ver acima |
