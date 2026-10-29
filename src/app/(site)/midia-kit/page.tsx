import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Eyebrow } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { JoaoDeBarro } from "@/components/brand/JoaoDeBarro";
import { EmailJoao } from "@/components/brand/EmailJoao";
import { LinkParceiro } from "@/components/conteudo/LinkParceiro";
import { metadadosPagina } from "@/lib/seo";

export const metadata: Metadata = metadadosPagina({
  titulo: "Mídia kit da Primeira Chave para parceiros",
  descricao: "Para correspondentes Caixa Aqui, corretores e imobiliárias: o seu link de parceiro, logos, o João-de-barro, posts prontos e textos para divulgar a Primeira Chave.",
  slug: "/midia-kit/",
});

/**
 * Mídia kit para quem divulga a Primeira Chave (CCA, corretor, imobiliária). Artes em
 * public/kit/, geradas a partir dos componentes da marca (Logo, JoaoDeBarro, Imovel) e das
 * fotos de arquitetura do Pexels (licença livre, créditos em social/_fotos/CREDITOS.md).
 */

type Arte = { arquivo: string; titulo: string; texto: string; fundo?: string };
type Categoria = { id: string; titulo: string; descricao: string; formato: "post" | "story" | "quadro"; artes: Arte[] };

const FRASES = ["Primeiro imóvel? Simule antes de visitar.", "Quanto a sua renda compra?", "Dá pra financiar sem entrada?", "Financiamento explicado"];

const CATEGORIAS: Categoria[] = [
  {
    id: "posts",
    titulo: "Posts com fotos de arquitetura",
    descricao: "Para o feed do Instagram e do Facebook, 1080×1350. Foto real, a casinha desenhada e o logo.",
    formato: "post",
    artes: FRASES.map((f, k) => ({ arquivo: `primeira-chave-post-${k + 1}.jpg`, titulo: f, texto: "Post · 1080×1350" })),
  },
  {
    id: "stories",
    titulo: "Stories e status",
    descricao: "Para story do Instagram e status do WhatsApp, 1080×1920. Ponha o seu link por cima com o adesivo de link.",
    formato: "story",
    artes: FRASES.map((f, k) => ({ arquivo: `primeira-chave-story-${k + 1}.jpg`, titulo: f, texto: "Story · 1080×1920" })),
  },
  {
    id: "marca",
    titulo: "Marca",
    descricao: "Logo e ícone para o seu site, apresentação ou material impresso.",
    formato: "quadro",
    artes: [
      { arquivo: "primeira-chave-logo.png", titulo: "Logo", texto: "Fundo transparente · 1800×560", fundo: "bg-surface" },
      { arquivo: "primeira-chave-logo-papel.png", titulo: "Logo com fundo", texto: "Fundo papel · 1800×560" },
      { arquivo: "primeira-chave-icone.png", titulo: "Ícone", texto: "A chave no círculo · 1024×1024", fundo: "bg-surface" },
      { arquivo: "primeira-chave-capa-1200x630.png", titulo: "Capa", texto: "Para link e apresentação · 1200×630" },
    ],
  },
  {
    id: "casinha",
    titulo: "A casinha, sem o João",
    descricao: "Os desenhos de casa e apartamento, para compor as suas próprias artes.",
    formato: "quadro",
    artes: [
      { arquivo: "primeira-chave-casa.png", titulo: "Casa", texto: "Transparente · 1024×1024", fundo: "bg-surface" },
      { arquivo: "primeira-chave-apartamento.png", titulo: "Apartamento", texto: "Transparente · 1024×1024", fundo: "bg-surface" },
    ],
  },
  {
    id: "joao",
    titulo: "O João-de-barro",
    descricao: "O mascote, que constrói a casa barro por barro.",
    formato: "quadro",
    artes: [
      { arquivo: "primeira-chave-avatar.png", titulo: "Avatar", texto: "Para perfil · 1080×1080" },
      { arquivo: "primeira-chave-joao-chave.png", titulo: "João com a chave", texto: "Transparente · 1024×1024", fundo: "bg-surface" },
      { arquivo: "primeira-chave-joao-comemora.png", titulo: "João comemorando", texto: "Transparente · 1024×1024", fundo: "bg-surface" },
      { arquivo: "primeira-chave-joao-voando.png", titulo: "João voando", texto: "Transparente · 1024×1024", fundo: "bg-surface" },
      { arquivo: "primeira-chave-joao-frente.png", titulo: "João de frente", texto: "Transparente · 1024×1024", fundo: "bg-surface" },
    ],
  },
];

