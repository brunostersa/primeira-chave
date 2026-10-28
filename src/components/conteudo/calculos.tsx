import type { ReactNode } from "react";
import { Simulador } from "@/components/simulador/Simulador";
import { PARAMS } from "@/lib/financiamento/params";
import { mipRate, rendaMinimaPara, tabela } from "@/lib/financiamento/engine";
import { brl, pct } from "@/lib/format";
import type { NomeCalculo } from "@/lib/conteudo/tipos";
import { CalculadoraCustos, CalculadoraGanhoCapital, CalculadoraItbi } from "./calculadoras";
import { TABELAS_REGISTRO, type Uf } from "@/lib/financiamento/custos";
import { MapaCapitais, MapaSaoPaulo } from "@/components/mercado/sob-demanda";
import { Termometro } from "@/components/mercado/Termometro";

/** Tabelas e ferramentas que os textos citam por nome. Todo número sai do motor validado. */

function Tabela({ cabecalho, linhas, destaque }: { cabecalho: string[]; linhas: ReactNode[][]; destaque?: number }) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface">
      <table className="w-full min-w-[460px] text-left text-[15px] tabular-nums">
        <thead className="text-sm text-muted">
          <tr>
            {cabecalho.map((c) => (
              <th key={c} className="p-3 font-normal">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((l, i) => (
            <tr key={i} className="border-t border-line">
              {l.map((c, j) => (
                <td key={j} className={j === destaque ? "p-3 font-semibold text-ink" : "p-3 text-ink-2"}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const efetiva = (nominal: number) => (Math.pow(1 + nominal / 100 / 12, 12) - 1) * 100;

function FaixasMcmv() {
  return (
    <Tabela
      cabecalho={["Faixa", "Renda bruta da família", "Imóvel até", "Juros (a.a.)"]}
      destaque={1}
      linhas={PARAMS.faixas.map((f, i) => {
        const anterior = i ? PARAMS.faixas[i - 1].rendaAte : 0;
        return [
          `Faixa ${f.faixa}`,
          anterior ? `${brl(anterior + 0.01).replace(",00", "")} a ${brl(f.rendaAte)}` : `até ${brl(f.rendaAte)}`,
          f.faixa <= 2 ? `${brl(f.tetoImovel)} a R$ 275.000*` : brl(f.tetoImovel),
          `${pct(efetiva(f.juros))} efetivos`,
        ];
      })}
    />
  );
}

function RendaPorValor() {
  const valores = [150_000, 200_000, 250_000, 300_000, 350_000, 400_000, 500_000, 600_000, 800_000, 1_000_000];
  return (
    <Tabela
      cabecalho={["Imóvel de", "Renda mínima (bruta)", "Parcela inicial", "Entrada (20%)", "Linha"]}
      destaque={1}
      linhas={valores.map((v) => {
        const x = rendaMinimaPara(v);
        return x ? [brl(v), brl(x.renda), brl(x.parcela), brl(x.entrada), x.programa.curto] : [brl(v), "—", "—", "—", "—"];
      })}
    />
  );
}

function CustosDaCompra() {
  const valores = [150_000, 250_000, 400_000];
  const p = PARAMS;
  return (
    <Tabela
      cabecalho={["Imóvel de", `ITBI (~${p.itbi}%)`, `Cartório (~${p.cartorio}%)`, `Avaliação e taxas (~${p.avaliacao}%)`, "Total"]}
      destaque={4}
      linhas={valores.map((v) => [
        brl(v),
        brl((v * p.itbi) / 100),
        brl((v * p.cartorio) / 100),
        brl((v * p.avaliacao) / 100),
        brl((v * (p.itbi + p.cartorio + p.avaliacao)) / 100),
      ])}
    />
  );
}

/** A tabela oficial de registro de um estado, das faixas de imóvel residencial (até R$ 1,6 mi). */
function TabelaRegistro({ uf }: { uf: Uf }) {
  const t = TABELAS_REGISTRO[uf];
  const faixas = t.faixas.filter(([ate]) => ate > 100_000 && ate <= 1_600_000);
  const anterior = (i: number) => t.faixas[t.faixas.indexOf(faixas[i]) - 1][0];
  return (
    <div className="flex flex-col gap-2">
      <Tabela
        cabecalho={["Valor do título", "Registro (tabela)", `Com acréscimos (${String(t.acrescimoPct).replace(".", ",")}%)`]}
        destaque={2}
        linhas={faixas.map(([ate, v], i) => [
          `${brl(anterior(i))} a ${brl(ate)}`,
          brl(v),
          brl(v * (1 + t.acrescimoPct / 100)),
        ])}
      />
      <p className="text-sm text-muted">
        Fonte: {t.fonte}. Acréscimos: {t.acrescimoNota}. Prenotação: {brl(t.prenotacao)}.
      </p>
    </div>
  );
}

function SacXPrice() {
  const P = 200_000;
  const V = 250_000;
  const i = PARAMS.faixas[2].juros / 100 / 12;
  const n = 420;
  const mip = mipRate(31);
  const dfi = PARAMS.dfi / 100;
  const price = tabela(P, i, n, V, "price", mip, dfi, PARAMS.taxaAdm);
  const sac = tabela(P, i, n, V, "sac", mip, dfi, PARAMS.taxaAdm);
  return (
    <Tabela
      cabecalho={[`${brl(P)} em 35 anos`, "1ª parcela", "Última parcela", "Total pago"]}
      destaque={1}
      linhas={[
        ["PRICE (parcela fixa)", brl(price.first.pg), brl(price.last), brl(price.total)],
        ["SAC (começa alta e cai)", brl(sac.first.pg), brl(sac.last), brl(sac.total)],
      ]}
    />
  );
}

function Prazos() {
  return (
    <Tabela
      cabecalho={["Etapa", "Prazo típico", "O que acontece"]}
      destaque={1}
      linhas={[
        ["Aprovação de crédito", "5 a 15 dias", "O banco analisa renda, CPF e documentos."],
        ["Avaliação do imóvel", "7 a 15 dias", "Um engenheiro vistoria e emite o laudo."],
        ["Análise jurídica", "15 a 30 dias", "Documentos do imóvel e do vendedor."],
        ["Assinatura do contrato", "1 dia", "Comprador e vendedor assinam no banco."],
        ["Registro no cartório", "até 30 dias", "Depois do registro, o banco paga o vendedor."],
      ]}
    />
  );
}

export function Calculo({ nome }: { nome: NomeCalculo }) {
  switch (nome) {
    case "faixas-mcmv":
      return (
        <div className="flex flex-col gap-2">
          <FaixasMcmv />
          <p className="text-sm text-muted">* Nas faixas 1 e 2, o teto varia de R$ 210 mil a R$ 275 mil conforme o município. Juros sem desconto de cotista do FGTS.</p>
        </div>
      );
    case "renda-por-valor":
      return (
        <div className="flex flex-col gap-2">
          <RendaPorValor />
          <p className="text-sm text-muted">Pessoa de 31 anos, sem outras dívidas, prazo de 35 anos, parcela de até {PARAMS.comp}% da renda. Sem TR.</p>
        </div>
      );
    case "custos-da-compra":
      return <CustosDaCompra />;
    case "sac-x-price":
      return <SacXPrice />;
    case "prazos":
      return <Prazos />;
    case "calculadora-itbi":
      return <CalculadoraItbi aliquotaPadrao={PARAMS.itbi} />;
    case "calculadora-ganho-capital":
      return <CalculadoraGanhoCapital />;
    case "calculadora-custos":
      return <CalculadoraCustos />;
    case "tabela-registro-sp":
      return <TabelaRegistro uf="SP" />;
    case "tabela-registro-go":
      return <TabelaRegistro uf="GO" />;
    case "simulador":
      return (
        <div className="rounded-[var(--radius-card)] border-[1.5px] border-ink bg-surface">
          <Simulador />
        </div>
      );
    case "mapa-capitais":
      return <MapaCapitais />;
    case "mapa-sp":
      return <MapaSaoPaulo />;
    case "termometro":
      return <Termometro />;
  }
}
