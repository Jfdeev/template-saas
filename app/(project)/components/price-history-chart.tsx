"use client";

import { useMemo, useRef, useState } from "react";

type DataPoint = {
  label: string;
  value: number;
};

type TooltipState = {
  index: number;
  x: number;
  y: number;
} | null;

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function PriceHistoryChart({ data }: { data: DataPoint[] }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  const viewBoxWidth = 640;
  const viewBoxHeight = 260;

  const marginTop = 18;
  const marginRight = 18;
  const marginBottom = 38;
  const marginLeft = 46;
  const plotWidth = viewBoxWidth - marginLeft - marginRight;
  const plotHeight = viewBoxHeight - marginTop - marginBottom;

  const yTicks = [0, 350, 700, 1050, 1400];
  const yMax = 1400;

  const points = useMemo(() => {
    const count = Math.max(data.length, 2);
    return data.map((point, index) => {
      const x = marginLeft + (index / (count - 1)) * plotWidth;
      const y = marginTop + (1 - Math.min(point.value, yMax) / yMax) * plotHeight;
      return { ...point, x, y };
    });
  }, [data, marginLeft, marginTop, plotHeight, plotWidth]);

  const linePath = useMemo(() => {
    if (points.length === 0) return "";
    return points
      .map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
      .join(" ");
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return "";
    const bottomY = marginTop + plotHeight;
    const start = `M${points[0].x.toFixed(2)} ${bottomY.toFixed(2)}`;
    const line = points.map((p) => `L${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
    const end = `L${points[points.length - 1].x.toFixed(2)} ${bottomY.toFixed(2)} Z`;
    return `${start} ${line} ${end}`;
  }, [points, marginTop, plotHeight]);

  function setTooltipByClientX(clientX: number) {
    const svg = svgRef.current;
    if (!svg || points.length === 0) return;

    const rect = svg.getBoundingClientRect();
    const xInSvg = ((clientX - rect.left) / rect.width) * viewBoxWidth;

    let nearestIndex = 0;
    let nearestDistance = Infinity;
    for (let i = 0; i < points.length; i += 1) {
      const distance = Math.abs(points[i].x - xInSvg);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = i;
      }
    }

    const p = points[nearestIndex];
    setTooltip({
      index: nearestIndex,
      x: Math.min(Math.max(p.x, marginLeft), viewBoxWidth - marginRight),
      y: Math.min(Math.max(p.y, marginTop), marginTop + plotHeight),
    });
  }

  return (
    <div className="relative w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="h-56 w-full"
        onMouseMove={(event) => setTooltipByClientX(event.clientX)}
        onMouseEnter={(event) => setTooltipByClientX(event.clientX)}
        onMouseLeave={() => setTooltip(null)}
        role="img"
        aria-label="Histórico de preços"
      >
        <defs>
          <linearGradient id="pricefy-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>

        {yTicks.map((tick) => {
          const y = marginTop + (1 - tick / yMax) * plotHeight;
          return (
            <g key={tick}>
              <line
                x1={marginLeft}
                y1={y}
                x2={marginLeft + plotWidth}
                y2={y}
                stroke="#e5e7eb"
                strokeDasharray="4 4"
              />
              <text x={marginLeft - 10} y={y + 4} fontSize="12" textAnchor="end" fill="#6b7280">
                {tick}
              </text>
            </g>
          );
        })}

        {points.map((p) => (
          <line
            key={`v-${p.label}`}
            x1={p.x}
            y1={marginTop}
            x2={p.x}
            y2={marginTop + plotHeight}
            stroke="#f3f4f6"
          />
        ))}

        <path d={areaPath} fill="url(#pricefy-area)" />
        <path d={linePath} fill="none" stroke="#2563eb" strokeWidth="3" />

        {points.map((p, index) => {
          const isActive = tooltip?.index === index;
          return (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r={isActive ? 6 : 4} fill="#2563eb" />
              {isActive ? <circle cx={p.x} cy={p.y} r={10} fill="#2563eb" opacity="0.08" /> : null}
            </g>
          );
        })}

        {points.map((p) => (
          <text
            key={`m-${p.label}`}
            x={p.x}
            y={marginTop + plotHeight + 26}
            fontSize="12"
            textAnchor="middle"
            fill="#6b7280"
          >
            {p.label}
          </text>
        ))}
      </svg>

      {tooltip ? (
        <div
          className="pointer-events-none absolute select-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-lg"
          style={{
            left: `calc(${(tooltip.x / viewBoxWidth) * 100}% + 8px)`,
            top: `calc(${(tooltip.y / viewBoxHeight) * 100}% - 12px)`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="font-semibold text-gray-900">{data[tooltip.index]?.label}</div>
          <div className="mt-1 text-gray-600">Preço: {formatBRL(data[tooltip.index]?.value ?? 0)}</div>
        </div>
      ) : null}
    </div>
  );
}
