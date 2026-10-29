"use client";

import { useState, type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import { Eyebrow } from "@/components/ui/badge";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import {
  PERFIL_EXEMPLO,
  PERFIL_VAZIO,
  type Perfil,
} from "@/lib/financiamento/engine";
import { BotaoOpcao, CampoDinheiro, LinhaComAcao } from "./campos";
import { perguntasVisiveis, respondida, type Pergunta } from "./perguntas";
import { Resultado } from "./Resultado";

type Tela = "inicio" | "pergunta" | "resultado";

/** `titulo`: o H1 da página (com a palavra-chave), discreto em cima da manchete. */
export function Simulador({ titulo }: { titulo?: string }) {
  const [tela, setTela] = useState<Tela>("inicio");
  const [perfil, setPerfil] = useState<Perfil>(PERFIL_VAZIO);
  const [passo, setPasso] = useState(0);
  const [exemplo, setExemplo] = useState(false);

  const visiveis = perguntasVisiveis(perfil);
  const atual = visiveis[passo];

  const irPara = (t: Tela) => {
    setTela(t);
    window.scrollTo({ top: 0 });
  };

  // A resposta pode abrir ou fechar perguntas (ex.: "Já achei" abre a do imóvel),
  // então o "próximo" é calculado com o perfil já atualizado.
  const avancar = (p: Perfil = perfil) => {
    const lista = perguntasVisiveis(p);
    const q = lista[passo];
    if (!q || !respondida(q, p)) return;
    if (passo >= lista.length - 1) irPara("resultado");
    else {
      setPasso(passo + 1);
      window.scrollTo({ top: 0 });
    }
  };

  const mudar = (patch: Partial<Perfil>) =>
    setPerfil((p) => ({ ...p, ...patch }));

  if (tela === "inicio") {
    return (
      <section className="mx-auto flex max-w-3xl flex-col gap-7 px-4 py-14 sm:px-6 sm:py-20">
        {titulo ? (
          <h1 className="font-mono text-xs uppercase tracking-[0.07em] text-ink-2">
            {titulo}
          </h1>
        ) : (
          <Eyebrow>Primeiro imóvel · financiamento</Eyebrow>
        )}
        <p className="font-display text-[clamp(36px,6vw,60px)] font-light leading-[1.02]">
          Descubra quanto você pode comprar,{" "}
          <span className="marca-texto font-semibold">
            em palavras que dá pra entender.
          </span>
        </p>
        <p className="max-w-xl text-lg text-ink-2">
          Umas 10 perguntas simples. No fim você recebe um número, o que ele
          significa e o seu próximo passo.
        </p>
        <ul className="flex flex-wrap gap-2 font-mono text-[13px]">
          {["2 minutos", "Sem cadastro", "“Não sei” vale como resposta"].map(
            (t) => (
              <li
                key={t}
                className="rounded-full border border-line bg-surface px-3 py-1.5"
              >
                {t}
              </li>
            ),
          )}
        </ul>
        <div className="flex flex-wrap items-center gap-5">
          <Button
            size="lg"
            onClick={() => {
              setPerfil(PERFIL_VAZIO);
              setExemplo(false);
              setPasso(0);
              irPara("pergunta");
            }}
          >
            Começar
          </Button>
          <Button
            variant="link"
            onClick={() => {
              setPerfil(PERFIL_EXEMPLO);
              setExemplo(true);
              irPara("resultado");
            }}
          >
            Ver um resultado de exemplo
          </Button>
        </div>
        <JoaoDeBarro pose="barro" className="mt-4 w-40 self-end" />
      </section>
    );
  }

  if (tela === "resultado") {
    return (
      <Resultado
        perfil={perfil}
        exemplo={exemplo}
        onRefazer={() => {
          setPasso(0);
          setExemplo(false);
          if (exemplo) setPerfil(PERFIL_VAZIO);
          irPara("pergunta");
        }}
        onInformarPreco={() => {
          setPasso(
            perguntasVisiveis(perfil).findIndex(
              (q) => q.chave === "imovelDados",
            ),
          );
          irPara("pergunta");
        }}
      />
    );
  }

  return (
    <section className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => (passo === 0 ? irPara("inicio") : setPasso(passo - 1))}
          className="-ml-2 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-[15px] font-semibold hover:bg-ink/5"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {passo === 0 ? "Início" : "Voltar"}
        </button>
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={visiveis.length}
          aria-valuenow={passo + 1}
          aria-label="Progresso"
        >
          <div
            className="h-full rounded-full bg-ink transition-[width]"
            style={{ width: `${(passo / visiveis.length) * 100}%` }}
          />
        </div>
        <span className="font-mono text-[13px] text-muted">
          {passo + 1} de {visiveis.length}
        </span>
      </div>

      <h1 className="font-display text-[clamp(28px,4.4vw,40px)] font-normal leading-[1.1]">
        {atual.pergunta(perfil)}
      </h1>
      <p className="text-[17px] text-ink-2 [&_b]:font-semibold [&_b]:text-ink">
        {atual.ajuda(perfil)}
      </p>

      {/* Pergunta de um campo só: o "Continuar" vai colado nele, na mesma linha. Nas outras, logo abaixo, à esquerda. */}
      {(() => {
        const continuar = (
          <Button
            size="lg"
            onClick={() => avancar()}
            disabled={!respondida(atual, perfil)}
          >
            {passo === visiveis.length - 1 ? "Ver meu resultado" : "Continuar"}
          </Button>
        );
        const umCampo = atual.tipo === "idade" || atual.tipo === "dinheiro";
        return (
          <>
            <CorpoPergunta
              q={atual}
              perfil={perfil}
              mudar={mudar}
              avancar={avancar}
              acao={umCampo ? continuar : undefined}
            />
            {!umCampo && <div className="mt-1">{continuar}</div>}
          </>
        );
      })()}
    </section>
  );
}

