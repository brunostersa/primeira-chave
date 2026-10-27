import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Badge, Eyebrow } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cota, Icone, LogoAssinatura, LogoNome } from "@/components/brand/Logo";
import { JoaoDeBarro, Ninho } from "@/components/brand/JoaoDeBarro";
import { CENAS, Ilustracao, type NomeCena } from "@/components/brand/ilustracoes";
import { IconeLinha, NOMES_ICONES } from "@/components/brand/icones";
import { MOLDES } from "@/components/moldes/moldes";
import { DemosCampos } from "./Demos";

export const metadata: Metadata = {
  title: "Guia da marca",
  description: "Padrões da marca Primeira Chave: logo, cores, tipografia, componentes, mascote e tom de voz.",
  robots: { index: false, follow: false },
};

const CORES = [
  { nome: "Marca-texto", token: "mark", hex: "#F4D23F", papel: "O seu dinheiro: entrada, conquista, o destaque. No máximo um bloco cheio por tela.", fundo: "bg-mark", texto: "text-ink" },
  { nome: "Tinta", token: "ink", hex: "#121418", papel: "Texto, traço do mascote, botão principal.", fundo: "bg-ink", texto: "text-paper" },
  { nome: "Planta", token: "planta", hex: "#C6D6E3", papel: "O banco, os papéis e a casa.", fundo: "bg-planta", texto: "text-ink" },
  { nome: "Papel", token: "paper", hex: "#F2F3F1", papel: "Fundo de tudo. Respiro.", fundo: "bg-paper border border-line", texto: "text-ink" },
  { nome: "Superfície", token: "surface", hex: "#FFFFFF", papel: "Cards e campos sobre o papel.", fundo: "bg-surface border border-line", texto: "text-ink" },
  { nome: "Tinta 2", token: "ink-2", hex: "#3A3F47", papel: "Texto de apoio.", fundo: "bg-ink-2", texto: "text-paper" },
  { nome: "Cinza", token: "muted", hex: "#5A6069", papel: "Rótulos, cotas, legendas.", fundo: "bg-muted", texto: "text-paper" },
  { nome: "Linha", token: "line", hex: "#C9CDC7", papel: "Bordas e divisões.", fundo: "bg-line", texto: "text-ink" },
  { nome: "Planta fundo", token: "planta-deep", hex: "#6F8CA5", papel: "Juros e dados do banco em gráficos.", fundo: "bg-planta-deep", texto: "text-paper" },
];

const SINAIS = [
  { nome: "Ok", token: "ok", hex: "#1E8556", fundo: "bg-ok" },
  { nome: "Atenção", token: "warn", hex: "#A86E12", fundo: "bg-warn" },
  { nome: "Bloqueio", token: "bad", hex: "#BF3C35", fundo: "bg-bad" },
];

