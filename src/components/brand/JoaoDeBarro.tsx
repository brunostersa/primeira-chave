import { cn } from "@/components/ui/utils";

/**
 * Poses do João-de-barro. As três primeiras são atalhos do perfil carregando algo.
 * - perfil: de lado, olhando pra direita (padrão)
 * - frente: de frente pra quem lê (conversa, explica, pergunta)
 * - voando: asas abertas, chegando com algo no bico
 * - bicando: inclinado pro chão (procurando, juntando)
 * - comemora: asa erguida (conquista)
 */
export type Pose = "chave" | "barro" | "parado" | "perfil" | "frente" | "voando" | "bicando" | "comemora";
export type Carga = "chave" | "barro" | null;
/** Humor dos olhos. "gentil" é o olhar de assinatura dele. */
export type Humor = "gentil" | "feliz" | "curioso" | "pensativo" | "surpreso" | "triste" | "piscando";

type Tom = "claro" | "escuro";

const cores = (tom: Tom) =>
  tom === "claro"
    ? { traco: "var(--ink)", corpo: "var(--surface)", brilho: "var(--surface)" }
    : { traco: "var(--paper)", corpo: "var(--ink)", brilho: "var(--ink)" };

function normaliza(pose: Pose, carga?: Carga): { pose: Exclude<Pose, "chave" | "barro" | "parado">; carga: Carga } {
  if (pose === "chave") return { pose: "perfil", carga: "chave" };
  if (pose === "barro") return { pose: "perfil", carga: "barro" };
  if (pose === "parado") return { pose: "perfil", carga: carga ?? null };
  if (pose === "comemora") return { pose, carga: carga === undefined ? "chave" : carga };
  return { pose, carga: carga ?? null };
}

/** Corpo de perfil (sem pernas), com bico em (106, 28). */
function CorpoPerfil({ c, sw, asa }: { c: ReturnType<typeof cores>; sw: number; asa: "dobrada" | "erguida" | "aberta" }) {
  return (
    <>
      <path d="M36 55 L11 42 L15 51 L8 55 L33 62 Z" fill={c.corpo} />
      {asa === "aberta" && (
        <path d="M58 40 C50 30 36 22 22 20 C30 28 38 36 48 44 Z" fill={c.corpo} />
      )}
      <path
        d="M30 58 C24 48 34 36 50 34 C57 33 63 31 67 25 C71 17 83 13 89 21 C93 27 91 35 87 40 C85 52 77 62 62 64 C50 66 38 64 30 58 Z"
        fill={c.corpo}
      />
      <path d="M88 22 Q98 24 106 28 Q97 30 88 33" fill={c.corpo} />
      <path d="M86 41 C82 47 76 49 71 47" fill="none" strokeWidth={sw * 0.6} />
      {asa === "dobrada" && (
        <>
          <path d="M43 43 C53 37 66 41 71 52 C61 55 50 52 43 43 Z" fill={c.corpo} />
          <path d="M50 46 L61 48 M54 51 L65 52" fill="none" strokeWidth={sw * 0.6} />
        </>
      )}
      {asa === "erguida" && (
        <>
          <path d="M46 40 C44 26 52 14 64 10 C64 22 60 34 52 44 Z" fill={c.corpo} />
          <path d="M52 30 L60 20 M50 37 L58 30" fill="none" strokeWidth={sw * 0.6} />
        </>
      )}
      {asa === "aberta" && (
        <>
          <path d="M50 42 C46 24 54 8 70 2 C70 18 66 32 58 44 Z" fill={c.corpo} />
          <path d="M56 30 L64 16 M54 38 L62 28" fill="none" strokeWidth={sw * 0.6} />
        </>
      )}
    </>
  );
}

/**
 * Um olho em (x, y). `lado` = 1 quando o bico fica à direita do olho (sobrancelha
 * sobe pro lado de dentro, perto do bico).
 */
