"use client";

import { useState, type ReactNode } from "react";
import { Badge, Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/components/ui/utils";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { Cota } from "@/components/brand/Logo";
import { Relatar } from "@/components/conteudo/Relatar";
import {
  calcular,
  previaPrecoAvaliacao,
  proximosPassos,
  semEntrada,
  type Perfil,
  type Resultado as R,
  type SemEntrada,
} from "@/lib/financiamento/engine";
import { PARAMS } from "@/lib/financiamento/params";
import { brl, pct } from "@/lib/format";
import { Deslizador } from "./campos";

type Props = { perfil: Perfil; exemplo: boolean; onRefazer: () => void; onInformarPreco: () => void };

export function Resultado({ perfil, exemplo, onRefazer, onInformarPreco }: Props) {
  const [poup, setPoup] = useState(1500);
  const r = calcular(perfil);
  const tarefas = proximosPassos(perfil, r, poup, brl);

  const topo = (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {exemplo ? (
        <p className="rounded-lg bg-mark-soft px-3 py-2 text-sm">Exemplo: casal, 31 anos, renda de R$ 6.000.</p>
      ) : (
        <span />
      )}
      <Button variant="link" onClick={onRefazer}>
        {exemplo ? "Fazer com os meus números" : "Mudar minhas respostas"}
      </Button>
    </div>
  );

  if (r.blocked) {
    const m = {
      idade: ["Pela idade, o prazo fica curto demais.", `O banco exige que idade + prazo não passe de ${PARAMS.idadeLimite.toLocaleString("pt-BR")} anos. Uma saída é comprar junto com alguém mais novo.`],
      renda: ["Hoje não sobra espaço pra parcela.", `O banco aceita no máximo ${PARAMS.comp}% da renda pra todas as parcelas somadas, e suas outras dívidas já ocupam esse espaço. Quitar ou reduzir uma delas é o primeiro passo.`],
      valor: ["Faltou o preço do imóvel.", "Informe o valor pedido pelo vendedor pra ver se ele cabe no seu bolso."],
    }[r.blocked];
    return (
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10 sm:px-6">
        {topo}
        <h1 className="font-display text-[clamp(32px,5vw,48px)] font-light leading-tight">{m[0]}</h1>
        <Card variant="bad">{m[1]}</Card>
        {r.blocked === "valor" && (
          <Button className="self-start" onClick={onInformarPreco}>
            Informar o preço
          </Button>
        )}
        <ProximoPasso tarefas={tarefas} />
      </section>
    );
  }

  const z = semEntrada(r);
  const { titulo, sub } = resposta(r, z);
  const sinais: { tom: "ok" | "warn" | "bad"; texto: string }[] = [
    r.dividas > perfil.renda * 0.1 ? { tom: "warn", texto: "Parcela: dívidas pesando" } : { tom: "ok", texto: "Parcela: cabe na renda" },
    r.gap === 0 ? { tom: "ok", texto: "Entrada: coberta" } : r.gap <= poup * 12 ? { tom: "warn", texto: "Entrada: falta pouco" } : { tom: "bad", texto: "Entrada: falta bastante" },
    perfil.nome === "sim" ? { tom: "ok", texto: "Nome: limpo" } : perfil.nome === "naosei" ? { tom: "warn", texto: "Nome: conferir" } : { tom: "bad", texto: "Nome: regularizar" },
  ];

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6">
      {topo}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {sinais.map((s) => (
            <Badge key={s.texto} tone={s.tom}>
              {s.texto}
            </Badge>
          ))}
        </div>
        <h1 className="font-display text-[clamp(32px,5.4vw,52px)] font-light leading-[1.05] [&_mark]:marca-texto [&_mark]:bg-transparent [&_mark]:font-semibold">{titulo}</h1>
        <p className="text-lg text-ink-2 [&_strong]:text-ink">{sub}</p>
      </div>

      <ProximoPasso tarefas={tarefas} />
      {z && <Segredo z={z} r={r} poup={poup} />}

      <Eyebrow className="mt-4">Quer entender esse número?</Eyebrow>
      <div className="flex flex-col gap-3">
        <Historia titulo="De onde vem esse número" resumo="As quatro regras que o banco usou com você.">
          <Regras r={r} />
        </Historia>
        <Historia titulo="Quem paga o quê" resumo="Quanto sai do banco, quanto sai de você, e os custos que ninguém conta.">
          <QuemPaga r={r} perfil={perfil} />
        </Historia>
        <Historia
          titulo="O cuidado com a avaliação"
          resumo={perfil.avaliou && r.modo === "imovel" ? "O que o laudo do banco muda na sua conta." : "Por que o preço do imóvel e o valor do banco podem ser diferentes."}
        >
          <Avaliacao r={r} perfil={perfil} />
        </Historia>
        <Historia titulo="Seu plano até a chave" resumo="Quanto tempo falta e em que etapa você está.">
          <Plano r={r} perfil={perfil} poup={poup} setPoup={setPoup} />
        </Historia>
        <Historia titulo="Ver os números do banco" resumo="Raio-X da parcela e SAC × PRICE, pra quem gosta de número.">
          <Numeros r={r} />
        </Historia>
      </div>

      <Card variant="strong" className="flex flex-col gap-4 bg-ink text-paper sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold">Agora você tem o número. A trilha mostra o caminho.</h2>
          <p className="mt-1 text-paper/80">As 7 etapas da compra, na mesma linguagem: documentos, aprovação, avaliação, contrato e chaves.</p>
        </div>
        <Button variant="mark" className="shrink-0">
          Quero a trilha completa
        </Button>
      </Card>

      <p className="text-sm text-muted">
        Simulação educativa, não é aprovação de crédito. Não inclui a correção pela TR. Usa regras médias de mercado (referência {"out/2026"}) e não
        substitui a análise do banco, que considera seu histórico, os documentos e a avaliação do imóvel. Seguros e taxas são estimados.
      </p>
      <Relatar contexto="simulador:resultado" />
    </section>
  );
}

