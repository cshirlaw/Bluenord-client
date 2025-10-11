'use client';

import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Area, AreaChart, BarChart, Bar } from 'recharts';
import { brand } from '@/components/charts/theme';

type Series =
  | { type: 'line'; dataKey: string; name?: string; stroke?: string }
  | { type: 'area'; dataKey: string; name?: string; stroke?: string; fill?: string; fillOpacity?: number }
  | { type: 'bar'; dataKey: string; name?: string; fill?: string };

export default function ChartCard({
  title,
  subtitle,
  data,
  xKey = 'x',
  yLabel,
  kind = 'line',
  series,
  height = 280,
}: {
  title: string;
  subtitle?: string;
  data: any[];
  xKey?: string;
  yLabel?: string;
  kind?: 'line' | 'area' | 'bar';
  series: Series[];
  height?: number;
}) {
  const Frame = kind === 'bar' ? BarChart : kind === 'area' ? AreaChart : LineChart;

  return (
    <section className="rounded-2xl border bg-white p-4" style={{ borderColor: '#E5E7EB' }}>
      <div className="mb-3">
        <div className="text-sm font-medium text-slate-900">{title}</div>
        {subtitle ? <div className="text-xs text-slate-500">{subtitle}</div> : null}
      </div>

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <Frame data={data} margin={{ top: 10, right: 16, bottom: 4, left: 0 }}>
            <CartesianGrid stroke={brand.grid} strokeDasharray="3 3" />
            <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: brand.grid }} />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: brand.grid }} label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b', fontSize: 12 } : undefined}/>
            <Tooltip contentStyle={{ fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />

            {series.map((s, i) => {
              if (s.type === 'area') {
                return (
                  <Area
                    key={s.dataKey}
                    type="monotone"
                    dataKey={s.dataKey}
                    name={s.name}
                    stroke={s.stroke ?? brand.deep}
                    fill={s.fill ?? brand.light}
                    fillOpacity={s.fillOpacity ?? 0.25}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 3 }}
                  />
                );
              }
              if (s.type === 'bar') {
                return <Bar key={s.dataKey} dataKey={s.dataKey} name={s.name} fill={(s as any).fill ?? brand.light} radius={[4,4,0,0]} />;
              }
              return (
                <Line
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  name={s.name}
                  stroke={(s as any).stroke ?? brand.deep}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 3 }}
                />
              );
            })}
          </Frame>
        </ResponsiveContainer>
      </div>
    </section>
  );
}