function Secao({ id, n, titulo, intro, children }: { id: string; n: string; titulo: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-6 border-t border-line pt-10">
      <div className="flex flex-col gap-2">
        <Eyebrow>{n}</Eyebrow>
        <h2 className="font-display text-4xl font-light">{titulo}</h2>
        {intro && <p className="max-w-2xl text-ink-2">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

export default function MarcaPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-14 sm:px-6">
      <header className="flex flex-col gap-5">
        <Eyebrow>Guia da marca · versão 1 · out/2026</Eyebrow>
        <h1 className="font-display text-[clamp(40px,6vw,68px)] font-light leading-none">
          Primeira Chave, <span className="marca-texto font-semibold">do jeito certo.</span>
        </h1>
        <p className="max-w-2xl text-lg text-ink-2">
          Tudo aqui é renderizado com os mesmos componentes do site: se está neste guia, é o que o site usa. Direção visual “Planta”: claro, calmo, construído — uma
          planta baixa do primeiro imóvel.
        </p>
        <nav aria-label="Seções do guia" className="flex flex-wrap gap-2 font-mono text-[13px]">
          {[
            ["principios", "Princípios"],
            ["logo", "Logo"],
            ["cores", "Cores"],
            ["tipografia", "Tipografia"],
            ["mascote", "Mascote"],
            ["ilustracoes", "Ilustrações"],
            ["icones", "Ícones"],
            ["moldes", "Moldes"],
            ["componentes", "Componentes"],
            ["padroes", "Padrões"],
            ["voz", "Tom de voz"],
          ].map(([id, t]) => (
            <a key={id} href={`#${id}`} className="rounded-full border border-line bg-surface px-3 py-1.5 no-underline hover:border-ink">
              {t}
            </a>
          ))}
        </nav>
      </header>

      <Secao id="principios" n="01" titulo="Princípios">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Número primeiro", "Toda tela responde uma pergunta com um número da pessoa, e só depois explica."],
            ["Cada cor tem um papel", "Amarelo é sempre o dinheiro de quem compra. Azul planta é sempre o banco. Nunca o contrário."],
            ["Medido, não enfeitado", "Linhas de cota, grade e traço fino. Decoração só quando mede ou explica algo."],
          ].map(([t, d]) => (
            <Card key={t}>
              <b className="font-display text-xl">{t}</b>
              <p className="mt-2 text-[15px] text-ink-2">{d}</p>
            </Card>
          ))}
        </div>
      </Secao>

      <Secao id="logo" n="02" titulo="Logo" intro="Quatro peças, cada uma com seu trabalho. O logo nunca muda; o mascote pode tudo.">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="flex flex-col gap-6">
            <Eyebrow>Logo principal</Eyebrow>
            <span className="text-5xl"><LogoNome cota /></span>
            <p className="text-[15px] text-ink-2">Cabeçalho, rodapé, documentos, e-mail, parcerias. Os lugares sérios e pequenos.</p>
          </Card>
          <Card className="flex flex-col gap-6 bg-planta-grid">
            <Eyebrow>Assinatura completa</Eyebrow>
            <span className="text-5xl"><LogoAssinatura /></span>
            <p className="text-[15px] text-ink-2">Momentos de destaque: abertura da home, capa da trilha, fim de vídeo, brindes.</p>
          </Card>
          <Card className="flex flex-col gap-6">
            <Eyebrow>Ícone</Eyebrow>
            <div className="flex items-end gap-4">
              <Icone className="w-24" />
              <Icone tom="ink" className="w-24" />
              <Icone className="w-12" />
              <Icone className="w-8" />
              <Icone className="w-4" />
            </div>
            <p className="text-[15px] text-ink-2">A chave-1 apoiada no círculo: favicon, resultado do Google, ícone de app, selo pequeno. Lê bem até 16 px.</p>
            <div className="flex items-center gap-4 border-t border-line pt-4">
              <Icone simbolo="passaro" className="w-16" />
              <p className="text-[15px] text-ink-2">Avatar das redes: o João-de-barro com a chave. Só em 40 px ou mais.</p>
            </div>
          </Card>
          <Card className="flex flex-col gap-4">
            <Eyebrow>Não faça</Eyebrow>
            <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[15px] text-ink-2">
              <li>Trocar a cor do grifo ou colocar o grifo em “primeira”.</li>
              <li>Usar a assinatura com o pássaro em tamanho menor que 160 px de largura.</li>
              <li>Pôr o logo sobre foto sem uma área de papel ou tinta por trás.</li>
              <li>Escrever “Primeira Chave” com outra fonte.</li>
            </ul>
          </Card>
        </div>
      </Secao>

      <Secao id="cores" n="03" titulo="Cores" intro={<>Tokens em <code className="font-mono text-sm">src/app/globals.css</code>, usados como classes Tailwind (<code className="font-mono text-sm">bg-mark</code>, <code className="font-mono text-sm">text-ink</code>…).</>}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CORES.map((c) => (
            <div key={c.token} className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
              <div className={`flex h-24 items-end p-3 ${c.fundo} ${c.texto}`}>
                <span className="font-mono text-xs">{c.hex}</span>
              </div>
              <div className="flex flex-col gap-1 p-4">
                <b>{c.nome} <span className="font-mono text-xs font-normal text-muted">{c.token}</span></b>
                <span className="text-sm text-ink-2">{c.papel}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {SINAIS.map((s) => (
            <span key={s.token} className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm">
              <i className={`size-3 rounded-full ${s.fundo}`} aria-hidden /> {s.nome} <span className="font-mono text-xs text-muted">{s.hex}</span>
            </span>
          ))}
          <span className="text-sm text-muted">Sinais só aparecem como ponto ou texto, nunca como fundo grande.</span>
        </div>
      </Secao>

      <Secao id="tipografia" n="04" titulo="Tipografia" intro="Três famílias, cada uma com uma função.">
        <div className="flex flex-col divide-y divide-line rounded-[var(--radius-card)] border border-line bg-surface">
          <div className="grid items-baseline gap-2 p-5 md:grid-cols-[1fr_260px]">
            <span className="font-display text-7xl font-light leading-none">Abc 123</span>
            <span className="text-sm text-ink-2"><b className="text-ink">Outfit</b> · títulos e números grandes. Fina (300) no texto, semibold (600) no destaque.</span>
          </div>
          <div className="grid items-baseline gap-2 p-5 md:grid-cols-[1fr_260px]">
            <span className="text-2xl">O banco empresta 80% do valor da avaliação.</span>
            <span className="text-sm text-ink-2"><b className="text-ink">Figtree</b> · todo o texto corrido, botões e campos.</span>
          </div>
          <div className="grid items-baseline gap-2 p-5 md:grid-cols-[1fr_260px]">
            <span className="font-mono text-lg">R$ 125.000 · +25% · 420 meses</span>
            <span className="text-sm text-ink-2"><b className="text-ink">IBM Plex Mono</b> · dados, cotas, rótulos e sobrancelhas.</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Eyebrow>Escala</Eyebrow>
          <p className="font-display text-[clamp(40px,6vw,72px)] font-light leading-none">H1 · Do zero à chave</p>
          <p className="font-display text-4xl font-light">H2 · O caminho do dinheiro</p>
          <p className="font-display text-2xl font-semibold">H3 · Seu próximo passo</p>
          <p className="text-lg text-ink-2">Lead · Descubra quanto você pode comprar.</p>
          <p className="text-base">Corpo · Use o valor do holerite antes dos descontos.</p>
          <p className="text-sm text-muted">Legenda · Prazos típicos. Variam por banco e cidade.</p>
        </div>
      </Secao>

      <Secao id="mascote" n="05" titulo="O João-de-barro" intro="O pássaro brasileiro que constrói a própria casa, barro por barro. Traço = ele; amarelo = o dinheiro que ele carrega; azul planta = a casa.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              ["chave", null, false, "Perfil com a chave (símbolo)"],
              ["frente", null, false, "De frente: conversa, explica, pergunta"],
              ["voando", "barro", false, "Voando: chegando com algo"],
              ["bicando", null, false, "Bicando: procurando, esperando"],
              ["barro", null, true, "Perfil virado, com barro"],
              ["frente", "chave", false, "De frente com a chave"],
              ["voando", "chave", true, "Voando virado, com a chave"],
              ["comemora", null, false, "Conquista"],
            ] as const
          ).map(([pose, carga, virado, t]) => (
            <Card key={t} className="flex flex-col items-center gap-3">
              <JoaoDeBarro pose={pose} carga={carga} virado={virado} className="h-28 w-auto" />
              <span className="font-mono text-xs text-muted">
                pose=&quot;{pose}&quot;{carga && ` carga="${carga}"`}{virado && " virado"}
              </span>
              <span className="text-center text-sm">{t}</span>
            </Card>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <Eyebrow>Humores · o sentimento mora nos olhos</Eyebrow>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {(
              [
                ["gentil", "o olhar dele (padrão)"],
                ["feliz", "conquista, deu certo"],
                ["curioso", "descobrindo"],
                ["pensativo", "fazendo a conta"],
                ["surpreso", "o segredo, a novidade"],
                ["triste", "negado, deu errado"],
                ["piscando", "dica, cumplicidade"],
              ] as const
            ).map(([humor, uso]) => (
              <Card key={humor} className="flex flex-col items-center gap-2 p-3 sm:p-4">
                <JoaoDeBarro pose="frente" humor={humor} className="h-24 w-auto" />
                <JoaoDeBarro pose="parado" humor={humor} className="h-16 w-auto" />
                <span className="font-mono text-xs">{humor}</span>
                <span className="text-center text-xs text-ink-2">{uso}</span>
              </Card>
            ))}
          </div>
          <p className="text-sm text-ink-2">A bochecha cor de barro (<code className="font-mono">--barro</code>) é a marca registrada do rosto dele e só aparece nele.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
          <Card className="flex items-end justify-center gap-4 bg-planta-grid">
            <JoaoDeBarro pose="parado" className="w-32" />
            <Ninho className="w-24" />
          </Card>
          <Card variant="strong" className="flex flex-col gap-2">
            <b className="font-display text-xl">Regras do mascote</b>
            <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[15px] text-ink-2">
              <li>Sempre em traço único, sem preenchimento colorido no corpo.</li>
              <li>O que ele carrega em amarelo é dinheiro (barro, moeda, chave). Documentos e a casa são azul planta.</li>
              <li>Ele explica e acompanha; nunca aparece no lugar do número principal.</li>
              <li>Rascunho atual: um ilustrador deve refinar mantendo proporções e poses.</li>
            </ul>
          </Card>
        </div>
      </Secao>

      <Secao id="ilustracoes" n="06" titulo="Ilustrações" intro={<>Cenas prontas em <code className="font-mono text-sm">src/components/brand/ilustracoes.tsx</code>. Uma por assunto do site; o pássaro muda de ângulo conforme a cena.</>}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(CENAS) as NomeCena[]).map((nome) => (
            <Card key={nome} className="flex flex-col gap-3">
              <Ilustracao nome={nome} />
              <b>{CENAS[nome].titulo}</b>
              <span className="text-sm text-ink-2">{CENAS[nome].uso}</span>
              <span className="font-mono text-xs text-muted">nome=&quot;{nome}&quot;</span>
            </Card>
          ))}
        </div>
      </Secao>

      <Secao id="icones" n="07" titulo="Ícones" intro="Traço 1,75 arredondado, no mesmo desenho do pássaro. Onde há dinheiro, um detalhe em marca-texto.">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {NOMES_ICONES.map((nome) => (
            <div key={nome} className="flex flex-col items-center gap-2 rounded-xl border border-line bg-surface p-4">
              <IconeLinha nome={nome} className="size-8" />
              <span className="font-mono text-xs text-muted">{nome}</span>
            </div>
          ))}
        </div>
      </Secao>

      <Secao id="moldes" n="08" titulo="Moldes" intro={<>No tamanho real em <code className="font-mono text-sm">/molde/&lt;nome&gt;/</code>, prontos pra virar PNG. O post “quanto preciso ganhar” usa os números do motor.</>}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOLDES.map((m) => {
            const escala = 300 / m.w;
            const { Componente } = m;
            return (
              <a key={m.slug} href={`/molde/${m.slug}/`} className="group flex flex-col gap-2 no-underline">
                <div className="overflow-hidden rounded-xl border border-line bg-surface group-hover:border-ink" style={{ width: 300, height: m.h * escala }}>
                  <div style={{ transform: `scale(${escala})`, transformOrigin: "top left", width: m.w, height: m.h }}>
                    <Componente />
                  </div>
                </div>
                <b className="text-[15px]">{m.nome}</b>
                <span className="font-mono text-xs text-muted">{m.formato}</span>
              </a>
            );
          })}
        </div>
      </Secao>

      <Secao id="componentes" n="09" titulo="Componentes" intro={<>Em <code className="font-mono text-sm">src/components/ui</code> (base, no padrão shadcn) e <code className="font-mono text-sm">src/components/simulador</code>.</>}>
        <div className="flex flex-col gap-3">
          <Eyebrow>Botões</Eyebrow>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Principal</Button>
            <Button variant="mark">Dinheiro / conquista</Button>
            <Button variant="outline">Secundário</Button>
            <Button variant="ghost">Discreto</Button>
            <Button variant="link">Link</Button>
            <Button size="sm">Pequeno</Button>
            <Button disabled>Desabilitado</Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Eyebrow>Cards</Eyebrow>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <Card>default</Card>
            <Card variant="strong">strong · próximo passo</Card>
            <Card variant="mark">mark · o segredo</Card>
            <Card variant="planta">planta · banco e papéis</Card>
            <Card variant="bad">bad · bloqueio</Card>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Eyebrow>Sinais</Eyebrow>
          <div className="flex flex-wrap gap-2">
            <Badge tone="ok">Parcela: cabe na renda</Badge>
            <Badge tone="warn">Entrada: falta pouco</Badge>
            <Badge tone="bad">Nome: regularizar</Badge>
            <Badge>Neutro</Badge>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Eyebrow>Campos do simulador</Eyebrow>
          <DemosCampos />
        </div>
      </Secao>

      <Secao id="padroes" n="10" titulo="Padrões gráficos">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="flex flex-col gap-4">
            <p className="font-display text-3xl font-light">Faltam <span className="marca-texto font-semibold">R$ 5 mil</span></p>
            <span className="text-sm text-ink-2"><code className="font-mono">marca-texto</code> · grifa o dinheiro no título.</span>
          </Card>
          <Card className="flex flex-col gap-6">
            <Cota rotulo="R$ 125 mil" className="mt-3" />
            <span className="text-sm text-ink-2"><code className="font-mono">&lt;Cota /&gt;</code> · mede valores e prazos.</span>
          </Card>
          <Card className="flex flex-col gap-4">
            <div className="bg-hachura h-14 rounded-lg" />
            <span className="text-sm text-ink-2"><code className="font-mono">bg-hachura</code> · custos (ITBI, cartório).</span>
          </Card>
          <Card className="bg-planta-grid flex flex-col gap-4">
            <div className="h-14" />
            <span className="text-sm text-ink-2"><code className="font-mono">bg-planta-grid</code> · fundo de hero e destaques.</span>
          </Card>
        </div>
      </Secao>

      <Secao id="voz" n="11" titulo="Tom de voz" intro="Fala como quem já comprou e explica pro amigo.">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="flex flex-col gap-3">
            <Badge tone="ok">Assim</Badge>
            <ul className="flex flex-col gap-2 text-[15px]">
              <li>“Use o valor do holerite antes dos descontos.”</li>
              <li>“Faltam R$ 5 mil. Guardando R$ 1.700 por mês, são 3 meses.”</li>
              <li>“Não sei” vale como resposta.</li>
              <li>“O banco empresta 80% do que ele avaliar.”</li>
            </ul>
          </Card>
          <Card className="flex flex-col gap-3">
            <Badge tone="bad">Não assim</Badge>
            <ul className="flex flex-col gap-2 text-[15px] text-ink-2">
              <li>“Informe sua renda bruta mensal comprovável.”</li>
              <li>“Seu crédito foi pré-aprovado!” (nunca prometer aprovação)</li>
              <li>“O mutuário deverá apresentar a documentação.”</li>
              <li>“Cota de financiamento sobre o valor de avaliação ou compra e venda.”</li>
            </ul>
          </Card>
        </div>
      </Secao>
    </div>
  );
}
