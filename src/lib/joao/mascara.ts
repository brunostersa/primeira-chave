/** Tira CPF, telefone e e-mail do que a pessoa escreveu antes de sair do navegador. */
export function mascarar(t: string) {
  return t
    .replace(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g, "[CPF removido]")
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, "[e-mail removido]")
    .replace(/(?<![\d.,])(?:\+?55[\s-]?)?\(?\b\d{2}\)?[\s-]?9?\d{4}[\s-]?\d{4}\b/g, "[telefone removido]");
}
