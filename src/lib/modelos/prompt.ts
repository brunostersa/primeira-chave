import { montarDocumento } from "./documento";
import type { Modelo } from "./tipos";

/**
 * Prompt pronto para preencher o modelo com uma IA (ChatGPT, Claude, Gemini...).
 * Leva o texto do modelo junto, então funciona sem anexar arquivo. As regras do
 * prompt repetem as da marca: valor real, nada de atalho fora da regra, nada de lei inventada.
 */

/** O modelo em texto corrido, sem o aviso e sem o anexo de notas. */
export function textoDoModelo(m: Modelo) {
  return montarDocumento(m, {}, { anexo: false })
    .filter((b) => b.tipo !== "aviso" && b.tipo !== "quebra")
    .map((b) => {
      const t = "trechos" in b ? b.trechos.map((x) => x.t).join("") : "";
      if (b.tipo === "item") return `• ${t}`;
      if (b.tipo === "assinatura") return `\n_______________________________\n${t}`;
      if (b.tipo === "clausula") return `\n${t.toUpperCase()}`;
      return t;
    })
    .join("\n");
}

export function gerarPrompt(m: Modelo) {
  const grupos = [...new Set(m.campos.map((c) => c.grupo))];
  const campos = grupos
    .map((g) => `- ${g}: ${m.campos.filter((c) => c.grupo === g).map((c) => c.rotulo).join("; ")}`)
    .join("\n");
  const conferir = m.conferir.map((c) => `- ${c}`).join("\n");

  return `Você vai me ajudar a preencher um modelo de "${m.tituloDocumento}", da Primeira Chave (primeirachave.com.br). O texto do modelo está no fim desta mensagem.

Como trabalhar:
1. Me faça perguntas, poucas de cada vez e em português simples, para preencher tudo o que está entre colchetes. Os dados que faltam são:
${campos}
2. Não mude o sentido das cláusulas, não tire proteções de nenhuma das partes e não invente lei, artigo ou número. Se eu pedir uma mudança, explique em uma frase o efeito dela antes de aplicar.
3. Recuse e explique o risco se eu pedir algo fora da regra: preço diferente do valor real pago ("preço por fora"), contrato de gaveta, esconder o negócio do banco ou do cartório.
4. Antes de entregar, confira:
${conferir}
5. No fim, devolva o documento inteiro, já preenchido, pronto para eu colar no Word. Depois dele, faça uma lista curta com: o que ficou em aberto, o que eu preciso conferir em documento (matrícula, certidões) e os pontos que valem revisão de um advogado.

Lembre: isto é um modelo educativo, não parecer jurídico. Em negócio de valor alto ou com pendência, diga que eu devo pedir a revisão de um advogado.

Se eu colar o arquivo baixado em vez deste texto, use o arquivo.

=== MODELO ===
${textoDoModelo(m)}
=== FIM DO MODELO ===`;
}
