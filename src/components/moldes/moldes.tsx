import type { ReactNode } from "react";
import { LogoAssinatura, LogoNome } from "@/components/brand/Logo";
import { Ilustracao } from "@/components/brand/ilustracoes";
import { IconeLinha, type NomeIcone } from "@/components/brand/icones";
import { JoaoDeBarro, Ninho } from "@/components/brand/JoaoDeBarro";
import { rendaMinimaPara } from "@/lib/financiamento/engine";
import { brl } from "@/lib/format";

/**
 * Moldes de redes sociais e compartilhamento, desenhados no tamanho real de exportação.
 * Cada um tem rota própria em /molde/<slug>/ para virar PNG (print do navegador ou script).
 */

function Moldura({ w, h, children, grade = true, className = "" }: { w: number; h: number; children: ReactNode; grade?: boolean; className?: string }) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden bg-paper text-ink ${grade ? "bg-[length:40px_40px] bg-planta-grid" : ""} ${className}`}
      style={{ width: w, height: h }}
    >
      {children}
    </div>
  );
}

function Rodape({ tamanho = 40, cta = "simule grátis · primeirachave.com.br" }: { tamanho?: number; cta?: string }) {
  return (
    <div className="flex items-end justify-between gap-6">
      <span style={{ fontSize: tamanho }}>
        <LogoNome />
      </span>
      <span className="font-mono text-ink-2" style={{ fontSize: tamanho * 0.5 }}>
        {cta}
      </span>
    </div>
  );
}

function PostSegredo() {
  return (
    <Moldura w={1080} h={1350} className="justify-between p-[84px]">
      <div className="flex flex-col gap-7">
        <span className="font-mono text-[24px] tracking-[0.08em]">O SEGREDO QUE POUCA GENTE CONTA</span>
        <h1 className="font-display text-[128px] font-light leading-[0.95] tracking-[-0.035em]">
          Dá pra comprar <span className="marca-texto font-semibold">sem entrada.</span>
        </h1>
      </div>
      <div className="flex flex-col gap-4 rounded-3xl border-[3px] border-ink bg-surface p-10 font-mono text-[34px]">
        <div className="flex justify-between"><span className="text-ink-2">preço de venda</span><span>R$ 100.000</span></div>
        <div className="flex justify-between"><span className="text-ink-2">banco avaliou em</span><span>R$ 125.000</span></div>
        <div className="flex justify-between border-b-2 border-line pb-4"><span className="text-ink-2">banco empresta 80%</span><span>R$ 100.000</span></div>
        <div className="flex items-center justify-between pt-1">
          <span className="font-display text-[44px] font-semibold">sua entrada</span>
          <span className="rounded-xl bg-mark px-5 py-1 font-display text-[64px] font-semibold">R$ 0</span>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <Rodape tamanho={38} cta="" />
        <div className="flex items-end gap-2">
          <JoaoDeBarro pose="chave" className="w-[230px]" />
          <Ninho className="w-[150px]" />
        </div>
      </div>
    </Moldura>
  );
}

function PostNumero({ valor = 300000 }: { valor?: number }) {
  const x = rendaMinimaPara(valor)!;
  return (
    <Moldura w={1080} h={1350} className="justify-between p-[84px]">
      <div className="flex flex-col gap-6">
        <span className="font-mono text-[24px] tracking-[0.08em]">QUANTO PRECISO GANHAR</span>
        <h1 className="font-display text-[84px] font-light leading-[1.02] tracking-[-0.03em]">
          pra financiar um imóvel de <span className="font-semibold">{brl(valor).replace(",00", "")}?</span>
        </h1>
      </div>
      <div className="flex flex-col gap-5">
        <span className="font-display text-[176px] font-semibold leading-none tracking-[-0.04em]">
          <span className="marca-texto">{brl(x.renda)}</span>
        </span>
        <span className="font-display text-[40px] font-light">por mês, de renda bruta.</span>
        <div className="mt-4 grid grid-cols-3 gap-4 font-mono text-[24px]">
          {[
            ["parcela", brl(x.parcela)],
            ["entrada", brl(x.entrada)],
            ["linha", x.programa.curto.replace("MCMV ", "MCMV · ")],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1 rounded-2xl border-2 border-ink bg-surface p-5">
              <span className="text-ink-2">{k}</span>
              <span className="text-[30px] font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end justify-between gap-8">
        <div className="flex flex-col gap-3">
          <span className="max-w-[560px] text-[22px] text-ink-2">Sem outras dívidas, 30 anos de idade, prazo de 35 anos. Juros sem TR. Cada caso muda: faça a sua conta.</span>
          <Rodape tamanho={36} />
        </div>
        <Ilustracao nome="calcular" className="!w-[300px] shrink-0" />
      </div>
    </Moldura>
  );
}

const DOCUMENTOS: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: "cpf", titulo: "Documento com foto e CPF", texto: "RG ou CNH. Do comprador e de quem compõe a renda junto." },
  { icone: "documento", titulo: "Comprovante de renda", texto: "Holerites recentes. Autônomo: extratos e declaração." },
  { icone: "carimbo", titulo: "Declaração de IR com recibo", texto: "A última entregue. Se retificou fora do prazo, leve as duas." },
  { icone: "casa", titulo: "Matrícula do imóvel", texto: "Certidão de inteiro teor atualizada, com ônus reais." },
  { icone: "ok", titulo: "Documentos do vendedor", texto: "Identidade e estado civil. Se for empresa, o contrato social." },
];

function CarrosselCapa() {
  return (
    <Moldura w={1080} h={1350} className="justify-between p-[84px]">
      <div className="flex justify-between font-mono text-[24px]">
        <span className="tracking-[0.08em]">CHECKLIST</span>
        <span>1/7</span>
      </div>
      <h1 className="font-display text-[118px] font-light leading-[0.96] tracking-[-0.035em]">
        Os <span className="marca-texto font-semibold">5 documentos</span> que o banco vai pedir.
      </h1>
      <Ilustracao nome="documentos" className="!w-[760px] self-center" />
      <div className="flex items-center justify-between">
        <Rodape tamanho={36} cta="arraste pro lado →" />
      </div>
    </Moldura>
  );
}

function CarrosselMiolo({ i = 1 }: { i?: number }) {
  const d = DOCUMENTOS[i];
  return (
    <Moldura w={1080} h={1350} className="justify-between p-[84px]">
      <div className="flex justify-between font-mono text-[24px]">
        <span className="tracking-[0.08em]">CHECKLIST</span>
        <span>{i + 2}/7</span>
      </div>
      <div className="flex flex-col gap-10">
        <span className="flex size-[150px] items-center justify-center rounded-[36px] border-[3px] border-ink bg-surface">
          <IconeLinha nome={d.icone} className="!size-[96px]" />
        </span>
        <span className="font-mono text-[40px]">0{i + 1}</span>
        <h2 className="font-display text-[96px] font-semibold leading-[1] tracking-[-0.03em]">{d.titulo}</h2>
        <p className="max-w-[820px] text-[40px] leading-[1.35] text-ink-2">{d.texto}</p>
      </div>
      <Rodape tamanho={34} cta="salve pra não esquecer" />
    </Moldura>
  );
}

function Story() {
  return (
    <Moldura w={1080} h={1920} className="justify-between px-[84px] pb-[220px] pt-[260px]">
      <div className="flex flex-col gap-8">
        <span className="font-mono text-[30px] tracking-[0.08em]">PERGUNTA DO DIA</span>
        <h1 className="font-display text-[132px] font-light leading-[0.95] tracking-[-0.035em]">
          Dá pra comprar casa <span className="marca-texto font-semibold">sem entrada?</span>
        </h1>
      </div>
      <Ilustracao nome="avaliacao" className="!w-[900px] self-center" />
      <div className="flex flex-col gap-6">
        <div className="rounded-3xl bg-ink p-10 text-paper">
          <span className="font-display text-[56px] font-semibold">Dá, se o banco avaliar o imóvel 25% acima do preço.</span>
        </div>
        <Rodape tamanho={40} cta="link na bio" />
      </div>
    </Moldura>
  );
}

function Compartilhamento() {
  return (
    <Moldura w={1200} h={630} className="justify-between p-[64px]">
      <span className="text-[60px]">
        <LogoAssinatura />
      </span>
      <div className="flex items-end justify-between gap-10">
        <h1 className="max-w-[760px] font-display text-[64px] font-light leading-[1.02] tracking-[-0.03em]">
          Financiamento do primeiro imóvel, <span className="marca-texto font-semibold">explicado.</span>
        </h1>
        <span className="shrink-0 font-mono text-[24px] text-ink-2">primeirachave.com.br</span>
      </div>
    </Moldura>
  );
}

function Avatar() {
  return (
    <Moldura w={1080} h={1080} grade={false} className="items-center justify-center bg-transparent">
      <span className="flex size-[1080px] items-center justify-center rounded-full bg-mark">
        <JoaoDeBarro pose="chave" pequeno className="w-[800px]" />
      </span>
    </Moldura>
  );
}

export const MOLDES = [
  { slug: "post-segredo", nome: "Post · O segredo", formato: "Feed 1080×1350", w: 1080, h: 1350, Componente: PostSegredo },
  { slug: "post-quanto-ganhar", nome: "Post · Quanto preciso ganhar", formato: "Feed 1080×1350 (números do motor)", w: 1080, h: 1350, Componente: PostNumero },
  { slug: "carrossel-capa", nome: "Carrossel · Capa", formato: "Feed 1080×1350", w: 1080, h: 1350, Componente: CarrosselCapa },
  { slug: "carrossel-miolo", nome: "Carrossel · Miolo", formato: "Feed 1080×1350", w: 1080, h: 1350, Componente: () => <CarrosselMiolo i={1} /> },
  { slug: "story", nome: "Story · Pergunta do dia", formato: "Story 1080×1920", w: 1080, h: 1920, Componente: Story },
  { slug: "compartilhamento", nome: "Imagem de compartilhamento", formato: "OG 1200×630", w: 1200, h: 630, Componente: Compartilhamento },
  { slug: "avatar", nome: "Avatar", formato: "1080×1080", w: 1080, h: 1080, Componente: Avatar },
] as const;

export type Molde = (typeof MOLDES)[number];
