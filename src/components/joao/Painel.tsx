"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { no } from "@/lib/conteudo/links";
import { brl, digitos, milhar } from "@/lib/format";
import { contaDoPlano, fases, guardaPorMes, rotaDePreparo, type Estado, type Fase, type Imovel, type Parada } from "@/lib/joao/estado";
import { JORNADA, STATUS, type StatusItem } from "@/lib/joao/jornada";

const entrada = "h-11 w-full rounded-xl border-[1.5px] border-line bg-surface px-3 text-base outline-none focus:border-ink";

function Dinheiro({ id, rotulo, valor, onChange }: { id: string; rotulo: string; valor: number; onChange: (v: number) => void }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5 text-sm text-ink-2">
      {rotulo}
      <input id={id} inputMode="numeric" placeholder="R$" value={milhar(valor)} onChange={(e) => onChange(digitos(e.target.value))} className={entrada} />
    </label>
  );
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line py-2 last:border-0">
      <dt className="text-sm text-ink-2">{rotulo}</dt>
      <dd className="font-mono text-sm font-medium tabular-nums">{valor}</dd>
    </div>
  );
}

function Numero({ rotulo, valor, destaque }: { rotulo: string; valor: string; destaque?: boolean }) {
  return (
    <div className={cn("rounded-xl bg-paper p-3", destaque && "bg-mark-soft")}>
      <dt className="text-xs text-ink-2">{rotulo}</dt>
      <dd className="mt-0.5 font-mono text-[15px] font-medium tabular-nums">{valor}</dd>
    </div>
  );
}

export function Numeros({ estado }: { estado: Estado }) {
  const c = contaDoPlano(estado);
  if (!c.pronta) {
    return <p className="rounded-xl bg-paper p-3 text-sm text-ink-2">{"bloqueio" in c ? "Com esses dados, a conta não fecha. Pergunte ao João o que muda isso." : "Conte a renda e a idade para ver os seus números aqui."}</p>;
  }
  return (
    <div className="flex flex-col gap-2">
      <dl className="grid grid-cols-2 gap-2">
        <Numero rotulo={c.temImovel ? "Banco financia" : "Imóvel que a renda alcança"} valor={brl(c.temImovel ? c.financiado : c.imovel)} />
        <Numero rotulo="Entrada" valor={brl(c.entrada)} destaque />
        <Numero rotulo="Parcela no PRICE" valor={brl(c.parcelaPrice)} />
        <Numero rotulo="Dinheiro na mão" valor={brl(c.naMao)} destaque />
      </dl>
      <details className="group text-sm">
        <summary className="flex cursor-pointer list-none items-center gap-1 font-semibold [&::-webkit-details-marker]:hidden">
          Ver toda a conta
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden />
        </summary>
        <dl className="mt-1">
          <Linha rotulo="1ª parcela no SAC" valor={brl(c.parcelaSac)} />
          {c.custos && <Linha rotulo="ITBI, cartório e avaliação" valor={brl(c.custos.total)} />}
        </dl>
      </details>
      <p className="text-xs text-ink-2">Simulação educativa, não é aprovação de crédito. Quem confirma é o banco. O ITBI usa {estado.imovel.itbiPct}% como estimativa: confirme na prefeitura.</p>
    </div>
  );
}

/** Ajustes que deixam a conta mais certa, sem virar mais perguntas na tela. */
function Ajustar({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <details className="group text-sm">
      <summary className="flex cursor-pointer list-none items-center gap-1 font-semibold [&::-webkit-details-marker]:hidden">
        {rotulo}
        <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">{children}</div>
    </details>
  );
}

