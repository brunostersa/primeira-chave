import type { Perfil } from "@/lib/financiamento/engine";
import type { Estado } from "./estado";

// O resultado do simulador vai para o João pela memória da aba (sessionStorage), nunca pela URL:
// renda e dívidas não podem aparecer no endereço nem na medição de visitas.
const CHAVE = "joao:do-simulador";

export function levarAoJoao(perfil: Perfil) {
  lido = null;
  try {
    sessionStorage.setItem(CHAVE, JSON.stringify(perfil));
  } catch {
    /* sem armazenamento: o João abre do zero e pergunta o que precisar */
  }
}

// Lido uma vez por carga de página e guardado aqui: se a tela montar de novo (o React faz isso
// em desenvolvimento), a segunda montagem recebe as mesmas respostas em vez de nada.
// Vale só por instantes, para não reaplicar as mesmas respostas numa visita seguinte ao João.
let lido: { perfil: Perfil | null; ate: number } | null = null;

function lerUmaVez(): Perfil | null {
  if (lido && Date.now() < lido.ate) return lido.perfil;
  let perfil: Perfil | null = null;
  try {
    perfil = JSON.parse(sessionStorage.getItem(CHAVE) ?? "null");
    sessionStorage.removeItem(CHAVE);
  } catch {
    perfil = null;
  }
  lido = { perfil, ate: Date.now() + 3000 };
  return perfil;
}

/** Se a pessoa veio do simulador, junta as respostas dela ao plano. */
export function trazerDoSimulador(e: Estado): Estado | null {
  const perfil = lerUmaVez();
  if (!perfil || !perfil.renda) return null;
  const achou = perfil.achou === "sim" && perfil.valor > 0;
  return {
    ...e,
    perfil,
    imovel: achou ? { ...e.imovel, preco: perfil.valor, avaliacao: perfil.avaliou ? perfil.avalReal : 0, tipo: perfil.tipo } : e.imovel,
    momento: achou ? "imovel" : e.momento,
    comecou: true,
  };
}
