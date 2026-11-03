"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/components/ui/utils";
import { CATEGORIAS, distancia, type Categoria, type Proximo } from "@/lib/imoveis-de-ouro";

const metros = (m: number) => (m < 1000 ? `${Math.round(m / 10) * 10} m` : `${(m / 1000).toFixed(1).replace(".", ",")} km`);

/**
 * Mapa do imóvel com escolas, saúde e comércio em volta (OpenStreetMap + Leaflet).
 * O Leaflet mexe no DOM e na window, então só carrega no navegador.
 */
export function MapaProximos({ centro, proximos, rotulo }: { centro: { lat: number; lng: number }; proximos: Proximo[]; rotulo: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mapa: import("leaflet").Map | undefined;
    let cancelado = false;
    import("leaflet").then((L) => {
      if (cancelado || !ref.current) return;
      mapa = L.map(ref.current, { scrollWheelZoom: false });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapa);
      const pontos: [number, number][] = [[centro.lat, centro.lng]];
      for (const p of proximos) {
        const c = CATEGORIAS[p.categoria];
        L.circleMarker([p.lat, p.lng], { radius: 7, color: "#fff", weight: 2, fillColor: c.cor, fillOpacity: 1 })
          .bindTooltip(`${p.nome} · ${metros(distancia(centro, p))}`)
          .addTo(mapa);
        // O enquadramento é o bairro (até 1 km); o que está mais longe aparece ao afastar o zoom.
        if (distancia(centro, p) <= 1000) pontos.push([p.lat, p.lng]);
      }
      L.circleMarker([centro.lat, centro.lng], { radius: 11, color: "#1d1d1b", weight: 3, fillColor: "#f5d33d", fillOpacity: 1 })
        .bindTooltip(rotulo, { permanent: true, direction: "top", offset: [0, -10] })
        .addTo(mapa);
      mapa.fitBounds(L.latLngBounds(pontos), { padding: [24, 24] });
    });
    return () => {
      cancelado = true;
      mapa?.remove();
    };
  }, [centro, proximos, rotulo]);

  return <div ref={ref} role="img" aria-label={`Mapa: ${rotulo} e o que há em volta`} className="z-0 aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] border border-line sm:aspect-[16/9]" />;
}

/** A mesma informação do mapa, em lista: o mais perto de cada tipo primeiro. */
export function ListaProximos({ centro, proximos }: { centro: { lat: number; lng: number }; proximos: Proximo[] }) {
  const grupos = (Object.keys(CATEGORIAS) as (keyof typeof CATEGORIAS)[])
    .map((cat) => ({
      cat,
      itens: proximos
        .filter((p) => p.categoria === cat)
        .map((p) => ({ ...p, d: distancia(centro, p) }))
        .sort((a, b) => a.d - b.d),
    }))
    .filter((g) => g.itens.length);

  return (
    <div className="grid gap-6 @xl:grid-cols-2">
      {grupos.map(({ cat, itens }) => (
        <div key={cat} className="flex flex-col gap-2">
          <h3 className="flex items-center gap-2 font-semibold">
            <i aria-hidden className="size-3 rounded-full" style={{ background: CATEGORIAS[cat].cor }} />
            {CATEGORIAS[cat].nome}
          </h3>
          <ul className="flex flex-col divide-y divide-line text-[15px]">
            {itens.map((p) => (
              <li key={p.nome} className="flex justify-between gap-4 py-1.5">
                <span>{p.nome}</span>
                <span className="shrink-0 tabular-nums text-ink-2">{metros(p.d)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Mapa + filtros por tipo + lista: os botões ligam e desligam o que aparece nos dois. */
export function BairroInterativo({ centro, proximos }: { centro: { lat: number; lng: number }; proximos: Proximo[] }) {
  const todas = [...new Set(proximos.map((p) => p.categoria))] as Categoria[];
  const [ligadas, setLigadas] = useState<Categoria[]>(todas);
  const visiveis = proximos.filter((p) => ligadas.includes(p.categoria));
  const alternar = (c: Categoria) => setLigadas((l) => (l.includes(c) ? l.filter((x) => x !== c) : [...l, c]));

  return (
    <div className="flex flex-col gap-5">
      <div role="group" aria-label="Mostrar no mapa" className="flex flex-wrap gap-2">
        {todas.map((c) => {
          const on = ligadas.includes(c);
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => alternar(c)}
              className={cn("inline-flex items-center gap-2 rounded-full border-[1.5px] px-3 py-1.5 text-sm font-semibold transition-colors", on ? "border-ink bg-surface" : "border-line bg-transparent text-muted line-through")}
            >
              <i aria-hidden className="size-3 rounded-full" style={{ background: on ? CATEGORIAS[c].cor : "var(--line)" }} />
              {CATEGORIAS[c].nome}
            </button>
          );
        })}
      </div>
      <MapaProximos centro={centro} proximos={visiveis} rotulo="A casa" />
      <ListaProximos centro={centro} proximos={visiveis} />
    </div>
  );
}