function Dados({ estado, mudar }: { estado: Estado; mudar: (e: Estado) => void }) {
  const p = estado.perfil;
  const perfil = (patch: Partial<Estado["perfil"]>) => mudar({ ...estado, perfil: { ...p, ...patch } });
  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Dinheiro id="p-renda" rotulo="Renda bruta da família, por mês" valor={p.renda} onChange={(renda) => perfil({ renda })} />
        <label htmlFor="p-idade" className="flex flex-col gap-1.5 text-sm text-ink-2">
          Idade de quem é mais velho
          <input id="p-idade" inputMode="numeric" value={p.idade ?? ""} onChange={(e) => perfil({ idade: digitos(e.target.value) || null })} className={entrada} />
        </label>
        <Dinheiro id="p-reserva" rotulo="Dinheiro guardado" valor={p.reserva} onChange={(reserva) => perfil({ reserva, reservaOpt: reserva > 0 ? "sim" : "nada" })} />
      </div>
      <Ajustar rotulo="FGTS e dívidas">
        <Dinheiro id="p-fgts" rotulo="Saldo do FGTS" valor={p.fgts} onChange={(fgts) => perfil({ fgts, fgtsOpt: fgts > 0 ? "sim" : "nao", fgts3: p.fgts3 ?? "naosei" })} />
        <Dinheiro id="p-dividas" rotulo="Parcelas de dívidas por mês" valor={p.dividas} onChange={(dividas) => perfil({ dividas, dividasOpt: dividas > 0 ? "sim" : "nao" })} />
      </Ajustar>
    </div>
  );
}

function ImovelEscolhido({ estado, mudar }: { estado: Estado; mudar: (e: Estado) => void }) {
  const i = estado.imovel;
  const imovel = (patch: Partial<Imovel>) => mudar({ ...estado, imovel: { ...i, ...patch } });
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-ink-2">Achou um imóvel? Anote aqui e a conta passa a ser a dele.</p>
      <div className="grid grid-cols-2 gap-3">
        <Dinheiro id="i-preco" rotulo="Preço pedido" valor={i.preco} onChange={(preco) => imovel({ preco })} />
        <Dinheiro id="i-avaliacao" rotulo="Avaliação do banco" valor={i.avaliacao} onChange={(avaliacao) => imovel({ avaliacao })} />
        <label htmlFor="i-tipo" className="flex flex-col gap-1.5 text-sm text-ink-2">
          Tipo
          <select id="i-tipo" value={i.tipo} onChange={(e) => imovel({ tipo: e.target.value as Imovel["tipo"] })} className={entrada}>
            <option value="usado">Usado</option>
            <option value="novo">Novo</option>
          </select>
        </label>
        <label htmlFor="i-bairro" className="flex flex-col gap-1.5 text-sm text-ink-2">
          Bairro
          <input id="i-bairro" value={i.bairro} maxLength={80} onChange={(e) => imovel({ bairro: e.target.value })} className={entrada} />
        </label>
      </div>
    </div>
  );
}

/** Antes do banco: as travas que mais pesam e o caminho de cada uma, com os números da pessoa. */
function Preparo({ estado, mudar }: { estado: Estado; mudar: (e: Estado) => void }) {
  const p = estado.perfil;
  const c = contaDoPlano(estado);
  const passos = rotaDePreparo(estado);
  return (
    <div className="flex flex-col gap-3">
      {/* Só pergunta o nome enquanto não houver resposta: é o que muda o primeiro passo. */}
      {!p.nome && (
        <label htmlFor="p-nome" className="flex flex-col gap-1.5 text-sm text-ink-2">
          O seu nome está limpo?
          <select id="p-nome" value="" onChange={(e) => mudar({ ...estado, perfil: { ...p, nome: (e.target.value || null) as typeof p.nome } })} className={entrada}>
            <option value="">Escolha</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
            <option value="naosei">Não sei</option>
          </select>
        </label>
      )}
      {passos.length > 0 && (
        <ul className="flex flex-col gap-2">
          {passos.map((t) => (
            <li key={t.titulo} className="rounded-xl bg-mark-soft p-3 text-sm">
              <b className="block">{t.titulo}</b>
              {t.texto}
            </li>
          ))}
        </ul>
      )}
      {c.pronta && !!estado.aluguel && (
        <p className="rounded-xl bg-paper p-3 text-sm">
          Hoje o aluguel é <b>{brl(estado.aluguel)}</b>. A parcela estimada é <b>{brl(c.parcelaPrice)}</b>, sem contar condomínio e IPTU.
        </p>
      )}
      <Ajustar rotulo={estado.guardaMes ? "Ajustar a conta" : `Ajustar a conta (usei ${brl(guardaPorMes(estado))} por mês)`}>
        <Dinheiro id="p-guarda" rotulo="Quanto dá para guardar por mês" valor={estado.guardaMes ?? 0} onChange={(guardaMes) => mudar({ ...estado, guardaMes })} />
        <Dinheiro id="p-aluguel" rotulo="Aluguel por mês, para comparar" valor={estado.aluguel ?? 0} onChange={(aluguel) => mudar({ ...estado, aluguel })} />
        {p.nome && (
          <label htmlFor="p-nome2" className="flex flex-col gap-1.5 text-sm text-ink-2">
            Nome limpo?
            <select id="p-nome2" value={p.nome} onChange={(e) => mudar({ ...estado, perfil: { ...p, nome: e.target.value as typeof p.nome } })} className={entrada}>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
              <option value="naosei">Não sei</option>
            </select>
          </label>
        )}
      </Ajustar>
    </div>
  );
}

