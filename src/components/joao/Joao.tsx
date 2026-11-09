"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, ChevronDown } from "lucide-react";
import { Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import { JoaoDeBarro, type Humor } from "@/components/brand/JoaoDeBarro";
import {
  abrirLink,
  avisarErro,
  falar,
  salvarLink,
  type Compra,
  type Fonte,
  type Pendente,
  type RespostaJoao,
  type ResultadoFerramenta,
  type Turno,
} from "@/lib/joao/api";
import {
  aplicar,
  contaDoPlano,
  contaParaOJoao,
  ESTADO_VAZIO,
  fases,
  linhaDoTempo,
  resumoDoPlano,
  ROTULOS,
  textoDoCampo,
  type Anotacao,
  type Estado,
} from "@/lib/joao/estado";
import { brl } from "@/lib/format";
import { mascarar } from "@/lib/joao/mascara";
import { deuVoltas, saidaPorRegra, type TipoSaida } from "@/lib/joao/saidas";
import { Comeco } from "./Comeco";
import { GuardarLink } from "./GuardarLink";
import { MeuPlano } from "./Painel";
import { Saida } from "./Saida";

type Mensagem =
  | { de: "pessoa"; texto: string }
  | {
      de: "joao";
      texto: string;
      humor: Humor;
      fontes: Fonte[];
      tipo?: RespostaJoao["tipo"];
      avisou?: boolean;
    }
  | { de: "saida"; tipo: TipoSaida }
  | {
      de: "proposta";
      campos: Anotacao;
      situacao: "aberta" | "anotada" | "recusada";
    };

const ABERTURA: Mensagem = {
  de: "joao",
  humor: "gentil",
  fontes: [],
  texto:
    "Oi, eu sou o João, uma inteligência artificial da Primeira Chave. Explico a compra do imóvel em Goiânia com base nas páginas do site. Não sou banco e não aprovo crédito. Evite escrever CPF ou documentos aqui. Por onde quer começar?",
};
const ATALHOS = [
  "Pago aluguel. Quanto daria de parcela?",
  "Tenho o nome sujo. Ainda dá para comprar?",
  "Quanto consigo financiar?",
];
const LOCAL = "joao:compra";

/** O pássaro ao lado de cada fala: o rosto acompanha o tom da resposta. */
function Avatar({ humor }: { humor: Humor }) {
  return (
    <span
      aria-hidden
      className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-mark-soft"
    >
      <JoaoDeBarro pose="frente" humor={humor} className="w-7" />
    </span>
  );
}

const lerLocal = (): Compra | null => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL) ?? "null");
  } catch {
    return null;
  }
};