function resposta(r: R, z: SemEntrada | null): { titulo: ReactNode; sub: ReactNode } {
  if (r.modo === "renda") {
    const extra = (
      <>
        {r.limTeto && <> Esse é o valor máximo do {r.prog.curto}.</>}
        {z && (
          <>
            {" "}
            <a href="#segredo" className="font-semibold text-ink underline underline-offset-4">
              Mas existe um caminho sem entrada ↓
            </a>
          </>
        )}
      </>
    );
    if (r.gap === 0)
      return {
        titulo: <>Você já pode buscar imóveis de até <mark>{brl(r.Vbank!)}</mark>.</>,
        sub: <>O banco empresta <strong>{brl(r.P)}</strong>. O que você já tem cobre o resto{r.sobra > 1000 && <>, e ainda sobram <strong>{brl(r.sobra)}</strong></>}.{extra}</>,
      };
    if ((r.Vbolso ?? 0) < 20000)
      return {
        titulo: <>Sua renda aguenta um imóvel de até <mark>{brl(r.Vbank!)}</mark>.</>,
        sub: <>O que falta é dinheiro na mão: <strong>{brl(r.gap)}</strong> pra entrada e custos. É aí que mora o seu plano.{extra}</>,
      };
    return {
      titulo: <>Hoje, cabe um imóvel de até <mark>{brl(r.Vbolso!)}</mark>.</>,
      sub: <>Sua renda aguenta até <strong>{brl(r.Vbank!)}</strong>. O que falta é dinheiro na mão: <strong>{brl(r.gap)}</strong> pra entrada e custos.{extra}</>,
    };
  }
  const notas = (
    <>
      {r.extraAval > 0 && <> A avaliação abaixo do preço pesa <strong>{brl(r.extraAval)}</strong> nessa conta.</>}
      {r.extraAval < 0 && r.entrada >= 1 && <> Como o banco avaliou acima do preço, ele empresta mais e sua entrada cai <strong>{brl(-r.extraAval)}</strong>.</>}
      {r.saiuMcmv && <> Como o preço passa do limite do Minha Casa Minha Vida, a conta vai pela linha de mercado, com juros maiores.</>}
    </>
  );
  if (r.entrada < 1)
    return {
      titulo: <>Esse imóvel de {brl(r.V)} <mark>sai sem entrada</mark>.</>,
      sub: <>O banco avaliou acima do preço e empresta o valor inteiro, <strong>{brl(r.P)}</strong>. {r.gap === 0 ? "Os custos de ITBI e cartório você já cobre com o que tem." : <>Só faltam <strong>{brl(r.gap)}</strong> pros custos de ITBI e cartório.</>}{notas}</>,
    };
  if (r.gap === 0)
    return { titulo: <>Esse imóvel de {brl(r.V)} <mark>cabe no seu bolso</mark>.</>, sub: <>O banco empresta <strong>{brl(r.P)}</strong> e você cobre o resto com o que já tem.{notas}</> };
  return {
    titulo: <>Pra esse imóvel de {brl(r.V)}, <mark>faltam {brl(r.gap)}</mark>.</>,
    sub: <>O banco empresta <strong>{brl(r.P)}</strong>. Entrada e custos somam <strong>{brl(r.entrada + r.custos)}</strong>{r.fgtsNaEntrada > 0 && <>, e seu FGTS cobre {brl(r.fgtsNaEntrada)} disso</>}.{notas}</>,
  };
}

