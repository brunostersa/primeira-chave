"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/components/ui/utils";
import type { Bloqueio, Perfil, Resultado as R } from "@/lib/financiamento/engine";
import { evento } from "@/lib/evento";
import { brl, digitos, milhar, pct } from "@/lib/format";

type Props = {
  perfil: Perfil;
  r: R | Bloqueio;
  mudar: (patch: Partial<Perfil>) => void;
  onRefazer: () => void;
  /** As dívidas já ocupam o limite: os números são os de depois de quitá-las. */
  quitando?: boolean;
  className?: string;
};

/**
 * O painel de ajuste do resultado: muda uma resposta e o número recalcula na hora,
 * sem refazer as perguntas. O resumo no topo fica preso na tela enquanto o painel
 * está à vista, então o número acompanha o dedo no deslizador.
 */
export function Ajustar({ perfil, r, mudar, onRefazer, quitando, className }: Props) {
  const [aberto, setAberto] = useState(false);
  const avisoFaixa = useAvisoFaixa(r);
  const ajustados = useRef(new Set<string>());

  // Quem chega pelo "Mudar a renda" ou "Mudar minhas respostas" abre tudo.
  useEffect(() => {
    const abrir = () => setAberto(true);
    window.addEventListener("ajustar:abrir", abrir);
    return () => window.removeEventListener("ajustar:abrir", abrir);
  }, []);

  const ajustar = (campo: string, patch: Partial<Perfil>) => {
    if (!ajustados.current.has(campo)) {
      ajustados.current.add(campo);
      evento("sim_ajuste", { campo });
    }
    mudar(patch);
  };

  const junto = perfil.quem === "junto";
  const fgtsValor = perfil.fgtsOpt === "sim" ? perfil.fgts : 0;

  return (
    <section id="ajustar" aria-labelledby="ajustar-titulo" className={cn("scroll-mt-20 rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface", className)}>
      <Resumo r={r} quitando={quitando} />

      <div className="flex flex-col gap-1 px-5 pt-4 sm:px-6">
        <h2 id="ajustar-titulo" className="font-display text-2xl font-semibold">
          Ajuste e veja na hora
        </h2>
        <p className="text-[15px] text-ink-2">Errou alguma resposta ou quer testar outro cenário? Mude aqui, sem refazer as perguntas.</p>
      </div>

      {avisoFaixa && (
        <p role="status" className="mx-5 mt-3 rounded-lg bg-mark-soft px-3 py-2 text-[15px] sm:mx-6">
          {avisoFaixa}
        </p>
      )}

      <div className="flex flex-col gap-5 px-5 py-4 sm:px-6">
        <AjusteDinheiro
          id="ajuste-renda"
          rotulo={junto ? "Renda somada por mês" : "Renda por mês"}
          valor={perfil.renda}
          min={1000}
          max={30000}
          passo={100}
          onChange={(v) => ajustar("renda", { renda: v })}
        />
        <AjusteDinheiro
          id="ajuste-reserva"
          rotulo="Dinheiro guardado"
          valor={perfil.reservaOpt === "sim" ? perfil.reserva : 0}
          min={0}
          max={300000}
          passo={1000}
          onChange={(v) => ajustar("reserva", { reserva: v, reservaOpt: v > 0 ? "sim" : "nada" })}
        />
        <AjusteDinheiro
          id="ajuste-fgts"
          rotulo="Saldo do FGTS"
          ajuda={perfil.fgtsOpt === "naosei" ? "Você não sabia o saldo: teste um valor." : undefined}
          valor={fgtsValor}
          min={0}
          max={150000}
          passo={1000}
          onChange={(v) =>
            ajustar("fgts", {
              fgts: v,
              // Zerar não apaga o "não sei": só quem respondeu "sim" volta para "não tem".
              fgtsOpt: v > 0 ? "sim" : perfil.fgtsOpt === "sim" ? "nao" : perfil.fgtsOpt,
            })
          }
        />
        {perfil.achou === "sim" && (
          <AjusteDinheiro
            id="ajuste-preco"
            rotulo="Preço do imóvel"
            valor={perfil.valor}
            min={30000}
            max={1500000}
            passo={5000}
            onChange={(v) => ajustar("preco", { valor: v })}
          />
        )}
      </div>

      <details
        open={aberto}
        onToggle={(e) => setAberto((e.currentTarget as HTMLDetailsElement).open)}
        className="group mx-5 mb-2 border-t border-line sm:mx-6"
      >
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between py-3 font-semibold [&::-webkit-details-marker]:hidden">
          Mais respostas pra mudar
          <span aria-hidden className="font-mono text-lg transition-transform group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="flex flex-col gap-5 pb-4">
          <Escolha
            rotulo="Vai comprar"
            valor={perfil.quem}
            opcoes={[
              ["sozinho", "Sozinho"],
              ["junto", "Com outra pessoa"],
            ]}
            onChange={(v) => ajustar("quem", { quem: v })}
          />
          <AjusteNumero
            id="ajuste-idade"
            rotulo={junto ? "Idade de quem é mais velho" : "Sua idade"}
            valor={perfil.idade ?? 30}
            min={18}
            max={80}
            onChange={(v) => ajustar("idade", { idade: v })}
          />
          <AjusteDinheiro
            id="ajuste-dividas"
            rotulo="Parcelas que já paga por mês"
            ajuda="Carro, empréstimo, consignado, cartão parcelado."
            valor={perfil.dividasOpt === "sim" ? perfil.dividas : 0}
            min={0}
            max={Math.max(1000, Math.round((perfil.renda * 0.5) / 100) * 100)}
            passo={50}
            onChange={(v) => ajustar("dividas", { dividas: v, dividasOpt: v > 0 ? "sim" : "nao" })}
          />
          {perfil.fgtsOpt !== "nao" && (
            <Escolha
              rotulo="3 anos ou mais de carteira assinada, somando os empregos"
              valor={perfil.fgts3}
              opcoes={[
                ["sim", "Sim"],
                ["nao", "Não"],
                ["naosei", "Não sei"],
              ]}
              onChange={(v) => ajustar("fgts3", { fgts3: v })}
            />
          )}
          <Escolha
            rotulo={junto ? "Algum de vocês já tem imóvel no nome" : "Já tem imóvel no seu nome"}
            valor={perfil.imovel}
            opcoes={[
              ["nao", "Não"],
              ["sim", "Sim"],
            ]}
            onChange={(v) => ajustar("imovel", { imovel: v })}
          />
          <Escolha
            rotulo="Nome limpo"
            valor={perfil.nome}
            opcoes={[
              ["sim", "Sim"],
              ["nao", "Tenho restrição"],
              ["naosei", "Não sei"],
            ]}
            onChange={(v) => ajustar("nome", { nome: v })}
          />
          <Escolha
            rotulo="Já achou o imóvel"
            valor={perfil.achou}
            opcoes={[
              ["nao", "Ainda procurando"],
              ["sim", "Já achei"],
            ]}
            onChange={(v) =>
              ajustar("achou", {
                achou: v,
                // Ao dizer "já achei" aqui, começa num preço que a renda aguenta, pra não abrir em branco.
                ...(v === "sim" && !perfil.valor && !r.blocked && r.Vbank ? { valor: Math.round(r.Vbank / 5000) * 5000 } : {}),
              })
            }
          />
          {perfil.achou === "sim" && (
            <Escolha
              rotulo="O imóvel é"
              valor={perfil.tipo}
              opcoes={[
                ["usado", "Usado"],
                ["novo", "Novo"],
              ]}
              onChange={(v) => ajustar("tipo", { tipo: v })}
            />
          )}
          <button type="button" onClick={onRefazer} className="self-start text-[15px] font-semibold underline underline-offset-4">
            Prefiro refazer as perguntas do começo
          </button>
        </div>
      </details>

      <p className="border-t border-line px-5 py-3 text-sm text-muted sm:px-6">
        Estimativa com base nas regras da Caixa, que podem mudar a qualquer momento. Não é aprovação de crédito.
      </p>
    </section>
  );
}