function Olho({ x, y, humor, c, sw, lado = 1 }: { x: number; y: number; humor: Humor; c: ReturnType<typeof cores>; sw: number; lado?: 1 | -1 }) {
  const fino = { stroke: c.traco, strokeWidth: sw * 0.6, strokeLinecap: "round" as const, fill: "none" };
  const pupila = (dx: number, dy: number, r: number) => (
    <>
      <circle cx={x + dx} cy={y + dy} r={r} fill={c.traco} />
      <circle cx={x + dx + r * 0.35} cy={y + dy - r * 0.35} r={r * 0.36} fill={c.brilho} />
    </>
  );
  switch (humor) {
    case "feliz":
      return <path d={`M${x - 3.4} ${y + 1.2} Q${x} ${y - 3.6} ${x + 3.4} ${y + 1.2}`} {...fino} strokeWidth={sw * 0.8} />;
    case "piscando":
      return <path d={`M${x - 3.2} ${y} Q${x} ${y + 1.8} ${x + 3.2} ${y}`} {...fino} strokeWidth={sw * 0.8} />;
    case "curioso":
      return (
        <>
          {pupila(0.6 * lado, -0.2, 3.1)}
          <path d={`M${x - 3.2} ${y - 6.2} Q${x} ${y - 8.6} ${x + 3.4} ${y - 6.6}`} {...fino} />
        </>
      );
    case "pensativo":
      return (
        <>
          {pupila(0.9 * lado, -1.3, 2.5)}
          <path d={`M${x - 3.9} ${y - 0.6} A3.9 3.9 0 0 1 ${x + 3.9} ${y - 0.6} Z`} fill={c.corpo} stroke={c.traco} strokeWidth={sw * 0.55} />
        </>
      );
    case "surpreso":
      return (
        <>
          <circle cx={x} cy={y} r={3.9} fill={c.corpo} stroke={c.traco} strokeWidth={sw * 0.55} />
          <circle cx={x} cy={y} r={1.6} fill={c.traco} />
          <path d={`M${x - 3} ${y - 7.4} Q${x} ${y - 9.4} ${x + 3} ${y - 7.4}`} {...fino} />
        </>
      );
    case "triste":
      return (
        <>
          {pupila(0, 0.9, 2.4)}
          <path d={`M${x - 3.6 * lado} ${y - 4} L${x + 3.4 * lado} ${y - 6.6}`} {...fino} />
        </>
      );
    default:
      // "gentil": pupila com brilho e uma pálpebra suave por cima — o olhar dele.
      return (
        <>
          {pupila(0, 0.4, 2.7)}
          <path d={`M${x - 3.7} ${y - 1.4} Q${x} ${y - 4.8} ${x + 3.7} ${y - 1.4}`} {...fino} strokeWidth={sw * 0.5} />
        </>
      );
  }
}

/** Bochecha cor de barro: a marca registrada do rosto dele. */
function Bochecha({ x, y }: { x: number; y: number }) {
  return <ellipse cx={x} cy={y} rx={3.6} ry={2.2} fill="var(--barro)" />;
}

function RostoPerfil({ c, sw, humor }: { c: ReturnType<typeof cores>; sw: number; humor: Humor }) {
  return (
    <>
      <Bochecha x={78} y={31} />
      <Olho x={82} y={24} humor={humor} c={c} sw={sw} />
    </>
  );
}

function CargaPerfil({ carga, c, sw }: { carga: Carga; c: ReturnType<typeof cores>; sw: number }) {
  if (carga === "chave")
    return (
      <g stroke={c.traco} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M108 40 V60 M108 51 H114 M108 57 H113" fill="none" />
        <circle cx="108" cy="34" r="6" fill="var(--mark)" />
      </g>
    );
  if (carga === "barro") return <circle cx="110" cy="28.5" r="5" fill="var(--mark)" stroke={c.traco} strokeWidth={sw * 0.85} />;
  return null;
}

/**
 * O pássaro como <g>, para compor cenas. Quadro de 120×90 com os pés em y≈84.
 * `virado` espelha (olha pra esquerda); `giro` inclina em graus a partir dos pés.
 */