function ProximoPasso({ tarefas }: { tarefas: { titulo: string; texto: string }[] }) {
  if (!tarefas.length) return null;
  return (
    <Card variant="strong" className="flex flex-col gap-4">
      <Eyebrow>Seu próximo passo</Eyebrow>
      <h2 className="font-display text-2xl font-semibold">{tarefas.length === 1 ? "O que fazer agora" : "O que fazer agora, nesta ordem"}</h2>
      <ol className="flex flex-col gap-3">
        {tarefas.map((t, k) => (
          <li key={t.titulo} className="grid grid-cols-[32px_1fr] gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-mark font-display font-semibold">{k + 1}</span>
            <span>
              <b className="block">{t.titulo}</b>
              <span className="text-[15px] text-ink-2">{t.texto}</span>
            </span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

function Segredo({ z, r, poup }: { z: SemEntrada; r: R; poup: number }) {
  const [preco, setPreco] = useState(z.V);
  const avalZero = Math.ceil(100 / z.ltv);
  const [avalPct, setAvalPct] = useState(avalZero);
  const v = previaPrecoAvaliacao(r, preco, avalPct);
  const min = Math.max(50000, Math.round((z.V * 0.4) / 1000) * 1000);
  const max = Math.round(Math.min(r.prog.teto, z.V * 1.5) / 1000) * 1000;
  const barra = Math.min(100, (v.entrada / Math.max(preco * (1 - z.ltv * 0.8), 1)) * 100);
  const humor = v.entrada < 1 ? "feliz" : v.limitadoPelaRenda ? "surpreso" : avalPct < 100 ? "triste" : "gentil";

  return (
    <Card variant="mark" id="segredo" className="flex scroll-mt-24 flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs uppercase tracking-[0.07em]">O segredo que pouca gente conta</p>
          <h2 className="font-display text-[clamp(28px,4vw,40px)] font-semibold leading-none">Dá pra comprar sem entrada.</h2>
        </div>
        <JoaoDeBarro pose="chave" className="hidden w-28 shrink-0 sm:block" />
      </div>
      <p>
        O banco empresta {Math.round(z.ltv * 100)}% do valor que <b>ele avaliar</b>, até o limite do preço. Então um imóvel de <b>{brl(z.V)}</b> avaliado em <b>{brl(z.aval)}</b> ou mais é
        financiado inteiro.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col rounded-xl bg-white/55 p-4">
          <span className="text-sm">Falta juntar</span>
          <b className="font-display text-3xl">{z.falta === 0 ? "Nada" : brl(z.falta)}</b>
          <span className="text-sm">{z.falta === 0 ? `você já tem os ${brl(z.custos)} de ITBI e cartório` : "só pros custos de ITBI e cartório"}</span>
        </div>
        <div className="flex flex-col rounded-xl bg-white/55 p-4">
          <span className="text-sm">Em vez de</span>
          <b className="font-display text-3xl text-ink/55 line-through decoration-2">{brl(z.gap)}</b>
          <span className="text-sm">que faltam no caminho comum</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl bg-white/55 p-4">
        <p className="font-mono text-xs uppercase tracking-[0.07em]">Teste você mesmo</p>
        <Deslizador id="sim-preco" rotulo="Preço do imóvel" saida={brl(preco)} min={min} max={max} step={1000} valor={preco} onChange={setPreco} humor={humor} />
        <div className="flex flex-col gap-1">
          <Deslizador id="sim-aval" rotulo="O banco avaliou em" saida={brl(v.aval)} min={80} max={150} step={1} valor={avalPct} onChange={setAvalPct} humor={humor} />
          <span className="text-sm text-ink-2">
            {avalPct === 100 ? "igual ao preço" : `${Math.abs(avalPct - 100)}% ${avalPct > 100 ? "acima" : "abaixo"} do preço`}
            {avalPct === avalZero && " · o ponto da entrada zero"}
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-1">
            <span className="text-sm">Sua entrada</span>
            <b className="font-display text-5xl leading-none tabular-nums">{v.entrada < 1 ? "Zero" : brl(v.entrada)}</b>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink/15">
              <div className="h-full rounded-full bg-ink transition-[width]" style={{ width: `${barra}%` }} />
            </div>
            <span className="text-sm">{v.entrada < 1 ? "o banco financia o preço inteiro" : `${Math.round((v.entrada / preco) * 100)}% do preço`}</span>
          </div>
          <dl className="grid grid-cols-[auto_auto] items-baseline gap-x-3 gap-y-1 text-sm">
            <dt>Banco empresta</dt>
            <dd className="text-right font-semibold tabular-nums">{brl(v.P)}</dd>
            <dt>ITBI e cartório</dt>
            <dd className="text-right font-semibold tabular-nums">{brl(v.custos)}</dd>
            <dt>Parcela de</dt>
            <dd className="text-right font-semibold tabular-nums">{brl(v.parcela)}/mês</dd>
          </dl>
        </div>
        <p className="text-[15px]">
          {v.limitadoPelaRenda
            ? `Aqui quem limita é a sua renda: a parcela não cabe. O que o banco não empresta vira entrada.`
            : v.entrada < 1
              ? `Avaliado ${avalPct - 100}% acima do preço, o banco cobre tudo. Você só paga ITBI e cartório, e o cartório pode até entrar no financiamento.`
              : `Pra zerar a entrada, a avaliação precisa chegar a ${brl(v.avalParaZerar)} (${avalZero - 100}% acima do preço).`}
        </p>
      </div>
      <p className="text-sm">
        {z.falta > 0 && `Guardando ${brl(poup)} por mês, são ${Math.ceil(z.falta / poup)} meses em vez de ${Math.ceil(z.gap / poup)}. `}
        Esse imóvel costuma ser um usado comprado abaixo do valor de mercado, como um que precisou de reforma. O valor só fica confirmado no laudo do banco, então peça a
        avaliação antes de pagar sinal.
      </p>
    </Card>
  );
}

function Historia({ titulo, resumo, children }: { titulo: string; resumo: string; children: ReactNode }) {
  return (
    <details className="group rounded-[var(--radius-card)] border border-line bg-surface open:border-ink">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block font-display text-xl font-semibold">{titulo}</span>
          <span className="text-[15px] text-ink-2">{resumo}</span>
        </span>
        <span aria-hidden className="font-mono text-xl transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="flex flex-col gap-4 border-t border-line p-5">{children}</div>
    </details>
  );
}

function Regras({ r }: { r: R }) {
  const anos = r.n / 12;
  const anosTxt = Number.isInteger(anos) ? `${anos} anos` : `${anos.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} anos`;
  const itens: [string, string, ReactNode][] = [
    ["Parcela de até", brl(r.C), <>O banco só deixa a parcela ocupar {PARAMS.comp}% da renda{r.dividas > 0 && <>, e desconta as parcelas que você já paga ({brl(r.dividas)})</>}. Isso protege você de se apertar.</>],
    ["Tempo pra pagar", anosTxt, <>Sua idade somada ao prazo não pode passar de {PARAMS.idadeLimite.toLocaleString("pt-BR")} anos{r.n === PARAMS.prazoMax && <>, e o máximo é {PARAMS.prazoMax / 12} anos</>}. Mais tempo deixa a parcela menor.</>],
    ["Juros por ano", pct(r.ef), <>{r.prog.mcmv ? `Você entra no ${r.prog.nome}, que tem juros menores por causa da sua renda` : "Sua compra vai pela linha de mercado, sem os juros reduzidos do programa do governo"}{r.prog.cotista && ". Os 3 anos de FGTS ainda dão um desconto"}. Esses juros ainda são corrigidos pela <b>TR</b>, que muda todo mês; aqui ela fica de fora da conta.</>],
    ["O banco empresta até", `${Math.round(r.prog.ltv * 100)}%`, <>Do valor que o banco avaliar, sem passar do preço de venda. O resto é a entrada, que sai do seu bolso ou do FGTS.</>],
  ];
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {itens.map(([t, v, txt]) => (
        <div key={t} className="flex flex-col gap-1 border-t border-line pt-3">
          <dt className="text-sm text-muted">{t}</dt>
          <dd className="font-display text-3xl font-semibold tabular-nums">{v}</dd>
          <dd className="text-[15px] text-ink-2">{txt}</dd>
        </div>
      ))}
    </dl>
  );
}

function QuemPaga({ r, perfil }: { r: R; perfil: Perfil }) {
  const linhas: [string, number, "neutra" | "menos"][] = [
    [`Entrada (${Math.round((1 - r.prog.ltv) * 100)}% do preço)`, r.entradaPadrao, "neutra"],
    ...(r.extraAval > 0 ? [["Avaliação abaixo do preço", r.extraAval, "neutra"] as [string, number, "neutra"]] : []),
    ...(r.extraAval < 0 ? [["Avaliação acima do preço", -r.extraAval, "menos"] as [string, number, "menos"]] : []),
    ...(r.extraRenda > 0 ? [["Parte que sua renda não cobre", r.extraRenda, "neutra"] as [string, number, "neutra"]] : []),
    ["ITBI, imposto da prefeitura", (r.V * PARAMS.itbi) / 100, "neutra"],
    ["Escritura e registro no cartório", (r.V * PARAMS.cartorio) / 100, "neutra"],
    ["Avaliação e taxas do banco", (r.V * PARAMS.avaliacao) / 100, "neutra"],
  ];
  const total = r.entrada + r.custos;
  const fr = (x: number) => Math.max(x, 1);
  return (
    <>
      {/* pt-2: o rótulo da cota sobe acima da linha, e o overflow-x cortaria o topo dele. */}
      <div className="flex flex-col gap-1 overflow-x-auto pt-2">
        <Cota rotulo={`preço do imóvel · ${brl(r.V)}`} className="mb-2 min-w-[460px]" />
        <div className="flex h-16 min-w-[460px] gap-1 text-sm font-semibold" style={{ display: "grid", gridTemplateColumns: `${fr(r.entrada)}fr ${fr(r.P)}fr ${fr(r.custos)}fr` }}>
          <div className="flex min-w-24 flex-col justify-center whitespace-nowrap rounded-l-lg bg-mark px-3">Entrada<span className="font-normal tabular-nums">{brl(r.entrada)}</span></div>
          <div className="flex min-w-28 flex-col justify-center whitespace-nowrap bg-planta px-3">Banco empresta<span className="font-normal tabular-nums">{brl(r.P)}</span></div>
          <div className="bg-hachura ml-2 flex min-w-24 flex-col justify-center whitespace-nowrap rounded-r-lg px-2"><span className="w-fit bg-mark-soft px-1">Custos</span><span className="w-fit bg-mark-soft px-1 font-normal tabular-nums">{brl(r.custos)}</span></div>
        </div>
      </div>
      <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 text-[15px]">
        {linhas.map(([t, v, tipo]) => (
          <div key={t} className="contents">
            <dt>{t}</dt>
            <dd className="text-right tabular-nums">{tipo === "menos" ? `− ${brl(v)}` : brl(v)}</dd>
          </div>
        ))}
        <dt className="border-t border-ink pt-2 font-semibold">Total que sai de você</dt>
        <dd className="border-t border-ink pt-2 text-right font-semibold tabular-nums">{brl(total)}</dd>
        <dt className="text-ink-2">Seu FGTS (na entrada)</dt>
        <dd className="text-right tabular-nums text-ok">− {brl(r.fgtsNaEntrada)}</dd>
        <dt className="text-ink-2">Seu dinheiro guardado</dt>
        <dd className="text-right tabular-nums text-ok">− {brl(Math.min(r.reserva, r.precisaDinheiro))}</dd>
        <dt className="font-semibold">Falta</dt>
        <dd className={cn("text-right font-semibold tabular-nums", r.gap ? "text-bad" : "text-ok")}>{brl(r.gap)}</dd>
      </dl>
      <p className="text-[15px] text-ink-2">
        Na compra, o FGTS <b>só entra na entrada</b>. O ITBI sai do dinheiro guardado. O cartório também, mas ele <b>pode ser incluído no financiamento</b>: pergunte no banco na hora de contratar.
        {perfil.fgtsOpt === "sim" && r.fgtsUse === 0 && " Pelas suas respostas, seu FGTS não pode ser usado nessa compra."}
      </p>
      <p className="text-[15px] text-ink-2">
        Depois da compra, o FGTS volta a ajudar: a cada 2 anos ele pode <b>abater ou quitar a dívida</b>, e também pode <b>pagar parte da prestação</b>. Não saque à toa.
      </p>
    </>
  );
}

function Avaliacao({ r, perfil }: { r: R; perfil: Perfil }) {
  const [avalPct, setAvalPct] = useState(90);
  if (r.modo === "imovel" && perfil.avaliou && perfil.avalReal > 0) {
    const a = perfil.avalReal;
    return (
      <p className="text-[16px]">
        O banco avaliou em <b>{brl(a)}</b>
        {a < r.V ? (
          <>, {brl(r.V - a)} abaixo do preço. Como ele empresta com base na avaliação, você cobre mais <span className="marca-texto">{brl(r.extraAval)}</span>. Use isso pra negociar o preço com o vendedor.</>
        ) : a > r.V ? (
          <>, {brl(a - r.V)} acima do preço. Como ele empresta com base na avaliação, <span className="marca-texto">sua entrada cai {brl(Math.max(0, -r.extraAval))}</span>. Ele só não empresta mais que o preço de venda.{r.extraRenda > 0 && " Aqui quem limita é a sua renda, não a avaliação."}</>
        ) : (
          <>, igual ao preço. A avaliação não muda sua conta.</>
        )}
      </p>
    );
  }
  const avalV = (r.V * avalPct) / 100;
  const Pn = Math.min(r.prog.ltv * avalV, r.V, r.Pcap);
  const diff = Pn - r.P;
  return (
    <>
      <p className="text-[15px] text-ink-2">
        Antes de liberar o dinheiro, um engenheiro do banco vistoria o imóvel. <b>O banco empresta até {Math.round(r.prog.ltv * 100)}% do valor dessa avaliação</b>, sem passar do preço de venda. Avaliou abaixo, você cobre a diferença. Avaliou acima, sua entrada diminui.
      </p>
      <Deslizador
        id="aval"
        rotulo="Se o banco avaliar em"
        saida={`${avalPct}% do preço`}
        min={70}
        max={150}
        step={5}
        valor={avalPct}
        onChange={setAvalPct}
        humor={diff < -1 ? "triste" : diff > 1 ? "feliz" : "gentil"}
      />
      <p className="font-display text-2xl font-semibold">
        {diff < -1 ? <>Você teria que cobrir mais <span className="marca-texto">{brl(-diff)}</span>.</> : diff > 1 ? <>Sua entrada cairia <span className="marca-texto">{brl(diff)}</span>.</> : "Nesse cenário, nada muda pra você."}
      </p>
      <p className="text-[15px] text-ink-2">
        {diff < -1
          ? <>Se o imóvel de {brl(r.V)} for avaliado em {brl(avalV)}, o banco empresta no máximo {brl(Pn)}. A diferença sai do seu bolso no dia da assinatura. <b>Peça a avaliação antes de pagar qualquer sinal.</b></>
          : diff > 1
            ? `Avaliado em ${brl(avalV)}, o banco empresta ${brl(Pn)}${Pn >= r.V - 1 ? ", o preço inteiro" : ""}. Ele usa a avaliação, mas nunca empresta mais que o preço de venda.`
            : avalPct > 100
              ? "Sua renda já limita o empréstimo, então uma avaliação maior não aumenta o que o banco libera."
              : `Sua renda já limita o empréstimo abaixo de ${Math.round(r.prog.ltv * 100)}% do imóvel, então essa avaliação ainda cobre o que o banco vai liberar.`}
      </p>
    </>
  );
}

function Plano({ r, perfil, poup, setPoup }: { r: R; perfil: Perfil; poup: number; setPoup: (v: number) => void }) {
  const meses = Math.ceil(r.gap / poup);
  const data = new Date();
  data.setMonth(data.getMonth() + meses);
  const prep = [
    r.gap > 0 && `juntar ${brl(r.gap)} pra entrada e custos`,
    perfil.nome === "nao" && "limpar o nome",
    perfil.nome === "naosei" && "consultar o CPF",
    perfil.fgtsOpt === "naosei" && "ver o saldo do FGTS",
  ].filter(Boolean) as string[];
  const prepTxt = prep.length ? prep.join(", ").replace(/^./, (c) => c.toUpperCase()).replace(/, ([^,]*)$/, " e $1") + "." : "Nada pendente. Você já pode seguir.";
  const etapas: [string, string][] = [
    ["Diagnóstico", "Hoje. Você sabe seus números."],
    ["Preparar", prepTxt],
    ["Aprovação de crédito", "5 a 15 dias. O banco analisa você."],
    ["Escolher o imóvel", "Já sabendo o seu limite real."],
    ["Avaliação do banco", "7 a 15 dias. O engenheiro vistoria."],
    ["Análise de documentos", "15 a 30 dias. Imóvel e vendedor."],
    ["Contrato", "Assinatura com o banco."],
    ["ITBI, registro e chaves", "Até 30 dias pro registro sair."],
  ];
  const aqui = r.gap > 0 || perfil.nome !== "sim" || perfil.fgtsOpt === "naosei" ? 2 : r.modo === "imovel" ? 5 : 3;
  return (
    <>
      {r.gap > 0 && (
        <>
          <Deslizador id="poup" rotulo="Quanto você consegue guardar por mês" saida={brl(poup)} min={200} max={8000} step={100} valor={poup} onChange={setPoup} humor={meses <= 12 ? "feliz" : "gentil"} />
          <p className="font-display text-2xl font-semibold">
            Você chega lá em <span className="marca-texto">{meses} {meses === 1 ? "mês" : "meses"}</span>, por volta de {data.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}.
          </p>
        </>
      )}
      <ol className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {etapas.map(([t, d], k) => (
          <li
            key={t}
            className={cn(
              "relative flex flex-col gap-1 rounded-xl border p-3.5",
              k + 1 < aqui && "border-line bg-paper text-ink-2",
              k + 1 === aqui && "border-[1.5px] border-ink bg-surface",
              k + 1 > aqui && "border-line bg-surface",
            )}
          >
            {k + 1 === aqui && <span className="absolute -top-2.5 right-2.5 rounded bg-mark px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider">Você está aqui</span>}
            <span className="font-mono text-xs text-muted">{String(k + 1).padStart(2, "0")}</span>
            <b className="text-[15px]">{t}</b>
            <span className="text-sm text-ink-2">{d}</span>
          </li>
        ))}
      </ol>
      <p className="text-sm text-muted">Prazos típicos. Variam por banco, cidade e situação do imóvel.</p>
    </>
  );
}

function Numeros({ r }: { r: R }) {
  const f = r.price.first;
  const partes: [string, number, string][] = [
    ["O que abate a dívida", f.amort, "bg-mark"],
    ["Juros", f.j, "bg-planta-deep"],
    ["Seguros obrigatórios", f.seg, "bg-planta"],
    ["Taxa do banco", f.adm, "bg-line"],
  ];
  const sac1 = r.sac.first.pg;
  const economia = r.price.total - r.sac.total;
  return (
    <>
      <p className="text-[15px]">
        Dos <b>{brl(f.pg)}</b> do primeiro mês, só <span className="marca-texto">{brl(f.amort)}</span> diminuem a dívida. Por isso adiantar parcelas no começo economiza tanto.
      </p>
      <div className="flex h-5 overflow-hidden rounded-md">
        {partes.map(([t, v, c]) => (
          <i key={t} className={c} style={{ width: `${(v / f.pg) * 100}%` }} />
        ))}
      </div>
      <dl className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1.5 text-[15px]">
        {partes.map(([t, v, c]) => (
          <div key={t} className="contents">
            <span className={cn("size-3 rounded-sm", c)} aria-hidden />
            <dt>{t}</dt>
            <dd className="text-right tabular-nums">{brl(v)}</dd>
          </div>
        ))}
      </dl>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-[15px]">
          <thead className="text-sm text-muted">
            <tr>
              <th className="py-2 font-normal">{r.prog.curto} · {pct(r.ef)} a.a. · {r.n} meses</th>
              <th className="py-2 text-right font-normal">1ª parcela</th>
              <th className="py-2 text-right font-normal">Última</th>
              <th className="py-2 text-right font-normal">Total pago</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            <tr className="border-t border-line">
              <td className="py-2 font-semibold">PRICE (parcela fixa)</td>
              <td className="py-2 text-right">{brl(f.pg)}</td>
              <td className="py-2 text-right">{brl(r.price.last)}</td>
              <td className="py-2 text-right">{brl(r.price.total)}</td>
            </tr>
            <tr className="border-t border-line">
              <td className="py-2 font-semibold">SAC (começa alta e cai)</td>
              <td className="py-2 text-right">{brl(sac1)}</td>
              <td className="py-2 text-right">{brl(r.sac.last)}</td>
              <td className="py-2 text-right">{brl(r.sac.total)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-[15px] text-ink-2">
        {sac1 > r.C + 1
          ? `SAC economiza ${brl(economia)} no total, mas a 1ª parcela (${brl(sac1)}) passa do seu limite de ${brl(r.C)}. Pra usar SAC, o valor emprestado teria que ser menor.`
          : `SAC cabe no seu limite e economiza ${brl(economia)} no total. Vale perguntar ao banco.`}
      </p>
    </>
  );
}