const PROPORCAO = { post: "aspect-[4/5]", story: "aspect-[9/16]", quadro: "aspect-[16/10]" };
const GRADE = { post: "grid-cols-2 lg:grid-cols-4", story: "grid-cols-2 lg:grid-cols-4", quadro: "sm:grid-cols-2 lg:grid-cols-3" };

const TEXTOS = [
  {
    titulo: "Para a bio ou o status",
    texto: "Antes de procurar imóvel, faça a simulação grátis na Primeira Chave: quanto você pode financiar e quanto precisa de entrada.",
  },
  {
    titulo: "Para mandar ao cliente",
    texto:
      "Oi! Antes da gente conversar sobre o financiamento, faz essa simulação rapidinho: são umas 10 perguntas, sem cadastro, e mostra quanto você pode comprar, a entrada e o próximo passo. Depois me manda o resultado que eu te ajudo com o resto.",
  },
  {
    titulo: "Para o story",
    texto: "Primeiro imóvel? Antes de visitar, descubra quanto cabe no seu bolso. Link aqui 👇",
  },
];

export default function MidiaKitPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 pb-10 pt-12 sm:px-6">
      <header className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-5">
          <Eyebrow>Para parceiros · CCA, corretor e imobiliária</Eyebrow>
          <h1 className="font-display text-[clamp(36px,5.6vw,60px)] font-light leading-[1.02]">
            Mídia kit: divulgue e <span className="marca-texto font-semibold">receba o cliente pronto.</span>
          </h1>
          <p className="max-w-xl text-lg text-ink-2">
            Cliente que entende o financiamento chega com a conta feita e os documentos certos. Pegue o seu link de parceiro, as artes e os textos, e use à
            vontade. É grátis.
          </p>
          <nav aria-label="Nesta página" className="flex flex-wrap gap-2 font-mono text-[13px]">
            {[
              ["#link", "Seu link"],
              ["#artes", "Criativos"],
              ["#posts", "Posts prontos"],
              ["#textos", "Textos"],
              ["#regras", "Regras de uso"],
            ].map(([href, rotulo]) => (
              <a key={href} href={href} className="rounded-full border border-line bg-surface px-3 py-1.5 hover:border-ink">
                {rotulo}
              </a>
            ))}
          </nav>
        </div>
        <JoaoDeBarro pose="comemora" humor="feliz" className="w-40 justify-self-center md:w-52" />
      </header>

      <section id="link" className="flex scroll-mt-24 flex-col gap-4">
        <h2 className="font-display text-3xl font-semibold">1. O seu link de parceiro</h2>
        <p className="max-w-2xl text-ink-2">
          Cada parceiro tem um link próprio. É com ele que a gente sabe quantas pessoas você trouxe. Use o mesmo nome sempre, no Instagram, no WhatsApp e no
          site.
        </p>
        <Card variant="strong">
          <LinkParceiro />
        </Card>
      </section>

      <section id="artes" className="flex scroll-mt-24 flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-3xl font-semibold">2. Criativos para baixar</h2>
          <nav aria-label="Categorias de criativos" className="flex flex-wrap gap-2 font-mono text-[13px]">
            {CATEGORIAS.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="rounded-full border border-line bg-surface px-3 py-1.5 hover:border-ink">
                {c.titulo} · {c.artes.length}
              </a>
            ))}
          </nav>
        </div>
        {CATEGORIAS.map((c) => (
          <div key={c.id} id={c.id} className="flex scroll-mt-24 flex-col gap-3">
            <h3 className="font-display text-2xl font-semibold">{c.titulo}</h3>
            <p className="text-[15px] text-ink-2">{c.descricao}</p>
            <ul className={`grid gap-4 ${GRADE[c.formato]}`}>
              {c.artes.map((a) => (
                <li key={a.arquivo} className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-line bg-surface p-3">
                  <div className={`flex items-center justify-center overflow-hidden rounded-xl border border-line ${PROPORCAO[c.formato]} ${a.fundo ?? "bg-paper"} bg-planta-grid`}>
                    <Image src={`/kit/${a.arquivo}`} alt={a.titulo} width={600} height={600} className={c.formato === "quadro" ? "h-full w-full object-contain" : "h-full w-full object-cover"} />
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <span className="min-w-0">
                      <b className="block text-[15px] leading-tight">{a.titulo}</b>
                      <span className="text-xs text-ink-2">{a.texto}</span>
                    </span>
                    <a
                      href={`/kit/${a.arquivo}`}
                      download={a.arquivo}
                      aria-label={`Baixar ${a.titulo}`}
                      className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl border-[1.5px] border-ink px-3 text-sm font-semibold hover:bg-paper"
                    >
                      <Download aria-hidden className="size-4" /> {a.arquivo.endsWith(".jpg") ? "JPG" : "PNG"}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="font-mono text-xs text-muted">Fotos de arquitetura: Pexels, licença livre para uso comercial.</p>
      </section>

      <section id="posts" className="flex scroll-mt-24 flex-col gap-4">
        <h2 className="font-display text-3xl font-semibold">3. Posts que explicam (com legenda)</h2>
        <Link
          href="/duvide/corretor/"
          className="group flex flex-col gap-2 rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface p-5 shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            <b className="block font-display text-xl">Cards no formato do Instagram, com legenda para copiar</b>
            <span className="text-[15px] text-ink-2">Mitos do financiamento, contrato de gaveta, ágio, avaliação. Baixe, copie a legenda e poste.</span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4">
            Ver os posts <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </section>

      <section id="textos" className="flex scroll-mt-24 flex-col gap-4">
        <h2 className="font-display text-3xl font-semibold">4. Textos para copiar</h2>
        <p className="text-ink-2">Coloque o seu link de parceiro no final de cada um.</p>
        <ul className="grid gap-4 md:grid-cols-3">
          {TEXTOS.map((t) => (
            <li key={t.titulo} className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-line bg-surface p-4">
              <b>{t.titulo}</b>
              <p className="select-all text-[15px] text-ink-2">{t.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="regras" className="flex scroll-mt-24 flex-col gap-4">
        <h2 className="font-display text-3xl font-semibold">5. Regras de uso</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card variant="planta" className="flex flex-col gap-2">
            <b>Pode</b>
            <ul className="flex list-disc flex-col gap-1 pl-5 text-[15px]">
              <li>Usar o logo, o João e os posts nas suas redes, no WhatsApp e no seu site.</li>
              <li>Dizer que você recomenda a Primeira Chave para o cliente aprender e simular o financiamento.</li>
              <li>Mandar o simulador antes do atendimento.</li>
            </ul>
          </Card>
          <Card variant="bad" className="flex flex-col gap-2">
            <b>Não pode</b>
            <ul className="flex list-disc flex-col gap-1 pl-5 text-[15px]">
              <li>Mudar as cores, esticar ou redesenhar o logo e o João.</li>
              <li>Dizer que a simulação é aprovação de crédito ou garantia de financiamento.</li>
              <li>Apresentar a Primeira Chave como banco, como a Caixa ou como parte do seu negócio.</li>
              <li>Cobrar do cliente pelo acesso à Primeira Chave: é grátis.</li>
            </ul>
          </Card>
        </div>
        <p className="text-[15px] text-ink-2">
          A Primeira Chave é conteúdo educativo: não é banco nem correspondente, e não tem vínculo com a Caixa. Dúvidas ou outro formato de arte? Escreva para{" "}
          <EmailJoao className="font-semibold underline" />.
        </p>
      </section>
    </div>
  );
}