export function Joao() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([ABERTURA]);
  const [estado, setEstado] = useState<Estado>(ESTADO_VAZIO);
  const [planoAberto, setPlanoAberto] = useState(false);
  const [texto, setTexto] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [carregou, setCarregou] = useState(false);
  const [escolhida, setEscolhida] = useState<string | null>(null);
  const api = useRef<unknown[]>([]);
  const estadoAtual = useRef(estado);
  const conversa = useRef<HTMLDivElement>(null);
  const plano = useRef<HTMLDivElement>(null);

  useEffect(() => {
    estadoAtual.current = estado;
  }, [estado]);

  const restaurar = (c: Compra) => {
    api.current = c.api;
    setMensagens(c.mensagens as Mensagem[]);
    setEstado(c.estado);
  };

  // O link mora depois do #: não vai para o servidor do site nem para a medição de visitas.
  useEffect(() => {
    const t = new URLSearchParams(location.hash.slice(1)).get("c");
    (async () => {
      try {
        if (t) {
          restaurar((await abrirLink(t)).compra);
          setToken(t);
        } else {
          const c = lerLocal();
          if (c) restaurar(c);
        }
      } catch (e) {
        setErro((e as Error).message);
      }
      setCarregou(true);
    })();
  }, []);

  const compra = useCallback(
    (): Compra => ({ mensagens, api: api.current, estado }),
    [mensagens, estado],
  );

  useEffect(() => {
    if (!carregou) return;
    if (!token) {
      try {
        localStorage.setItem(LOCAL, JSON.stringify(compra()));
      } catch {
        /* navegador sem armazenamento: a conversa vale só por esta visita */
      }
      return;
    }
    const espera = setTimeout(
      () =>
        salvarLink(token, compra()).catch(() =>
          setErro(
            "Não deu para guardar agora. Tentamos de novo na próxima mudança.",
          ),
        ),
      1500,
    );
    return () => clearTimeout(espera);
  }, [carregou, token, compra]);

  // Rola só a caixa da conversa: a página fica onde a pessoa deixou.
  useEffect(() => {
    conversa.current?.scrollTo({
      top: conversa.current.scrollHeight,
      behavior: "smooth",
    });
  }, [mensagens, ocupado, planoAberto]);

  const paradas = linhaDoTempo(estado);
  const atual = paradas.find((p) => p.atual);
  const aberta = escolhida ?? atual?.id ?? "";

  const rolarAte = (id: string) => {
    const caixa = plano.current;
    const alvo = caixa?.querySelector<HTMLElement>(`[data-parada="${id}"]`);
    if (caixa && alvo)
      caixa.scrollTo({
        top:
          alvo.getBoundingClientRect().top -
          caixa.getBoundingClientRect().top +
          caixa.scrollTop -
          16,
        behavior: "smooth",
      });
  };

  // Ao abrir o plano ou resolver uma etapa, ele mostra o passo da vez sem a pessoa procurar.
  const idAtual = atual?.id;
  useEffect(() => {
    if (planoAberto && idAtual) rolarAte(idAtual);
  }, [planoAberto, idAtual]);

  const mudarToken = (t: string | null) => {
    setToken(t);
    if (t) {
      history.replaceState(null, "", `#c=${t}`);
      return;
    }
    history.replaceState(null, "", location.pathname);
    try {
      localStorage.removeItem(LOCAL);
    } catch {
      /* nada guardado */
    }
    api.current = [];
    setMensagens([ABERTURA]);
    setEstado(ESTADO_VAZIO);
  };

  const executar = (p: Pendente): ResultadoFerramenta => {
    if (p.nome === "calcular_plano")
      return {
        type: "tool_result",
        tool_use_id: p.id,
        content: JSON.stringify(contaParaOJoao(estadoAtual.current)),
      };
    setMensagens((m) => [
      ...m,
      { de: "proposta", campos: p.entrada as Anotacao, situacao: "aberta" },
    ]);
    return {
      type: "tool_result",
      tool_use_id: p.id,
      content: JSON.stringify({
        status:
          "mostrado à pessoa, que confirma na tela. Ainda não está anotado.",
      }),
    };
  };

  const enviar = async (bruto: string) => {
    const limpo = mascarar(bruto.trim()).slice(0, 1500);
    if (!limpo || ocupado) return;
    setTexto("");
    setErro("");
    setOcupado(true);
    setMensagens((m) => [...m, { de: "pessoa", texto: limpo }]);
    // Crise, disputa e pedido de pessoa não dependem do modelo, e o texto fica no navegador.
    const saida = saidaPorRegra(limpo);
    if (saida) {
      setMensagens((m) => [...m, { de: "saida", tipo: saida }]);
      setOcupado(false);
      return;
    }
    try {
      let r: Turno = await falar({
        api: api.current,
        texto: limpo,
        plano: resumoDoPlano(estadoAtual.current),
      });
      // O limite evita um laço sem fim se o modelo pedir ferramenta sem parar.
      for (let i = 0; r.pendentes?.length && i < 4; i++) {
        const resultados = [
          ...(r.parciais ?? []),
          ...r.pendentes.map(executar),
        ];
        r = await falar({
          api: r.api,
          resultados,
          plano: resumoDoPlano(estadoAtual.current),
        });
      }
      api.current = r.api;
      const resposta = r.resposta;
      if (resposta) {
        setMensagens((m) => {
          const novas: Mensagem[] = [
            ...m,
            {
              de: "joao",
              texto: resposta.texto,
              humor: resposta.humor,
              fontes: resposta.fontes,
              tipo: resposta.tipo,
            },
          ];
          return deuVoltas(novas)
            ? [...novas, { de: "saida", tipo: "geral" }]
            : novas;
        });
      }
    } catch (e) {
      setErro((e as Error).message);
    }
    setOcupado(false);
  };

  const responderProposta = (i: number, aceitou: boolean) => {
    setMensagens((m) =>
      m.map((x, j) =>
        j === i && x.de === "proposta"
          ? { ...x, situacao: aceitou ? "anotada" : "recusada" }
          : x,
      ),
    );
    const p = mensagens[i];
    if (aceitou && p.de === "proposta") setEstado((e) => aplicar(e, p.campos));
  };

  const apontarErro = async (i: number) => {
    const fala = mensagens[i];
    const pergunta = mensagens.slice(0, i).findLast((m) => m.de === "pessoa");
    if (fala.de !== "joao") return;
    setErro("");
    try {
      await avisarErro({
        pergunta: pergunta?.de === "pessoa" ? pergunta.texto : "",
        resposta: fala.texto,
      });
      setMensagens((m) =>
        m.map((x, j) =>
          j === i && x.de === "joao" ? { ...x, avisou: true } : x,
        ),
      );
    } catch {
      setErro("Não deu para enviar o aviso agora. Tente de novo em instantes.");
    }
  };

  const terminarComeco = (destino: "conversa" | "plano") => {
    setEstado((e) => ({ ...e, comecou: true }));
    setMensagens((m) => [
      ...m,
      {
        de: "joao",
        humor: "feliz",
        fontes: [],
        texto: `Pronto, o que você me contou já está no seu plano. Agora estamos em ${atual?.nome ?? "Seus dados"}. Pode perguntar o que quiser.`,
      },
    ]);
    setPlanoAberto(destino === "plano");
  };

  const perguntar = (t: string) => {
    setPlanoAberto(false);
    enviar(t);
  };

  const ultimoJoao = [...mensagens].reverse().find((m) => m.de === "joao");
  const jaPerguntou = (t: string) =>
    mensagens.some((m) => m.de === "pessoa" && m.texto === t);
  const aPartir = atual ? paradas.indexOf(atual) : paradas.length;
  const sugestoes = paradas
    .slice(aPartir, aPartir + 3)
    .map((p) => p.pergunta)
    .filter((t) => !jaPerguntou(t))
    .slice(0, 2);
  const inicio = mensagens.length === 1;
  const acolhendo = inicio && carregou && !estado.comecou;
  const listaFases = fases(paradas);
  const faseAtual = listaFases.find((f) => f.atual);
  const posicaoFase = faseAtual
    ? listaFases.indexOf(faseAtual) + 1
    : listaFases.length;
  const conta = contaDoPlano(estado);
  const guardar = (
    <GuardarLink token={token} compra={compra} aoMudar={mudarToken} />
  );

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-4 py-4 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Eyebrow>Simulação educativa · Goiânia</Eyebrow>
          <h1 className="font-display text-2xl font-semibold">
            Pergunta pro João
          </h1>
        </div>
        {!acolhendo && <div className="max-w-md">{guardar}</div>}
      </header>

      <div className="flex h-[calc(100dvh-13rem)] min-h-[480px] flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface sm:h-[calc(100dvh-10.5rem)]">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <Avatar
              humor={
                ocupado
                  ? "pensativo"
                  : ultimoJoao?.de === "joao"
                    ? ultimoJoao.humor
                    : "gentil"
              }
            />
            <p className="min-w-0 leading-tight">
              <span className="block font-semibold">João</span>
              <span className="block truncate text-xs text-ink-2">
                {ocupado ? "Procurando nas páginas…" : "Responde pelo site"}
              </span>
            </p>
          </div>
        </div>

        {/* O plano mora na mesma tela: uma barra com o resumo que abre o plano no lugar da conversa. */}
        {!acolhendo && (
          <button
            type="button"
            aria-expanded={planoAberto}
            onClick={() => setPlanoAberto((v) => !v)}
            className="flex w-full items-center gap-3 border-b border-line bg-paper px-4 py-2.5 text-left hover:bg-grid/60"
          >
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline gap-2 text-sm">
                <b className="shrink-0">Meu plano</b>
                <span className="truncate text-ink-2">
                  {faseAtual
                    ? `Fase ${posicaoFase} de ${listaFases.length} · Agora: ${atual?.nome}`
                    : "Todas as fases marcadas"}
                </span>
              </span>
              <span aria-hidden className="mt-1.5 flex gap-1">
                {listaFases.map((f) => (
                  <span
                    key={f.id}
                    className={cn(
                      "h-1 flex-1 rounded-full bg-grid",
                      f.feita && "bg-mark",
                      f.atual && "bg-ink",
                    )}
                  />
                ))}
              </span>
              {conta.pronta && (
                <span className="mt-1 block font-mono text-xs text-ink-2">
                  Entrada {brl(conta.entrada)} · Parcela{" "}
                  {brl(conta.parcelaPrice)}
                </span>
              )}
            </span>
            <span className="flex shrink-0 items-center gap-1 text-xs font-semibold">
              {planoAberto ? "Voltar à conversa" : "Abrir"}
              <ChevronDown
                className={cn(
                  "size-4 transition-transform",
                  planoAberto && "rotate-180",
                )}
                aria-hidden
              />
            </span>
          </button>
        )}

        {planoAberto && !acolhendo ? (
          <div
            ref={plano}
            className="joao-entra flex-1 overflow-y-auto p-4 sm:px-6"
          >
            <MeuPlano
              estado={estado}
              mudar={setEstado}
              paradas={paradas}
              aberta={aberta}
              abrir={setEscolhida}
              perguntar={perguntar}
              ocupado={ocupado}
              semTopo
            />
          </div>
        ) : (
          <>
            <div
              ref={conversa}
              aria-live="polite"
              className="flex flex-1 flex-col gap-5 overflow-y-auto p-4 sm:px-6"
            >
              {acolhendo && (
                <Comeco
                  estado={estado}
                  mudar={setEstado}
                  atual={atual}
                  guardar={guardar}
                  pular={() => setEstado((e) => ({ ...e, comecou: true }))}
                  terminar={terminarComeco}
                />
              )}
              {inicio && carregou && !acolhendo && (
                <div className="joao-entra m-auto flex max-w-md flex-col items-center gap-3 py-4 text-center">
                  <JoaoDeBarro pose="frente" humor="gentil" className="w-20" />
                  <p className="text-[15px] leading-relaxed">
                    {ABERTURA.de === "joao" && ABERTURA.texto}
                  </p>
                  <div className="flex w-full flex-col gap-2">
                    {ATALHOS.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => enviar(a)}
                        className="flex items-center justify-between gap-2 rounded-xl border border-line px-4 py-3 text-left text-sm font-semibold transition-colors hover:border-ink"
                      >
                        {a}
                        <ArrowUpRight className="size-4 shrink-0" aria-hidden />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {!inicio &&
                mensagens.map((m, i) => {
                  if (m.de === "pessoa")
                    return (
                      <p
                        key={i}
                        className="joao-entra max-w-[82%] self-end whitespace-pre-wrap rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-[15px] text-paper"
                      >
                        {m.texto}
                      </p>
                    );
                  if (m.de === "saida") return <Saida key={i} tipo={m.tipo} />;
                  if (m.de === "proposta") {
                    return (
                      <div
                        key={i}
                        className="joao-entra ml-11 flex max-w-[85%] flex-col gap-2 rounded-2xl border border-planta-deep bg-paper p-3.5 text-sm"
                      >
                        <p className="font-semibold">
                          {m.situacao === "aberta"
                            ? "Posso anotar no seu plano?"
                            : m.situacao === "anotada"
                              ? "Anotado no plano"
                              : "Não anotei"}
                        </p>
                        <dl className="flex flex-col gap-1">
                          {(
                            Object.entries(m.campos) as [
                              keyof Anotacao,
                              Anotacao[keyof Anotacao],
                            ][]
                          ).map(([k, v]) => (
                            <div key={k} className="flex justify-between gap-4">
                              <dt className="text-ink-2">{ROTULOS[k]}</dt>
                              <dd className="font-semibold">
                                {textoDoCampo(k, v)}
                              </dd>
                            </div>
                          ))}
                        </dl>
                        {m.situacao === "aberta" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => responderProposta(i, true)}
                            >
                              Anotar
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => responderProposta(i, false)}
                            >
                              Não anotar
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <div key={i} className="joao-entra flex max-w-[92%] gap-2">
                      <Avatar humor={m.humor} />
                      <div className="flex min-w-0 flex-col gap-2 pt-1.5">
                        <p className="whitespace-pre-wrap text-[15px] leading-relaxed">
                          {m.texto}
                        </p>
                        {m.fontes.length > 0 && (
                          <ul className="flex flex-wrap gap-2">
                            {m.fontes.map((f) => (
                              <li key={f.url}>
                                <a
                                  href={f.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 rounded-full bg-paper px-3 py-1 text-xs font-semibold hover:bg-grid"
                                >
                                  {f.titulo}
                                  <ArrowUpRight
                                    className="size-3"
                                    aria-hidden
                                  />
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                        {m.tipo &&
                          (m.avisou ? (
                            <p className="text-xs text-ink-2">
                              Obrigado por avisar. Esta resposta vai para
                              revisão. Antes de decidir, confirme com o banco ou
                              o profissional da etapa.
                            </p>
                          ) : (
                            <button
                              type="button"
                              onClick={() => apontarErro(i)}
                              className="self-start text-xs text-ink-2 underline underline-offset-2 hover:text-ink"
                            >
                              Isso está errado?
                            </button>
                          ))}
                      </div>
                    </div>
                  );
                })}
              {ocupado && (
                <div className="joao-entra flex items-center gap-2">
                  <Avatar humor="pensativo" />
                  <span
                    role="status"
                    aria-label="O João está procurando nas páginas"
                    className="flex gap-1 rounded-full bg-paper px-3.5 py-3"
                  >
                    <span className="joao-ponto size-1.5 rounded-full bg-ink" />
                    <span className="joao-ponto size-1.5 rounded-full bg-ink" />
                    <span className="joao-ponto size-1.5 rounded-full bg-ink" />
                  </span>
                </div>
              )}
              {erro && <p className="text-sm text-bad">{erro}</p>}
            </div>

            <div
              className={cn(
                "flex flex-col gap-2 px-3 pb-2.5 sm:px-5",
                acolhendo && "hidden",
              )}
            >
              {!inicio && !ocupado && sugestoes.length > 0 && (
                <div className="-mx-1 flex gap-2 overflow-x-auto px-1">
                  {sugestoes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => enviar(s)}
                      className="min-h-9 shrink-0 rounded-full border border-line px-3 text-sm font-medium transition-colors hover:border-ink"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <form
                className="flex items-end gap-2 rounded-2xl border-[1.5px] border-line bg-surface p-1.5 pl-3.5 transition-colors focus-within:border-ink"
                onSubmit={(e) => {
                  e.preventDefault();
                  enviar(texto);
                }}
              >
                <textarea
                  aria-label="Escreva para o João"
                  rows={1}
                  value={texto}
                  maxLength={1500}
                  onChange={(e) => setTexto(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      enviar(texto);
                    }
                  }}
                  placeholder="Pergunte sobre a sua compra"
                  className="field-sizing-content max-h-32 min-h-10 flex-1 resize-none bg-transparent py-2 text-base outline-none"
                />
                <Button
                  type="submit"
                  aria-label="Enviar"
                  disabled={ocupado || !texto.trim()}
                  className="size-10 rounded-full p-0"
                >
                  <ArrowUp />
                </Button>
              </form>
              {!inicio && (
                <p className="text-center text-xs text-muted">
                  Não sou banco e não aprovo crédito. Evite escrever CPF ou
                  documentos.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