export function Passaro({
  pose = "perfil",
  carga,
  tom = "claro",
  sw = 2.4,
  virado = false,
  giro = 0,
  humor = "gentil",
  transform,
}: {
  pose?: Pose;
  carga?: Carga;
  tom?: Tom;
  sw?: number;
  virado?: boolean;
  giro?: number;
  humor?: Humor;
  transform?: string;
}) {
  const c = cores(tom);
  const n = normaliza(pose, carga);
  const linha = { stroke: c.traco, strokeWidth: sw, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const espelho = virado ? "translate(120 0) scale(-1 1)" : "";
  const inclina = giro ? `rotate(${giro} 62 82)` : "";

  let desenho;
  if (n.pose === "frente") {
    desenho = (
      <>
        <g {...linha}>
          <path d="M52 77 L51 84 M68 77 L69 84 M46 85 H56 M64 85 H74" fill="none" strokeWidth={sw * 0.9} />
          <path d="M44 72 L34 80 M76 72 L86 80" fill="none" strokeWidth={sw * 0.9} />
          <path d="M40 46 C30 54 30 68 40 74 L44 58 Z M80 46 C90 54 90 68 80 74 L76 58 Z" fill={c.corpo} />
          <ellipse cx="60" cy="56" rx="22" ry="24" fill={c.corpo} />
          <path d="M50 44 C54 49 66 49 70 44" fill="none" strokeWidth={sw * 0.6} />
          <circle cx="60" cy="25" r="15" fill={c.corpo} />
          <path d="M55.5 29 L60 38 L64.5 29 Q60 26.5 55.5 29 Z" fill={c.corpo} />
        </g>
        <Bochecha x={48.5} y={30} />
        <Bochecha x={71.5} y={30} />
        <Olho x={54} y={23} humor={humor} c={c} sw={sw} lado={1} />
        <Olho x={66} y={23} humor={humor === "piscando" ? "gentil" : humor} c={c} sw={sw} lado={-1} />
        {n.carga === "chave" && (
          <g {...linha}>
            <path d="M60 49 V66 M60 58 H66 M60 64 H65" fill="none" />
            <circle cx="60" cy="43" r="5.5" fill="var(--mark)" />
          </g>
        )}
        {n.carga === "barro" && <circle cx="60" cy="41" r="4.5" fill="var(--mark)" stroke={c.traco} strokeWidth={sw * 0.85} />}
      </>
    );
  } else if (n.pose === "voando") {
    desenho = (
      <g transform="rotate(-10 60 45)">
        <g {...linha}>
          <path d="M52 62 L44 70 M60 63 L54 72" fill="none" strokeWidth={sw * 0.9} />
          <CorpoPerfil c={c} sw={sw} asa="aberta" />
        </g>
        <RostoPerfil c={c} sw={sw} humor={humor} />
        <CargaPerfil carga={n.carga} c={c} sw={sw} />
      </g>
    );
  } else {
    const corpoGiro = n.pose === "bicando" ? "rotate(30 62 64)" : "";
    desenho = (
      <>
        <g {...linha}>
          <path d="M57 63 L55 80 M67 62 L69 80" fill="none" />
          <path d="M49 81 H58 M55 81 L52 84 M64 81 H74 M69 81 L72 84" fill="none" strokeWidth={sw * 0.85} />
        </g>
        <g transform={corpoGiro}>
          <g {...linha}>
            <CorpoPerfil c={c} sw={sw} asa={n.pose === "comemora" ? "erguida" : "dobrada"} />
          </g>
          <RostoPerfil c={c} sw={sw} humor={humor} />
          <CargaPerfil carga={n.carga} c={c} sw={sw} />
        </g>
        {n.pose === "comemora" && <path d="M100 14 L97 7 M110 13 L112 5 M118 20 L121 16" {...linha} strokeWidth={sw * 0.8} />}
      </>
    );
  }

  return (
    <g transform={transform}>
      <g transform={`${espelho} ${inclina}`.trim() || undefined}>{desenho}</g>
    </g>
  );
}

type Props = {
  pose?: Pose;
  carga?: Carga;
  /** "claro" = traço tinta sobre papel; "escuro" = traço papel sobre tinta. */
  tom?: Tom;
  /** Traço mais grosso para tamanhos pequenos. */
  pequeno?: boolean;
  virado?: boolean;
  giro?: number;
  humor?: Humor;
  className?: string;
  /** Texto alternativo. Sem ele, o desenho é decorativo. */
  titulo?: string;
};

/**
 * O João-de-barro, mascote da Primeira Chave: constrói a própria casa, barro por barro.
 * Regra de cor: traço = ele; amarelo = o dinheiro (barro, chave); azul planta = a casa.
 */
export function JoaoDeBarro({ pose = "chave", carga, tom = "claro", pequeno = false, virado, giro, humor, className, titulo }: Props) {
  return (
    <svg
      viewBox="2 -2 124 92"
      className={cn("h-auto overflow-visible", className)}
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
    >
      <Passaro pose={pose} carga={carga} tom={tom} sw={pequeno ? 3.6 : 2.4} virado={virado} giro={giro} humor={humor} />
    </svg>
  );
}

/** O ninho (a casa de barro), em azul planta. */
export function Ninho({ className, construido = 1 }: { className?: string; construido?: number }) {
  return (
    <svg viewBox="0 0 96 70" className={cn("h-auto", className)} aria-hidden>
      <NinhoForma construido={construido} />
    </svg>
  );
}

/** Ninho como <g> (quadro 96×70). `construido` de 0 a 1 mostra a obra em andamento. */
export function NinhoForma({ construido = 1, transform }: { construido?: number; transform?: string }) {
  const corte = 66 - 58 * construido;
  const id = `ninho-${Math.round(construido * 100)}`;
  return (
    <g transform={transform} stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <clipPath id={id}>
          <rect x="0" y={corte} width="96" height="70" />
        </clipPath>
      </defs>
      {construido < 1 && <path d="M6 66 Q6 8 48 8 Q90 8 90 66" fill="none" strokeDasharray="3 5" stroke="var(--muted)" strokeWidth="1.4" />}
      <g clipPath={`url(#${id})`}>
        <path d="M6 66 Q6 8 48 8 Q90 8 90 66 Z" fill="var(--planta)" />
        <path d="M14 32 Q30 22 50 21 M9 48 Q44 39 88 43 M12 58 Q48 52 89 56" fill="none" strokeWidth="1.5" />
        <path d="M38 66 Q38 42 50 42 Q62 42 62 66 Z" fill="var(--ink)" />
      </g>
    </g>
  );
}
