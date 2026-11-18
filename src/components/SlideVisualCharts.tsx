import React, { useState } from 'react';

export const TrafficEvolutionChart: React.FC = () => {
  const data = [
    { year: '2010', naves: 536, carga: 130574, fraccionada: 130506 },
    { year: '2011', naves: 578, carga: 102867, fraccionada: 102505 },
    { year: '2012', naves: 569, carga: 100649, fraccionada: 100455 },
    { year: '2013', naves: 630, carga: 89347, fraccionada: 88945 },
    { year: '2014', naves: 819, carga: 76933, fraccionada: 76505 },
    { year: '2015', naves: 330, carga: 93563, fraccionada: 93402 },
  ];

  const [metric, setMetric] = useState<'carga' | 'naves'>('carga');

  return (
    <div className="border border-slate-200 rounded-xl bg-slate-50/70 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h4 className="text-xs font-semibold text-slate-900">
            Gráfico Interactivo: Evolución en TPY-ENAPU (2010–2015)
          </h4>
          <p className="text-xs text-slate-500">
            {metric === 'carga'
              ? 'Tráfico de Carga Total en Toneladas Métricas (+21.6% en 2015; 99.8% Fraccionada)'
              : 'Número de Naves Menores (<500 UAB) Atendidas (-59.7% en 2015)'}
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg">
          <button
            type="button"
            onClick={() => setMetric('carga')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              metric === 'carga' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Carga (TM)
          </button>
          <button
            type="button"
            onClick={() => setMetric('naves')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              metric === 'naves' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Naves (Unid.)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 items-end h-36 pt-4 px-2 border-b border-slate-200">
        {data.map((d) => {
          const maxVal = metric === 'carga' ? 140000 : 900;
          const val = metric === 'carga' ? d.carga : d.naves;
          const heightPct = Math.max(12, Math.round((val / maxVal) * 100));
          const is2015 = d.year === '2015';

          return (
            <div key={d.year} className="flex flex-col items-center h-full justify-end group">
              <span className="font-mono-num text-[11px] font-semibold text-slate-700 mb-1">
                {metric === 'carga' ? `${(val / 1000).toFixed(1)}k` : val}
              </span>
              <div
                style={{ height: `${heightPct}%` }}
                className={`w-full max-w-[44px] rounded-t-md transition-all ${
                  is2015
                    ? metric === 'carga'
                      ? 'bg-sky-600'
                      : 'bg-amber-600'
                    : 'bg-slate-400 group-hover:bg-slate-600'
                }`}
              />
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-6 gap-3 pt-1.5 px-2 text-center">
        {data.map((d) => (
          <span key={d.year} className="font-mono-num text-xs font-medium text-slate-600">
            {d.year}
          </span>
        ))}
      </div>
    </div>
  );
};

export const NaturalMonopolyChart: React.FC = () => {
  const [pricingRegime, setPricingRegime] = useState<'cmg' | 'cme' | 'cofinanciado'>('cofinanciado');

  return (
    <div className="border border-slate-200 rounded-xl bg-slate-50/70 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h4 className="text-xs font-semibold text-slate-900">
            Simulador Teórico: Monopolio Natural (Gráficos N° 4 y 5 - Sharkey, 2008)
          </h4>
          <p className="text-xs text-slate-500">
            Selecciona el régimen tarifario para visualizar el equilibrio cantidad-precio y el rol del subsidio
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg">
          <button
            type="button"
            onClick={() => setPricingRegime('cmg')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              pricingRegime === 'cmg' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1° Mejor (P = CMg)
          </button>
          <button
            type="button"
            onClick={() => setPricingRegime('cme')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              pricingRegime === 'cme' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2° Mejor (P = CMe)
          </button>
          <button
            type="button"
            onClick={() => setPricingRegime('cofinanciado')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              pricingRegime === 'cofinanciado'
                ? 'bg-sky-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Caso NTPY-NR (PPO/PAMO + Benchmark)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-7 bg-white border border-slate-200 rounded-lg p-3">
          <svg viewBox="0 0 420 210" className="w-full h-44">
            {/* Axes */}
            <line x1="45" y1="15" x2="45" y2="180" stroke="#334155" strokeWidth="1.5" />
            <line x1="45" y1="180" x2="395" y2="180" stroke="#334155" strokeWidth="1.5" />
            <text x="15" y="25" fontSize="10" fill="#475569" fontWeight="600">
              P, Costo
            </text>
            <text x="380" y="196" fontSize="10" fill="#475569" fontWeight="600">
              Q (Tráfico)
            </text>

            {/* Loss / Subsidy Shaded Area when P=CMg or Cofinanciado */}
            {(pricingRegime === 'cmg' || pricingRegime === 'cofinanciado') && (
              <rect
                x="45"
                y="108"
                width="245"
                height="37"
                fill={pricingRegime === 'cmg' ? '#FECACA' : '#BAE6FD'}
                opacity="0.55"
              />
            )}

            {/* Demand Curve D(Q) */}
            <line x1="65" y1="35" x2="360" y2="168" stroke="#0F172A" strokeWidth="2" />
            <text x="364" y="168" fontSize="10" fill="#0F172A" fontWeight="700">
              D(Q)
            </text>

            {/* Average Cost Curve CMe(Q) decreasing */}
            <path d="M 75 25 Q 130 105 370 132" fill="none" stroke="#0284C7" strokeWidth="2.2" />
            <text x="345" y="124" fontSize="10" fill="#0284C7" fontWeight="700">
              CMe(Q)
            </text>

            {/* Marginal Cost Curve CMg(Q) constant */}
            <line x1="45" y1="145" x2="375" y2="145" stroke="#059669" strokeWidth="2" strokeDasharray="4 2" />
            <text x="345" y="157" fontSize="10" fill="#059669" fontWeight="700">
              CMg(Q)
            </text>

            {/* Equilibrium Q2 (P = CMe) */}
            <line x1="168" y1="82" x2="168" y2="180" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="45" y1="82" x2="168" y2="82" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
            <circle
              cx="168"
              cy="82"
              r={pricingRegime === 'cme' ? '5.5' : '3.5'}
              fill={pricingRegime === 'cme' ? '#D97706' : '#64748B'}
            />
            <text x="160" y="194" fontSize="10" fill="#334155" fontWeight="700">
              Q2
            </text>
            <text x="8" y="85" fontSize="9" fill="#334155" fontWeight="600">
              P=CMe
            </text>

            {/* Equilibrium Q1 (P = CMg) */}
            <line x1="290" y1="108" x2="290" y2="180" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="45" y1="108" x2="290" y2="108" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
            <circle
              cx="290"
              cy="145"
              r={pricingRegime !== 'cme' ? '5.5' : '3.5'}
              fill={pricingRegime !== 'cme' ? '#059669' : '#64748B'}
            />
            <text x="283" y="194" fontSize="10" fill="#059669" fontWeight="700">
              Q1
            </text>
            <text x="8" y="148" fontSize="9" fill="#059669" fontWeight="600">
              P=CMg
            </text>

            {/* Annotation inside shaded rectangle */}
            {(pricingRegime === 'cmg' || pricingRegime === 'cofinanciado') && (
              <text x="105" y="130" fontSize="9.5" fill="#0F172A" fontWeight="700">
                {pricingRegime === 'cmg'
                  ? 'PÉRDIDA = Subsidio Fiscal Requerido'
                  : 'Cubierto por Cofinanciamiento PPO + PAMO'}
              </text>
            )}
          </svg>
        </div>

        <div className="md:col-span-5 space-y-2 text-xs">
          {pricingRegime === 'cmg' && (
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <div className="font-semibold text-emerald-800 mb-1">
                ● Régimen de Primer Mejor (P = CMg → Cantidad Q1)
              </div>
              <p className="text-slate-600 leading-relaxed">
                Maximiza el uso eficiente del terminal portuario (Q1), pero como el Costo Medio está por encima de la
                tarifa en Q1, la concesionaria incurre en pérdidas equivalentes al área sombreada (Hotelling, 1938).
              </p>
            </div>
          )}
          {pricingRegime === 'cme' && (
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <div className="font-semibold text-amber-800 mb-1">
                ▲ Régimen de Segundo Mejor (P = CMe → Cantidad Q2)
              </div>
              <p className="text-slate-600 leading-relaxed">
                La empresa recupera todos sus costos fijos y variables sin subsidio estatal, pero contrae la demanda de
                Q1 a Q2, excluyendo ineficientemente a usuarios fluviales cuya disposición a pagar supera el CMg.
              </p>
            </div>
          )}
          {pricingRegime === 'cofinanciado' && (
            <div className="p-3 bg-white border border-sky-200 rounded-lg">
              <div className="font-semibold text-sky-900 mb-1">
                ★ Solución Aplicada en NTPY-NR (Cofinanciada + Benchmarking)
              </div>
              <p className="text-slate-600 leading-relaxed">
                El Estado peruano asume el déficit de costo fijo mediante el cofinanciamiento contractual (PPO USD
                6.74M + PAMO USD 2.71M/año). Así, OSITRAN fija tarifas competitivas vía Benchmarking (S/ 16.68/TM) que
                fomentan el tráfico formal hacia Q1 sin quebrar al concesionario.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const TukeyOutlierChart: React.FC = () => {
  return (
    <div className="border border-slate-200 rounded-xl bg-slate-50/70 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <h4 className="text-xs font-semibold text-slate-900">
          Distribución Estadística de Permanencia de Naves y Filtro de Tukey (Anexo 4 - 330 Obs.)
        </h4>
        <span className="font-mono-num text-xs text-sky-800 font-semibold">
          Moda Seleccionada = 13 horas · Eslora Promedio = 68 metros
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
        <div className="bg-white border border-slate-200 rounded-lg p-2.5">
          <div className="text-[11px] text-slate-500">Muestra Bruta (2015)</div>
          <div className="font-mono-num text-sm font-bold text-slate-900">330 naves</div>
          <div className="text-[11px] text-slate-500">Media: 60h · Min: 1h · Max: 854h</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-2.5">
          <div className="text-[11px] text-slate-500">Cuartiles (Q1 y Q3)</div>
          <div className="font-mono-num text-sm font-bold text-slate-900">Q1 = 3h · Q3 = 58h</div>
          <div className="text-[11px] text-slate-500">Rango IQR = 58 - 3 = 55 horas</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-2.5">
          <div className="text-[11px] text-slate-500">Límites de Tukey</div>
          <div className="font-mono-num text-sm font-bold text-slate-900">[-79.5h, 140.5h]</div>
          <div className="text-[11px] text-slate-500">Q3 + 1.5×IQR = 140.5h</div>
        </div>
        <div className="bg-white border border-sky-300 rounded-lg p-2.5">
          <div className="text-[11px] text-sky-700 font-medium">Estadía Típica (Moda)</div>
          <div className="font-mono-num text-sm font-bold text-sky-900">13 Horas</div>
          <div className="text-[11px] text-slate-500">Factor op: 1/(68×13) = 1/884</div>
        </div>
        <div className="bg-white border border-emerald-300 rounded-lg p-2.5">
          <div className="text-[11px] text-emerald-700 font-medium">Ref. Estiba Pto. Berrío</div>
          <div className="font-mono-num text-sm font-bold text-emerald-900">+USD 2.11 / TM</div>
          <div className="text-[11px] text-slate-500">Carga fraccionada (+2.37 granel)</div>
        </div>
      </div>
    </div>
  );
};

export const TariffComparisonChart: React.FC = () => {
  const items = [
    { name: 'Carga Fraccionada (TM)', copam: 27.2, ositran: 16.68, diff: '-38.7%' },
    { name: 'Granel Sólido (TM)', copam: 16.9, ositran: 16.59, diff: '-1.8%' },
    { name: 'Contenedor 20’ Lleno', copam: 249.0, ositran: 240.74, diff: '-3.3%' },
    { name: 'Contenedor 20’ Vacío', copam: 249.0, ositran: 92.99, diff: '-62.7%' },
    { name: 'Contenedor 40’ Lleno', copam: 403.2, ositran: 323.26, diff: '-19.8%' },
    { name: 'Contenedor 40’ Vacío', copam: 403.2, ositran: 111.52, diff: '-72.3%' },
  ];

  return (
    <div className="border border-slate-200 rounded-xl bg-slate-50/70 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h4 className="text-xs font-semibold text-slate-900">
          Recorte Regulatorio de Tarifas Máximas: Propuesta COPAM vs. Aprobado OSITRAN (Soles sin IGV)
        </h4>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="inline-block w-3 h-3 rounded-xs bg-slate-400" /> Propuesta COPAM (TC 3.50)
          </span>
          <span className="flex items-center gap-1.5 text-sky-800 font-semibold">
            <span className="inline-block w-3 h-3 rounded-xs bg-sky-600" /> Aprobado OSITRAN (TC 3.328)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {items.map((item) => {
          const pctOsitran = Math.round((item.ositran / item.copam) * 100);
          return (
            <div key={item.name} className="bg-white border border-slate-200 rounded-lg p-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1.5">
                <span className="truncate">{item.name}</span>
                <span className="font-mono-num text-emerald-700">{item.diff}</span>
              </div>
              <div className="space-y-1.5">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-500 mb-0.5">
                    <span>COPAM</span>
                    <span className="font-mono-num">S/ {item.copam.toFixed(2)}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 w-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] text-sky-900 font-medium mb-0.5">
                    <span>OSITRAN</span>
                    <span className="font-mono-num font-bold">S/ {item.ositran.toFixed(2)}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-600" style={{ width: `${pctOsitran}%` }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