/** O número principal, preso no alto da tela enquanto o painel está à vista. */
function Resumo({ r, quitando }: { r: R | Bloqueio; quitando?: boolean }) {
  let rotulo: string;
  let numero: string;
  let fatos: string[] = [];
  if (r.blocked) {
    rotulo = "Com essas respostas";
    numero = { idade: "Prazo curto pela idade", renda: "Parcela não cabe na renda", valor: "Falta o preço do imóvel" }[r.blocked];
  } else {
    const parcela = (r.prog.sistema === "sac" ? r.sac : r.price).first.pg;
    const falta = r.gap === 0 ? "Entrada coberta" : `Falta juntar ${brl(r.gap)}`;
    if (r.modo === "renda") {
      rotulo = quitando ? "Depois de quitar as parcelas, a renda aguenta até" : "A sua renda aguenta um imóvel de até";
      numero = brl(r.Vbank!);
      fatos = [`1ª parcela ${brl(parcela)}`, falta];
    } else {
      rotulo = quitando ? `Depois de quitar as parcelas, imóvel de ${brl(r.V)}` : `Imóvel de ${brl(r.V)}`;
      numero = falta;
      fatos = [`1ª parcela ${brl(parcela)}`, `Banco empresta ${brl(r.P)}`];
    }
  }
  return (
    <div aria-live="polite" className="sticky top-16 z-10 flex flex-col rounded-t-[calc(var(--radius-card)-2px)] border-b-[1.5px] border-ink bg-mark px-5 py-3 sm:px-6 lg:top-0">
      <span className="text-[13px]">{rotulo}</span>
      <b className="font-display text-[26px] leading-tight tabular-nums">{numero}</b>
      {fatos.length > 0 && (
        <span className="mt-0.5 flex flex-wrap gap-x-3 text-sm tabular-nums">
          {fatos.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </span>
      )}
    </div>
  );
}

/** Quando a mudança troca a linha de crédito ou os juros (ex.: a renda passa do limite da Faixa 2), o número dá um salto: avisa o porquê por alguns segundos. */
function useAvisoFaixa(r: R | Bloqueio): string | null {
  const { curto, juros, mcmv } = r.prog;
  // "SBPE" sozinho não diz nada a quem está começando.
  const linha = mcmv ? curto : "a linha de mercado (SBPE)";
  const chave = `${curto}|${juros}`;
  const anterior = useRef(chave);
  const [aviso, setAviso] = useState<string | null>(null);
  useEffect(() => {
    if (anterior.current === chave) return;
    anterior.current = chave;
    setAviso(`Agora é ${linha}, com juros de ${pct(juros)} ao ano. Por isso o número saltou.`);
    const t = setTimeout(() => setAviso(null), 8000);
    return () => clearTimeout(t);
  }, [chave, linha, juros]);
  return aviso;
}

/** Campo digitável + deslizador, os dois no mesmo valor. Digitar acima do máximo vale: a trilha só fica cheia. */
function AjusteDinheiro({
  id,
  rotulo,
  ajuda,
  valor,
  min,
  max,
  passo,
  onChange,
}: {
  id: string;
  rotulo: string;
  ajuda?: string;
  valor: number;
  min: number;
  max: number;
  passo: number;
  onChange: (v: number) => void;
}) {
  return (
    <Linha id={id} rotulo={rotulo} ajuda={ajuda} valor={valor} min={min} max={max} passo={passo} onChange={onChange}>
      <div className="flex w-36 shrink-0 items-center rounded-lg border-[1.5px] border-ink bg-paper focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink">
        <span className="pl-2.5 font-mono text-sm text-muted">R$</span>
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          value={milhar(valor)}
          placeholder="0"
          onChange={(e) => onChange(digitos(e.target.value))}
          className="w-full min-w-0 bg-transparent px-2 py-2 text-right font-display text-lg font-semibold tabular-nums outline-none"
        />
      </div>
    </Linha>
  );
}

function AjusteNumero({ id, rotulo, valor, min, max, onChange }: { id: string; rotulo: string; valor: number; min: number; max: number; onChange: (v: number) => void }) {
  // Rascunho local: enquanto a pessoa apaga e digita ("3" a caminho de "35"), nada vai pro cálculo.
  const [rascunho, setRascunho] = useState<string | null>(null);
  return (
    <Linha id={id} rotulo={rotulo} valor={valor} min={min} max={max} passo={1} onChange={onChange}>
      <div className="flex w-36 shrink-0 items-center rounded-lg border-[1.5px] border-ink bg-paper focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink">
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          value={rascunho ?? String(valor)}
          onChange={(e) => {
            const t = e.target.value.replace(/\D/g, "").slice(0, 2);
            setRascunho(t);
            const n = Number(t);
            if (n >= min && n <= max) onChange(n);
          }}
          onBlur={() => setRascunho(null)}
          className="w-full min-w-0 bg-transparent px-2.5 py-2 text-right font-display text-lg font-semibold tabular-nums outline-none"
        />
        <span className="pr-2.5 font-mono text-sm text-muted">anos</span>
      </div>
    </Linha>
  );
}

function Linha({
  id,
  rotulo,
  ajuda,
  valor,
  min,
  max,
  passo,
  onChange,
  children,
}: {
  id: string;
  rotulo: string;
  ajuda?: string;
  valor: number;
  min: number;
  max: number;
  passo: number;
  onChange: (v: number) => void;
  children: ReactNode;
}) {
  const noTrilho = Math.min(max, Math.max(min, valor));
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="flex flex-col text-[15px] font-semibold">
          {rotulo}
          {ajuda && <span className="text-sm font-normal text-ink-2">{ajuda}</span>}
        </label>
        {children}
      </div>
      <input
        type="range"
        aria-label={rotulo}
        min={min}
        max={max}
        step={passo}
        value={noTrilho}
        onChange={(e) => onChange(Number(e.target.value))}
        className="regua mt-2.5"
        style={{ "--pct": `${((noTrilho - min) / (max - min)) * 100}%` } as CSSProperties}
      />
    </div>
  );
}

function Escolha<T extends string>({
  rotulo,
  valor,
  opcoes,
  onChange,
}: {
  rotulo: string;
  valor: T | null;
  opcoes: [T, string][];
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={rotulo} className="flex flex-col gap-2">
      <span className="text-[15px] font-semibold">{rotulo}</span>
      <div className="flex flex-wrap gap-2">
        {opcoes.map(([v, t]) => (
          <button
            key={v}
            type="button"
            aria-pressed={valor === v}
            onClick={() => onChange(v)}
            className={cn(
              "min-h-11 rounded-full border-[1.5px] px-4 text-[15px] font-semibold transition-colors",
              valor === v ? "border-ink bg-mark" : "border-line bg-paper hover:border-ink",
            )}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Leva a pessoa ao painel (e ao campo, se dito), abrindo as respostas extras. */
export function irParaAjuste(campo?: string) {
  window.dispatchEvent(new Event("ajustar:abrir"));
  const alvo = document.getElementById(campo ?? "ajustar");
  alvo?.scrollIntoView({ block: campo ? "center" : "start" });
  if (campo) setTimeout(() => (alvo as HTMLInputElement | null)?.focus({ preventScroll: true }), 350);
}