function CorpoPergunta({
  q,
  perfil,
  mudar,
  avancar,
  acao,
}: {
  q: Pergunta;
  perfil: Perfil;
  mudar: (p: Partial<Perfil>) => void;
  avancar: (p?: Perfil) => void;
  acao?: ReactNode;
}) {
  if (q.tipo === "escolha") {
    const escolhido = perfil[q.campo] as string | null;
    return (
      <div className="flex flex-col gap-5">
        <div
          role="group"
          aria-label={q.pergunta(perfil)}
          className="grid gap-2.5 sm:grid-cols-2"
        >
          {q.opcoes.map((o) => (
            <BotaoOpcao
              key={o.valor}
              rotulo={o.rotulo}
              sub={o.sub}
              selecionado={escolhido === o.valor}
              onClick={() => {
                const novo = { ...perfil, [q.campo]: o.valor } as Perfil;
                mudar({ [q.campo]: o.valor } as Partial<Perfil>);
                if (!(q.valor && o.valor === q.valor.abreCom))
                  setTimeout(() => avancar(novo), 160);
              }}
            />
          ))}
        </div>
        {q.valor && escolhido === q.valor.abreCom && (
          <CampoDinheiro
            id={`campo-${q.chave}`}
            rotulo={q.valor.rotulo}
            valor={perfil[q.valor.campo] as number}
            onChange={(v) => mudar({ [q.valor!.campo]: v } as Partial<Perfil>)}
            onEnter={() => avancar()}
            autoFocus
          />
        )}
      </div>
    );
  }
  if (q.tipo === "idade") {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor="campo-idade" className="text-[15px] font-semibold">
          {q.rotulo}
        </label>
        <LinhaComAcao acao={acao}>
          <input
            id="campo-idade"
            type="number"
            inputMode="numeric"
            min={18}
            max={80}
            autoFocus
            value={perfil.idade ?? ""}
            onChange={(e) =>
              mudar({ idade: e.target.value ? Number(e.target.value) : null })
            }
            onKeyDown={(e) => e.key === "Enter" && avancar()}
            className="w-32 min-w-0 rounded-xl border-[1.5px] border-ink bg-surface px-4 py-3 font-display text-2xl"
          />
        </LinhaComAcao>
      </div>
    );
  }
  if (q.tipo === "dinheiro") {
    return (
      <CampoDinheiro
        id={`campo-${q.chave}`}
        rotulo={q.rotulo}
        valor={perfil[q.campo] as number}
        onChange={(v) => mudar({ [q.campo]: v } as Partial<Perfil>)}
        onEnter={() => avancar()}
        autoFocus
        acao={acao}
      />
    );
  }
  return (
    <div className="flex flex-col gap-5">
      {/* Preço e tipo na mesma linha: são as duas coisas que todo mundo sabe de cara. */}
      <div className="flex flex-wrap items-end gap-x-4 gap-y-5">
        <div className="min-w-0 flex-1 basis-60">
          <CampoDinheiro
            id="campo-preco"
            rotulo="Preço pedido pelo vendedor"
            valor={perfil.valor}
            onChange={(v) => mudar({ valor: v })}
            onEnter={() => avancar()}
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-2">
          <span id="tipo-imovel" className="text-[15px] font-semibold">
            Ele é
          </span>
          <div role="group" aria-labelledby="tipo-imovel" className="flex h-[62px] rounded-xl border-[1.5px] border-ink bg-surface p-1">
            {(["usado", "novo"] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={perfil.tipo === t}
                onClick={() => mudar({ tipo: t })}
                className={cn(
                  "min-w-24 rounded-lg px-4 text-base font-semibold transition-colors",
                  perfil.tipo === t ? "bg-mark" : "text-ink-2 hover:bg-ink/5",
                )}
              >
                {t === "usado" ? "Usado" : "Novo"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* O laudo: um cartão que abre o campo e já diz o que a avaliação muda na entrada. */}
      <div className={cn("flex flex-col gap-4 rounded-xl border-[1.5px] p-4 transition-colors", perfil.avaliou ? "border-ink bg-surface" : "border-line")}>
        <label className="flex cursor-pointer items-center gap-3">
          <input type="checkbox" checked={perfil.avaliou} onChange={(e) => mudar({ avaliou: e.target.checked })} className="peer sr-only" />
          <span
            aria-hidden
            className="relative h-7 w-12 shrink-0 rounded-full border-[1.5px] border-ink bg-paper transition-colors peer-checked:bg-mark peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-ink after:transition-transform peer-checked:after:translate-x-5"
          />
          <span className="flex flex-col">
            <span className="font-semibold">O banco já avaliou esse imóvel</span>
            <span className="text-sm text-ink-2">Se tem o laudo, a conta fica no valor que o banco aceita.</span>
          </span>
        </label>
        {perfil.avaliou && (
          <>
            <CampoDinheiro
              id="campo-laudo"
              rotulo="Valor da avaliação (está no laudo)"
              valor={perfil.avalReal}
              onChange={(v) => mudar({ avalReal: v })}
              onEnter={() => avancar()}
              autoFocus
            />
            <DicaAvaliacao preco={perfil.valor} avaliacao={perfil.avalReal} />
          </>
        )}
      </div>
    </div>
  );
}

/** O que a avaliação muda, em uma frase (o banco empresta sobre o laudo, nunca acima do preço). */
function DicaAvaliacao({ preco, avaliacao }: { preco: number; avaliacao: number }) {
  if (!preco || !avaliacao) return null;
  const dif = Math.round((avaliacao / preco - 1) * 100);
  const [cor, texto] =
    dif >= 25
      ? ["bg-mark", <>Avaliado <b>{dif}% acima</b> do preço: o banco pode financiar o preço inteiro. Sobram só ITBI e cartório.</>]
      : dif > 0
        ? ["bg-mark-soft", <>Avaliado <b>{dif}% acima</b> do preço: a sua entrada diminui. A partir de 25% acima, ela pode zerar.</>]
        : dif < 0
          ? ["bg-bad-soft", <>Avaliado <b>{-dif}% abaixo</b> do preço: o banco calcula sobre o laudo, e a entrada sobe.</>]
          : ["bg-paper", <>Avaliado pelo mesmo valor do preço: a conta segue a regra de sempre.</>];
  return (
    <p role="status" className={cn("rounded-lg px-3 py-2.5 text-[15px] [&_b]:font-semibold", cor)}>
      {texto}
    </p>
  );
}