function Itens({ id, estado, mudar }: { id: string; estado: Estado; mudar: (e: Estado) => void }) {
  const etapa = JORNADA.find((e) => e.id === id);
  if (!etapa) return null;
  const pagina = no(etapa.pagina);
  const marcar = (item: string, s: StatusItem) => mudar({ ...estado, etapas: { ...estado.etapas, [item]: s } });
  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-col gap-1.5">
        {etapa.itens.map((x) => {
          const situacao = estado.etapas[x.id] ?? "fazer";
          const feito = situacao === "marcou" || situacao === "banco";
          return (
            <li key={x.id} className="flex items-start gap-3 rounded-xl bg-paper px-3 py-2.5">
              <button type="button" role="checkbox" aria-checked={feito} aria-label={x.texto} title={STATUS.marcou.ajuda} onClick={() => marcar(x.id, feito ? "fazer" : "marcou")} className={cn("mt-px flex size-6 shrink-0 items-center justify-center rounded-md border-[1.5px] border-ink bg-surface", feito && "bg-mark")}>
                {feito && <Check className="size-4" aria-hidden />}
              </button>
              <div className="min-w-0 flex-1">
                <p className={cn("text-sm", feito && "text-ink-2 line-through decoration-1")}>{x.texto}</p>
                {situacao === "atencao" && (
                  <button type="button" onClick={() => marcar(x.id, "fazer")} className="mt-0.5 text-xs font-semibold text-warn underline-offset-2 hover:underline">
                    Pede atenção · desfazer
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="text-xs text-ink-2">
        Quem confirma: {etapa.confirma}.{" "}
        <Link href={pagina.slug} target="_blank" className="inline-flex items-center gap-0.5 font-semibold text-ink underline underline-offset-2">
          {pagina.titulo}
          <ArrowUpRight className="size-3" aria-hidden />
        </Link>
      </p>
    </div>
  );
}

function Marcador({ fase, n }: { fase: Fase; n: number }) {
  const base = "absolute left-0 top-1.5 z-10 flex size-9 items-center justify-center rounded-full border-[1.5px]";
  if (fase.atual) {
    return (
      <span className={cn(base, "border-ink bg-mark-soft")}>
        <JoaoDeBarro pose="frente" humor={fase.atencao ? "pensativo" : "gentil"} className="w-7" />
      </span>
    );
  }
  if (fase.feita) {
    return (
      <span className={cn(base, "border-ink bg-mark")}>
        <Check className="size-4" aria-hidden />
      </span>
    );
  }
  if (fase.atencao) return <span className={cn(base, "border-warn bg-surface font-semibold text-warn")}>!</span>;
  return <span className={cn(base, "border-line bg-surface font-mono text-xs text-ink-2")}>{n}</span>;
}

type Props = {
  estado: Estado;
  mudar: (e: Estado) => void;
  paradas: Parada[];
  aberta: string;
  abrir: (id: string) => void;
  perguntar: (texto: string) => void;
  ocupado: boolean;
  /** Sem título e barra de fases: quando a barra da conversa já mostra os dois. */
  semTopo?: boolean;
};

/**
 * Meu plano: os números e a compra em cinco fases. Só a fase aberta mostra os passos, e
 * dentro dela só o passo aberto mostra o conteúdo. Quem marca é a pessoa, e nada aqui é
 * conferido pela Primeira Chave.
 */
export function MeuPlano({ estado, mudar, paradas, aberta, abrir, perguntar, ocupado, semTopo }: Props) {
  const lista = fases(paradas);
  const atual = lista.find((f) => f.atual);
  const posicao = atual ? lista.indexOf(atual) + 1 : lista.length;
  return (
    <div className="flex flex-col gap-4">
      <div className={cn("flex flex-col gap-2", semTopo && "hidden")}>
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-xl font-semibold">Meu plano</h2>
          <p className="font-mono text-xs text-ink-2">
            Fase {posicao} de {lista.length}
          </p>
        </div>
        <div aria-hidden className="flex gap-1">
          {lista.map((f) => (
            <span key={f.id} className={cn("h-1.5 flex-1 rounded-full bg-grid", f.feita && "bg-mark", f.atual && "bg-ink")} />
          ))}
        </div>
      </div>

      <Numeros estado={estado} />

      <p className="text-xs text-ink-2">Você marca cada passo. A Primeira Chave não confere.</p>

      <ol>
        {lista.map((f, i) => {
          const aberta_ = f.paradas.some((p) => p.id === aberta);
          const primeira = f.paradas.find((p) => !p.feita) ?? f.paradas[0];
          return (
            <li key={f.id} className="relative pb-1 pl-12">
              <span aria-hidden className={cn("absolute bottom-0 left-[17px] top-1.5 w-0.5", f.feita ? "bg-mark" : "bg-line")} />
              <Marcador fase={f} n={i + 1} />
              <button type="button" aria-expanded={aberta_} onClick={() => abrir(aberta_ ? "" : primeira.id)} className="flex min-h-12 w-full items-center justify-between gap-2 rounded-lg text-left">
                <span>
                  <span className={cn("block text-[15px] font-semibold", !f.atual && !f.feita && "font-medium text-ink-2")}>{f.nome}</span>
                  <span className={cn("block text-xs text-ink-2", f.atencao && "font-semibold text-warn")}>{f.atencao ? "Pede atenção" : f.resumo}</span>
                </span>
                <ChevronDown className={cn("size-4 shrink-0 text-ink-2 transition-transform", aberta_ && "rotate-180")} aria-hidden />
              </button>
              {aberta_ && (
                <div className="joao-entra flex flex-col gap-1 pb-3">
                  {f.paradas.map((p) => {
                    const aberto = aberta === p.id;
                    return (
                      <div key={p.id} data-parada={p.id} className={cn("rounded-xl", aberto && "border border-line p-3")}>
                        <button type="button" aria-expanded={aberto} onClick={() => abrir(p.id)} className={cn("flex min-h-10 w-full items-center justify-between gap-2 text-left text-sm", !aberto && "px-3")}>
                          <span className="flex items-center gap-2 font-semibold">
                            {p.feita ? <Check className="size-4 text-ok" aria-label="Feito" /> : <span aria-hidden className={cn("size-2 rounded-full bg-line", p.atual && "bg-mark ring-1 ring-ink", p.atencao && "bg-warn")} />}
                            {p.nome}
                          </span>
                          <span className="font-mono text-xs text-ink-2">
                            {p.feitos}/{p.total}
                          </span>
                        </button>
                        {aberto && (
                          <div className="flex flex-col gap-3 pt-2">
                            {p.tipo === "dados" && <Dados estado={estado} mudar={mudar} />}
                            {p.tipo === "imovel" && <ImovelEscolhido estado={estado} mudar={mudar} />}
                            {p.id === "preparo" && <Preparo estado={estado} mudar={mudar} />}
                            {p.tipo === "etapa" && <Itens id={p.id} estado={estado} mudar={mudar} />}
                            <Button size="sm" variant="outline" disabled={ocupado} className="self-start" onClick={() => perguntar(p.pergunta)}>
                              <MessageCircle />
                              Perguntar ao João
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </li>
          );
        })}
        <li className="relative pl-12">
          <span aria-hidden className="absolute left-0 top-1.5 flex size-9 items-center justify-center rounded-full border-[1.5px] border-dashed border-line bg-surface" />
          <p className="flex min-h-12 flex-col justify-center text-[15px] font-medium text-ink-2">
            Plano de quitação
            <span className="text-xs font-normal">Depois das chaves, entra aqui.</span>
          </p>
        </li>
      </ol>
    </div>
  );
}
