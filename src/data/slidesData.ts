export interface SlideTableRow {
  cells: string[];
  highlight?: boolean;
}

export interface SlideStat {
  label: string;
  value: string;
  subtext: string;
}

export interface SlideData {
  id: number;
  sectionCode: string;
  sectionTitle: string;
  mgpdCriterion: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  presenterRole: string;
  keyPoints: string[];
  stats?: SlideStat[];
  table?: {
    caption: string;
    headers: string[];
    rows: SlideTableRow[];
  };
  chartType?: 'traffic-evolution' | 'natural-monopoly' | 'tariff-comparison' | 'tukey-outlier';
  economicConcept?: {
    term: string;
    formula?: string;
    explanation: string;
    citation: string;
  };
  speakerNotes: string;
  apaReferences: string[];
}

export const PRESENTATION_METADATA = {
  program: 'Maestría en Gestión Pública Descentralizada (MGPD02)',
  course: 'Regulación y Gestión de los Servicios Públicos',
  institution: 'Escuela de Gestión Pública - Universidad del Pacífico',
  clientRole: 'Equipo Consultor contratado por el Ministerio de Economía y Finanzas (MEF)',
  caseTitle: 'Revisión Crítica: Fijación Tarifaria de los Servicios Estándar en el Nuevo Terminal Portuario de Yurimaguas – Nueva Reforma',
  resolution: 'Resolución de Consejo Directivo N° 043-2016-CD-OSITRAN',
  date: 'Agosto 2016 (Análisis Regulatorio Integral)',
  totalDuration: '30 minutos exposición + 10 minutos ronda de preguntas',
};

export const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    sectionCode: '00. Portada',
    sectionTitle: 'Presentación Ejecutiva (P-TIF)',
    mgpdCriterion: 'Comunicación y Sustentación Oral (3 pts)',
    title: 'Evaluación Económica y Regulatoria: Tarifas Máximas del Terminal Portuario de Yurimaguas – Nueva Reforma',
    subtitle: 'Revisión Crítica de la Resolución de Consejo Directivo N° 043-2016-CD-OSITRAN para el Ministerio de Economía y Finanzas (MEF)',
    durationMinutes: 1.5,
    presenterRole: 'Consultor Líder / Coordinador MEF',
    keyPoints: [
      'Encargo del MEF: Evaluar los efectos económicos, la consistencia metodológica y el impacto sobre eficiencia y bienestar de la primera fijación tarifaria de oficio en el NTPY-NR.',
      'Objeto de análisis: Resolución N° 043-2016-CD-OSITRAN e Informe Conjunto N° 045-16-GRE-GAJ-OSITRAN (10 de agosto de 2016).',
      'Enfoque analítico: Integración de teoría económica de monopolios naturales (Sharkey, 2008; Hotelling, 1938), evidencia empírica fluvial y mejores prácticas de benchmarking regulatorio.',
      'Estructura alineada estrictamente a los 7 bloques exigidos por los Lineamientos MGPD02.',
    ],
    stats: [
      { label: 'Inversión Referencial', value: 'USD 37.06 M', subtext: 'Fase I: USD 25.49M · Fase II: USD 11.57M' },
      { label: 'Plazo de Concesión', value: '30 Años', subtext: 'Modalidad DBFOT Cofinanciada (2011-2041)' },
      { label: 'Tipo de Cambio BCRP', value: 'S/ 3.328 / USD', subtext: 'Promedio móvil 12 meses (Jul 2015 - Jun 2016)' },
      { label: 'Muestra Benchmarking', value: '9 Puertos', subtext: 'Colombia (4), Uruguay (4) y Perú - Iquitos (1)' },
    ],
    speakerNotes:
      'Buenos días profesor y colegas. Como equipo consultor contratado por el Ministerio de Economía y Finanzas (MEF), presentamos nuestra revisión crítica de la Resolución N° 043-2016-CD-OSITRAN, que fijó por primera vez las tarifas máximas de los Servicios Estándar en el Nuevo Terminal Portuario de Yurimaguas – Nueva Reforma (NTPY-NR). En los próximos 30 minutos demostraremos cómo OSITRAN resolvió el dilema de tarificación en un proyecto greenfield cofinanciado sin competencia efectiva, contrastando la propuesta de la concesionaria COPAM frente al diseño técnico del regulador.',
    apaReferences: [
      'Organismo Supervisor de la Inversión en Infraestructura de Transporte de Uso Público [OSITRAN]. (2016). Resolución de Consejo Directivo N° 043-2016-CD-OSITRAN e Informe Conjunto.',
    ],
  },
  {
    id: 2,
    sectionCode: '01. Antecedentes',
    sectionTitle: 'Antecedentes: Perfil de la Industria y Área de Influencia',
    mgpdCriterion: 'Caracterización del Caso y Teoría Económica (5 pts)',
    title: 'Perfil de la Industria Portuaria Fluvial y Área de Influencia del NTPY-NR',
    subtitle: 'Nodo estratégico multimodal que conecta la carretera IIRSA Norte con la Hidrovía Amazónica (Río Huallaga)',
    durationMinutes: 2.0,
    presenterRole: 'Especialista en Economía del Transporte',
    keyPoints: [
      'Área de Influencia Directa: Provincias de Alto Amazonas, Datem del Marañón, Loreto y Maynas (Región Loreto), y provincias de la Región San Martín.',
      'Área de Influencia Indirecta: Regiones de Amazonas, Piura y Lambayeque articuladas a través del eje multimodal IIRSA Norte.',
      'Estructura de Oferta Preexistente en Yurimaguas: Operaban el antiguo TPY-ENAPU (con severas restricciones de espacio de 1.8 Ha y equipamiento obsoleto), un muelle privado exclusivo de Petroperú, y múltiples embarcaderos informales ("La Boca") en las riberas de los ríos Huallaga y Paranapura.',
      'Problema Público y Falla de Mercado: Las operaciones en embarcaderos informales carecían de condiciones mínimas de seguridad, generando altos costos transaccionales, mermas de carga y riesgos para la vida humana.',
    ],
    stats: [
      { label: 'Área NTPY-NR', value: '31.95 Ha', subtext: 'Frente a solo 1.8 Ha del antiguo TPY-ENAPU' },
      { label: 'Muelle NTPY-NR', value: '120 metros', subtext: 'Frente a 66 metros lineales en TPY-ENAPU' },
      { label: 'Principal Destino', value: '70% Iquitos', subtext: 'Abastecimiento de alimentos, cerveza y cemento' },
      { label: 'Operadores Navieros', value: 'Cabotaje Fluvial', subtext: 'Transportes Eduardo (10 motonaves) y Línea Gilmer (4)' },
    ],
    table: {
      caption: 'Comparativa de Infraestructura en la Zona Portuaria de Yurimaguas (2016)',
      headers: ['Terminal / Embarcadero', 'Administración', 'Área / Muelle', 'Condición Operativa y Seguridad'],
      rows: [
        { cells: ['NTPY - Nueva Reforma', 'COPAM (Concesión)', '31.95 Ha / 120 m', 'Infraestructura moderna, grúas 30 Tm, estándar internacional'], highlight: true },
        { cells: ['TPY - ENAPU', 'ENAPU S.A. (Estatal)', '1.80 Ha / 66 m', 'Restricción severa de espacio, grúas de 6 y 12 Tm, baja productividad'] },
        { cells: ['Embarcadero "La Boca"', 'Informal / Ribereño', 'Sin muelle fijo', 'Manipuleo manual al hombro, inseguridad crítica para carga y pasajeros'] },
        { cells: ['Terminal Petroperú', 'Petroperú S.A.', 'Uso Exclusivo', 'Dedicado únicamente a hidrocarburos propios, no atiende a terceros'] },
      ],
    },
    speakerNotes:
      'Para comprender el problema regulatorio, debemos caracterizar la industria portuaria fluvial amazónica. Yurimaguas es el punto de quiebre modal donde la carga que viene en camión desde la costa por IIRSA Norte (Tarapoto, Chiclayo, Piura) se embarca hacia Iquitos por el río Huallaga. Antes del NTPY-NR, la oferta era precaria: el terminal de ENAPU tenía apenas 1.8 hectáreas y 66 metros de muelle, coexistiendo con el embarcadero informal "La Boca", donde estibadores cargaban sacos y cajas de cerveza al hombro sobre tablones inestables.',
    apaReferences: [
      'Agencia de Promoción de la Inversión Privada [PROINVERSIÓN]. (2009). Plan de Promoción de la Inversión Privada: Concesión del Nuevo Terminal Portuario de Yurimaguas – Nueva Reforma.',
      'OSITRAN. (2016). Informe Fijación Tarifaria de los Servicios Estándar en el Terminal Portuario de Yurimaguas – Nueva Reforma (pp. 15-17).',
    ],
  },
  {
    id: 3,
    sectionCode: '01. Antecedentes',
    sectionTitle: 'Antecedentes: Evidencia Empírica de Demanda y Tráfico (2010-2015)',
    mgpdCriterion: 'Caracterización del Caso y Evidencia del Mercado (5 pts)',
    title: 'Dinámica del Mercado a Regular: Tráfico de Naves, Carga y Pasajeros',
    subtitle: 'Predominio absoluto de carga fraccionada (99.8%) en operaciones de cabotaje fluvial (< 500 UAB)',
    durationMinutes: 2.0,
    presenterRole: 'Especialista en Economía del Transporte',
    chartType: 'traffic-evolution',
    keyPoints: [
      'Tráfico de Naves (2015): Se atendieron 330 naves en TPY-ENAPU, registrando una caída abrupta de 59.7% respecto a las 819 naves de 2014 debido a fluctuaciones hidrológicas y desvío hacia embarcaderos informales.',
      'Tipología de Flota: 100% naves menores (< 500 UAB: chatas, barcazas y lanchones) dedicadas exclusivamente a operaciones de cabotaje fluvial.',
      'Tráfico de Carga (2015): Movilización de 93,563 toneladas métricas (+21.6% respecto a las 76,933 TM de 2014). El 60% correspondió a embarque (hacia Iquitos) y 40% a descarga.',
      'Composición de la Carga: 99.8% carga fraccionada o piezas sueltas (93,402 TM: cerveza, arroz, cemento, equipos petroleros). Carga rodante apenas 157 TM (0.17%) y granel líquido 4 TM. Cero contenedores y cero granel sólido.',
      'Tráfico de Pasajeros: ENAPU no cobraba tarifa ni registraba estadísticas formales; el flujo se realizaba sin condiciones de seguridad.',
    ],
    table: {
      caption: 'Evolución Histórica del Tráfico en TPY-ENAPU (2010 - 2015)',
      headers: ['Indicador / Tipo de Carga', '2010', '2011', '2012', '2013', '2014', '2015'],
      rows: [
        { cells: ['Naves Atendidas (Unidades)', '536', '578', '569', '630', '819', '330 (-59.7%)'] },
        { cells: ['Piezas Sueltas / Fraccionada (TM)', '130,506', '102,505', '100,455', '88,945', '76,505', '93,402 (99.8%)'], highlight: true },
        { cells: ['Carga Rodante (TM)', '68', '350', '194', '331', '422', '157 (0.17%)'] },
        { cells: ['Granel Líquido (TM)', '0', '12', '0', '71', '6', '4 (0.004%)'] },
        { cells: ['Carga Total Movilizada (TM)', '130,574', '102,867', '100,649', '89,347', '76,933', '93,563 (+21.6%)'], highlight: true },
      ],
    },
    speakerNotes:
      'Al examinar la evidencia empírica de demanda entre 2010 y 2015, resaltan tres hallazgos fundamentales para la regulación. Primero: en 2015 el tráfico de carga subió 21.6% hasta 93.5 mil toneladas, mientras el número de naves cayó 59.7% (a 330 naves), lo que evidencia consolidación en barcazas de mayor capacidad y fuga hacia muelles informales. Segundo: el 99.8% de la carga es fraccionada (principalmente cerveza Backus, arroz y cemento desde Tarapoto hacia Iquitos). Tercero: el mercado aún no movilizaba contenedores ni granel sólido, lo que hacía imposible usar datos históricos locales para costear todos los servicios del nuevo terminal.',
    apaReferences: [
      'Empresa Nacional de Puertos [ENAPU]. (2016). Reportes estadísticos de tráfico de naves y carga del Terminal Portuario de Yurimaguas 2010-2015.',
      'OSITRAN. (2016). Informe Fijación Tarifaria NTPY-NR, Gráficos N° 1, 2 y 3 (pp. 16-17).',
    ],
  },
  {
    id: 4,
    sectionCode: '02. Marco Institucional',
    sectionTitle: 'Marco Institucional: Normas, Contrato DBFOT y Cofinanciamiento',
    mgpdCriterion: 'Caracterización Institucional y Contractual (5 pts)',
    title: 'Arquitectura Institucional y Contrato de Concesión Cofinanciado',
    subtitle: 'Interacción entre Ley N° 27332, Ley N° 26917, RETA y el Contrato de Concesión (31 de mayo de 2011)',
    durationMinutes: 2.5,
    presenterRole: 'Especialista en Derecho Regulatorio y APP',
    keyPoints: [
      'Marco Legal Rector: Ley N° 27332 (LMOR, Art. 3.1.b facultad fijadora de tarifas) y Ley N° 26917 (Ley de Creación de OSITRAN, Art. 7.1.b: operar el sistema tarifario cuando no exista competencia y velar por cláusulas contractuales).',
      'Supletoriedad del RETA (Res. N° 043-2004-CD-OSITRAN, Art. 12): Las reglas del Reglamento General de Tarifas se aplican de manera supletoria a lo estipulado en el Contrato de Concesión.',
      'Modalidad Contractual DBFOT (30 años): Suscrito el 31/05/2011 entre el MTC (Concedente) y Concesionaria Puerto Amazonas S.A. - COPAM. Concesión cofinanciada mediante Pago por Obra (PPO) y Pago Anual por Mantenimiento y Operación (PAMO).',
      'Gatillo de Fase II (Inversión de USD 11.57M): Se activa cuando la demanda alcance 600,000 TM/año o la tasa de ocupación del muelle llegue al 44%, lo que ocurra primero.',
    ],
    stats: [
      { label: 'Oferta Económica PPO', value: 'USD 6.74 M', subtext: 'Pago por Obra ofertado por COPAM (sin IGV)' },
      { label: 'Oferta Económica PAMO', value: 'USD 2.71 M', subtext: 'Pago Anual Mantenimiento y Operación (sin IGV)' },
      { label: 'Plazo INDECOPI', value: '70 Días', subtext: 'Cláusula 9.1 para pronunciarse sobre competencia' },
      { label: 'Almacenamiento Libre', value: '3 Días', subtext: 'Cláusula 8.14 integrado en Servicio Estándar a la Carga' },
    ],
    table: {
      caption: 'Asignación de Roles Institucionales y Cláusulas Clave del Caso Regulatorio',
      headers: ['Actor Institucional', 'Base Legal / Contractual', 'Rol y Decisión en el Proceso Tarifario NTPY-NR'],
      rows: [
        { cells: ['MTC (Concedente)', 'Contrato Concesión (2011)', 'Suscribe contrato DBFOT, cofinancia vía Fideicomiso (PPO/PAMO) y puede limitar descuentos (Art. 23 RETA).'] },
        { cells: ['INDECOPI (GEE)', 'Cláusula 9.1 / LSNP', 'Emitió Informe N° 069-2015/GEE (04/11/2015): concluyó ausencia de competencia efectiva en nave, carga y pasajeros.'], highlight: true },
        { cells: ['OSITRAN (Regulador)', 'Cláusula 9.2 / RETA / REGO', 'Inicia fijación de oficio (Res. 072-2015), evalúa mediante GRE y GAJ, y Consejo Directivo aprueba tarifas máximas.'], highlight: true },
        { cells: ['COPAM (Concesionario)', 'Cláusulas 8.14, 9.2 y Anexo 5', 'Presta obligatoriamente Servicios Estándar como paquete integrado y cobra tarifas en Soles fijadas por OSITRAN.'] },
        { cells: ['APN y Usuarios Fluviales', 'Ley N° 27943 / Art. 44 RETA', 'Participan en Audiencia Pública (Tarapoto) y formulan observaciones sobre cabotaje y costos logísticos regionales.'] },
      ],
    },
    speakerNotes:
      'En el Marco Institucional, es crucial entender la relación entre ley y contrato. Según el artículo 12 del RETA, el contrato de concesión prima y el RETA actúa supletoriamente. La Cláusula 9.1 estableció una condición suspensiva: OSITRAN no podía fijar tarifas sin que antes INDECOPI analizara las condiciones de competencia. Asimismo, estamos ante una APP cofinanciada donde el Estado retribuye la inversión con el PPO (USD 6.74 millones ofertados) y la operación y mantenimiento con el PAMO (USD 2.71 millones anuales), lo cual altera radicalmente la lógica de recuperación de costos vía tarifas.',
    apaReferences: [
      'Congreso de la República del Perú. (1998). Ley N° 26917, Ley de Supervisión de la Inversión en Infraestructura de Transporte de Uso Público.',
      'Congreso de la República del Perú. (2000). Ley N° 27332, Ley Marco de los Organismos Reguladores de la Inversión Privada en los Servicios Públicos.',
      'Ministerio de Transportes y Comunicaciones [MTC] & COPAM. (2011). Contrato de Concesión del Nuevo Terminal Portuario de Yurimaguas – Nueva Reforma.',
    ],
  },
  {
    id: 5,
    sectionCode: '02. Marco Institucional',
    sectionTitle: 'Marco Institucional: Pronunciamiento de INDECOPI y Paquete Integrado',
    mgpdCriterion: 'Caracterización del Problema Regulatorio (5 pts)',
    title: 'Condiciones de Competencia (INDECOPI) y Alcance del Servicio Estándar',
    subtitle: 'Informe N° 069-2015/GEE-INDECOPI habilita la intervención regulatoria ex ante de OSITRAN',
    durationMinutes: 2.0,
    presenterRole: 'Especialista en Derecho Regulatorio y APP',
    keyPoints: [
      'Pronunciamiento Vinculante de INDECOPI (Carta N° 644-2015/PRE-INDECOPI del 04/11/2015): La Gerencia de Estudios Económicos determinó que el NTPY-NR NO enfrentará condiciones de competencia efectiva en ninguno de los tres mercados relevantes (nave, carga ni pasajeros).',
      '¿Por qué no hay competencia efectiva?: TPY-ENAPU presenta severas restricciones físicas e inferioridad tecnológica; el terminal de Petroperú es de uso propio; y los embarcaderos informales ("La Boca") no constituyen sustitutos formales ni seguros.',
      'Empaquetamiento Obligatorio (Cláusula 8.14): A diferencia de puertos multioperador donde se cobra por separado, el Servicio Estándar en NTPY-NR es un servicio integrado de prestación obligatoria y tarifa única.',
      'Prohibición de Ventas Atadas: COPAM no puede condicionar la prestación del Servicio Estándar a la aceptación de ningún otro servicio especial o pago adicional.',
    ],
    table: {
      caption: 'Alcance Contractual Integrado de los Servicios Estándar (Cláusula 8.14 y Anexo 5)',
      headers: ['Categoría de Servicio', 'Operaciones Comprendidas en la Tarifa Única Integrada', 'Regla de Exigibilidad'],
      rows: [
        { cells: ['A. Servicios a la Nave', 'Utilización de amarraderos (espacio físico en muelle para atraque) + Servicio completo de amarre y desamarre (recibir, asegurar, cambiar y largar amarras).', 'Cobro integrado por metro de eslora-hora'], highlight: true },
        { cells: ['B. Servicios a la Carga (8 subcategorías)', 'Estiba/desestiba, trinca/destrinca, tracción, manipulación, elaboración de tarja, almacenamiento portuario por tres (3) días libres, pesaje y servicios esenciales aduaneros.', 'Desde ingreso de carga hasta desamarre (embarque) o desde amarre hasta retiro (descarga)'], highlight: true },
        { cells: ['C. Servicios a Pasajeros', 'Facilidades e infraestructura segura en el terminal para el embarque y desembarque fluvial de pasajeros.', 'Cobro único por pasajero embarcado o desembarcado'] },
      ],
    },
    speakerNotes:
      'El 4 de noviembre de 2015, INDECOPI notificó el Informe N° 069-2015/GEE concluyendo que el NTPY-NR actuará como un monopolio natural sin presión competitiva efectiva en nave, carga ni pasajeros. Esto activó la Cláusula 9.2 del Contrato y el artículo 11 del RETA. Un elemento institucional clave es la Cláusula 8.14: el Servicio Estándar es un paquete "todo incluido" desde que la carga entra al puerto hasta que el barco zarpa, incluyendo estiba, tarja, pesaje y 3 días de almacenamiento libre. Esta característica será determinante al comparar tarifas internacionales.',
    apaReferences: [
      'Instituto Nacional de Defensa de la Competencia y de la Protección de la Propiedad Intelectual [INDECOPI]. (2015). Informe N° 069-2015/GEE: Análisis de condiciones de competencia en los servicios portuarios fluviales en Yurimaguas.',
      'OSITRAN. (2016). Informe Fijación Tarifaria NTPY-NR, Capítulo V y VI (pp. 19-21).',
    ],
  },
  {
    id: 6,
    sectionCode: '03. Marco Regulatorio',
    sectionTitle: 'Marco Regulatorio: Dilema Teórico del Monopolio Natural y Tarifa Óptima',
    mgpdCriterion: 'Aplicación de Teoría Económica y Tarifa Óptima (5 pts)',
    title: 'Teoría Económica Subyacente: Monopolio Natural y Justificación del Benchmarking',
    subtitle: 'Disyuntiva entre Eficiencia Asignativa (P = CMg) y Sostenibilidad Financiera (P = CMe) en proyectos Greenfield Cofinanciados',
    durationMinutes: 3.0,
    presenterRole: 'Economista Jefe / Especialista en Regulación',
    chartType: 'natural-monopoly',
    economicConcept: {
      term: 'Subaditividad de Costos y Equilibrio de Primer Mejor (Hotelling, 1938; Sharkey, 2008)',
      formula: 'C(Q) = CF + CMg · Q  ⇒  CMe(Q) = CF/Q + CMg > CMg',
      explanation:
        'En infraestructuras portuarias con altos costos fijos hundidos (CF) y costo marginal constante (CMg), el costo medio (CMe) es estrictamente decreciente. Tarifar a Primer Mejor (P = CMg, cantidad Q1) maximiza el bienestar social pero genera déficit financiero (CMe - CMg)·Q1 que requiere subsidio público. Tarifar a Segundo Mejor (P = CMe, cantidad Q2) elimina el subsidio pero expulsa usuarios dispuestos a pagar más que el CMg (pérdida de peso muerto).',
      citation: 'Sharkey, W. W. (2008). The theory of natural monopoly. Cambridge University Press; Hotelling, H. (1938). The general welfare in relation to problems of taxation and of railway and utility rates.',
    },
    keyPoints: [
      '¿Cómo resuelve el caso NTPY-NR el dilema de Hotelling?: Al ser una concesión cofinanciada donde el Estado ya cubre la inversión (PPO) y operación/mantenimiento (PAMO) con impuestos generales, la tarifa no necesita fijarse al Costo Medio total para remunerar el capital.',
      'Descarte de Metodologías Basadas en Costos (Art. 19 RETA): Costos Incrementales, Costo Marginal de LP, Costos Totalmente Distribuidos, Empresa Modelo Eficiente y Flujo de Caja Descontado fueron descartados por OSITRAN.',
      'Tres razones técnicas del descarte (Párr. 74-75): (1) Proyecto greenfield sin historial de costos operativos ni demanda real en la nueva infraestructura; (2) Sostenibilidad del inversionista ya garantizada contractualmente por el cofinanciamiento (PPO + PAMO); (3) La Disposición a Pagar mencionada en el Anexo 5 es meramente referencial.',
      'Elección del Benchmarking (Tarifación Comparativa - Anexo I RETA): Permite aproximar una tarifa eficiente que refleje estándares logísticos internacionales a menor costo administrativo y mayor rapidez regulatoria.',
    ],
    speakerNotes:
      'Entramos al corazón teórico del informe (Sección VII.1). Los terminales portuarios presentan economías de escala y subaditividad de costos: altos costos fijos de muelle y dragado frente a costos marginales bajos y constantes. Como plantearon Hotelling (1938) y Sharkey (2008), tarifar a costo marginal (Q1) logra eficiencia asignativa pero genera pérdidas que exigen subsidio; tarifar a costo medio (Q2) cubre costos pero restringe ineficientemente el uso del puerto. En Yurimaguas, el diseño APP cofinanciado materializa la solución de Hotelling: el Estado subsidia la infraestructura vía PPO y PAMO, liberando a OSITRAN de usar flujo de caja descontado y permitiendo aplicar Benchmarking internacional.',
    apaReferences: [
      'Hotelling, H. (1938). The general welfare in relation to problems of taxation and of railway and utility rates. Econometrica, 6(3), 242-269.',
      'Sharkey, W. W. (2008). The theory of natural monopoly. Cambridge University Press.',
      'OSITRAN. (2016). Informe Fijación Tarifaria NTPY-NR, Capítulo VII (pp. 21-24).',
    ],
  },
  {
    id: 7,
    sectionCode: '03. Marco Regulatorio',
    sectionTitle: 'Marco Regulatorio: Criterios de Comparabilidad y Depuración de Muestra',
    mgpdCriterion: 'Análisis Crítico de la Metodología Aplicada (7 pts)',
    title: 'Diseño del Benchmarking: Condición Necesaria, Condición Suficiente y Depuración',
    subtitle: 'Evaluación crítica de la muestra propuesta por COPAM (11 puertos) frente a la muestra depurada por OSITRAN (9 puertos)',
    durationMinutes: 2.5,
    presenterRole: 'Economista Jefe / Especialista en Regulación',
    keyPoints: [
      'Regla Metodológica Dual de OSITRAN (Párr. 76 y 106): Para que un puerto sea comparable al NTPY-NR debe superar simultáneamente dos filtros estrictos:',
      '1. Condición Necesaria (Operativa): Que el terminal realice operaciones fluviales, aunque sean combinadas con operaciones marítimas.',
      '2. Condición Suficiente (Infraestructura y Equipamiento): Que presente escala física, longitud de muelle y equipamiento multipropósito similares a los definidos en el Contrato de Concesión del NTPY-NR (31.95 Ha, muelle 120m, 2 grúas de 30 Tm).',
      'Exclusión del TP Paita (Perú): Desestimado por violar la Condición Necesaria. Es un puerto netamente marítimo, aun cuando pertenezca al corredor multimodal IIRSA Norte.',
      'Exclusión del Puerto de Zárate (Argentina): Desestimado por violar la Condición Suficiente. Posee 218 Ha (7 veces el NTPY-NR), 385m de muelle, grúa pórtico Panamax, 2 grúas Post-Panamax y 3 RTG en terminales especializados.',
      'Exclusión de TPY-ENAPU (solicitado por navieras): Desestimado por infraestructura claramente inferior (1.8 Ha, grúas de 6 y 12 Tm).',
    ],
    table: {
      caption: 'Evaluación de Comparabilidad yContraste de Infraestructura: NTPY-NR vs. Puertos Excluidos',
      headers: ['Criterio Técnico', 'NTPY-NR (Yurimaguas)', 'TP Zárate (Argentina)', 'TP Paita (Perú)', 'TPY-ENAPU (Antiguo)'],
      rows: [
        { cells: ['Tipo de Operación (Cond. Necesaria)', 'Fluvial (Río Huallaga)', 'Fluvial (Río Paraná)', 'Marítimo (Excluido)', 'Fluvial (Río Huallaga)'] },
        { cells: ['Área Total del Puerto (Ha)', '31.95 Ha', '218.00 Ha (6.8x mayor)', 'No comparable', '1.80 Ha (17.7x menor)'] },
        { cells: ['Longitud de Muelle (metros)', '120 m', '385 m (frente río 1,000 m)', 'Muelle espigón/contenedores', '66 m'] },
        { cells: ['Equipamiento de Grúas', '1 móvil 30 Tm + 1 autoprop. 30 Tm', '1 Pórtico Panamax + 2 Liebherr Post-Panamax', 'Grúas pórtico marítimas', '1 grúa 12 Tm + 1 grúa 6 Tm'] },
        { cells: ['Decisión Regulatoria OSITRAN', 'Terminal Objetivo', 'Excluido (Sobre-escala)', 'Excluido (No Fluvial)', 'Excluido (Infra-escala)'], highlight: true },
      ],
    },
    speakerNotes:
      'Aquí observamos el rigor técnico en la depuración de la muestra. COPAM propuso 11 puertos siguiendo los pasos de O’Rourke y Rogerson (2014), pero introdujo dos sesgos hacia arriba: incluyó a Paita y a Zárate. OSITRAN aplicó una regla de decisión de dos etapas: Condición Necesaria (ser fluvial) que eliminó a Paita, y Condición Suficiente (escala y equipamiento similar) que eliminó a Zárate, un megapuerto argentino de 218 hectáreas con grúas pórtico Panamax y terminales especializados Ro-Ro. Asimismo, en la Matriz de Comentarios, OSITRAN rechazó incluir al viejo TPY-ENAPU pedido por las navieras locales, pues su rezago técnico distorsionaría el estándar de calidad exigido al nuevo terminal.',
    apaReferences: [
      'O’Rourke, K., & Rogerson, W. (2014). Benchmarking methodologies in utility regulation.',
      'OSITRAN. (2016). Informe Fijación Tarifaria NTPY-NR, Cuadros N° 11, 12, 13 y 14 (pp. 32-34) y Matriz de Comentarios (pp. 102-106).',
    ],
  },
  {
    id: 8,
    sectionCode: '04. Esquema Tarifario',
    sectionTitle: 'Esquema Tarifario: Procedimiento RETA y Observaciones a COPAM',
    mgpdCriterion: 'Esquema Tarifario y Procedimientos Regulatorios (5 pts)',
    title: 'Procedimiento Regulatorio y Cinco Observaciones Críticas a la Propuesta de COPAM',
    subtitle: 'Contraste entre la propuesta del Concesionario (18/02/2016) y los tres pilares del Art. 3 del RETA',
    durationMinutes: 2.5,
    presenterRole: 'Especialista en Regulación Tarifaria',
    keyPoints: [
      'Fallo en Estructura Tarifaria (Obs. 1): COPAM propuso segmentar naves entre "Tránsito Internacional" (S/ 0.90) y "Cabotaje/Barcazas" (S/ 0.20), cobrando igual a contenedores llenos y vacíos, y subdividiendo carga rodante en 3 categorías hasta 30 TM. OSITRAN rechazó esto por violar el Anexo 5 del Contrato.',
      'Fallo en Unidad de Cobro (Obs. 2): COPAM propuso cobrar Carga Rodante "por unidad/vehículo" (S/ 147.0 a S/ 150.6). OSITRAN impuso el cobro "por tonelada", estándar en todo el sistema portuario peruano.',
      'Fallo en Muestra Comparable (Obs. 3): Inclusión improcedente de TP Paita (marítimo) y TP Zárate (escala 7x superior).',
      'Fallo en Homogenización de Paquete (Obs. 4): En TP Iquitos (nave), COPAM solo tomó el uso de amarradero (USD 0.20) omitiendo la tarifa de amarre y desamarre (USD 50/operación). En carga, sumó arbitrariamente USD 2.00/TM por estiba sin sustento empírico verificable.',
      'Fallo en Tipo de Cambio (Obs. 5): COPAM aplicó S/ 3.50/USD sin fuente ni metodología. OSITRAN aplicó S/ 3.328/USD (promedio oficial BCRP últimos 12 meses: jul 2015 - jun 2016).',
      'Cuestión Previa (Servicios Especiales): Propuesta presentada tardíamente por COPAM (19/05/2016) fue observada (Oficio 080-16) y devuelta (Oficio 086-16 del 04/07/2016) por falta de precisión técnica.',
    ],
    table: {
      caption: 'Cronología Oficial del Procedimiento de Fijación Tarifaria de Oficio (RETA)',
      headers: ['Fecha / Hito', 'Documento / Acto Administrativo', 'Contenido y Efecto Regulatorio'],
      rows: [
        { cells: ['15 Dic 2015', 'Resolución N° 072-2015-CD-OSITRAN', 'Inicio de oficio del procedimiento tarifario; otorga 30 días hábiles (+10 prórroga) a COPAM.'] },
        { cells: ['18 Feb 2016', 'Carta N° 0079-2016-GG-COPAM', 'COPAM presenta su Propuesta Tarifaria de Servicios Estándar basada en benchmarking.'] },
        { cells: ['02 Jun 2016', 'Resolución N° 032-2016-CD-OSITRAN', 'Aprueba publicación de la Propuesta Tarifaria de OSITRAN (El Peruano 13/06) y convoca audiencia.'] },
        { cells: ['08 Jul 2016', 'Audiencia Pública Descentralizada', 'Realizada en Tarapoto (Hotel Tucán Suites); participan APN, COPAM y 5 empresas navieras fluviales.'] },
        { cells: ['10 Ago 2016', 'Resolución N° 043-2016-CD-OSITRAN', 'Aprueba tarifas máximas definitivas con base en el Informe N° 045-16-GRE-GAJ-OSITRAN.'], highlight: true },
      ],
    },
    speakerNotes:
      'El procedimiento regulatorio cumplió rigurosamente las 7 etapas del artículo 31 del Informe (RETA), incluyendo una cuestión previa: OSITRAN devolvió la solicitud de Servicios Especiales que COPAM presentó con 3 meses de retraso e información incompleta, evitando paralizar los Servicios Estándar. Al auditar la propuesta de COPAM, OSITRAN detectó 5 errores estructurales: alterar la estructura del Anexo 5 (que exige diferenciar contenedor lleno de vacío porque el lleno desgasta más los equipos y lo demanda el dueño de la carga, mientras el vacío lo demanda la naviera), cobrar carga rodante por unidad en vez de tonelada, incluir Paita y Zárate, omitir servicios al homogenizar y usar un tipo de cambio discrecional de S/ 3.50.',
    apaReferences: [
      'OSITRAN. (2004). Reglamento General de Tarifas de OSITRAN (RETA), Resolución N° 043-2004-CD-OSITRAN y modificatorias.',
      'OSITRAN. (2016). Informe Fijación Tarifaria NTPY-NR, Sección Cuestión Previa (pp. 9-10) y Capítulo VIII-IX (pp. 24-31).',
    ],
  },
  {
    id: 9,
    sectionCode: '04. Esquema Tarifario',
    sectionTitle: 'Esquema Tarifario: Homogenización Estadística y Test de Tukey',
    mgpdCriterion: 'Rigor Metodológico y Evidencia Empírica (7 pts)',
    title: 'Ingeniería de Homogenización: Factores de Conversión y Test de Tukey',
    subtitle: 'Estandarización de puertos multioperador hacia el paquete integrado del NTPY-NR',
    durationMinutes: 2.5,
    presenterRole: 'Especialista en Regulación Tarifaria',
    chartType: 'tukey-outlier',
    economicConcept: {
      term: 'Detección de Valores Atípicos mediante Rango Intercuartílico (Test de Tukey - Anexo 4)',
      formula: 'IQR = Q3 (58h) - Q1 (3h) = 55h  ⇒  Lim_sup = Q3 + 1.5(IQR) = 140.5h  ⇒  Moda = 13 horas',
      explanation:
        'Sobre 330 observaciones de permanencia de naves en TPY-ENAPU (2015), la media era 60h con desviación estándar de 117h y máximo de 854h (distribución altamente asimétrica). Aplicando el filtro de Tukey [-79.5h, 140.5h] para eliminar outliers y tomando la moda de la distribución depurada, OSITRAN obtuvo 13 horas como estadía típica de operación.',
      citation: 'Barbato, G., Barini, E. M., Genta, G., & Levi, R. (2011). Features and performance of some outlier detection methods. Journal of Applied Statistics, 38(10), 2133-2149.',
    },
    keyPoints: [
      'Homogenización de Unidades a "Metro de Eslora-Hora" (Nave): Nave promedio NTPY-NR = 68 metros de eslora (promedio de Barcaza 50m, Convoy 1x2 100m, Convoy 2x2 100m y Remolcador 20m) y estadía modal = 13 horas (o 24h para tarifas diarias).',
      'Ratios de Conversión Aplicados: De USD/unidad-día a m-eslora-hora: [1/(68×24)]; de USD/remolcador a m-eslora-hora: [1/(20×13)]; de USD/operación a m-eslora-hora: [1/(68×13)].',
      'Imputación de Amarre y Desamarre (USD 0.11 / m-eslora-hora): Como los puertos de Colombia y Uruguay no publican tarifas de amarre (prestado por terceros), OSITRAN imputó el valor estandarizado del TP Iquitos (USD 100 / [68×13] = USD 0.11).',
      'Homogenización de Servicios a la Carga: En Colombia y Uruguay las tarifas solo cubren uso de infraestructura. OSITRAN sumó los costos de operación de cargue/descargue de Puerto Berrío (USD 2.11/TM en fraccionada; USD 2.37/TM en granel sólido; USD 23.67 en TEU lleno) por tener escala y grúa de 35 Tm equivalentes al NTPY-NR.',
      'Conversión de Carga Rodante y Moneda: Vehículos convertidos usando peso promedio de 1.5 TM/unidad. Tarifas de Puerto Berrío en Pesos Colombianos convertidas a USD con TC promedio 2015 Banco de la República (2,746.47 COP/USD).',
    ],
    speakerNotes:
      '¿Cómo comparar puertos multioperador de Colombia y Uruguay —que cobran solo el uso del muelle sin estiba ni amarre— contra el paquete integrado del NTPY-NR? OSITRAN realizó una ingeniería de homogenización notable. Primero, aplicó el Test de Tukey (Barbato et al., 2011) a las 330 recaladas de 2015 para limpiar valores extremos de hasta 854 horas, hallando una moda estadística de 13 horas de estadía y 68 metros de eslora promedio. Segundo, en lugar de sumar los USD 2.00 arbitrarios de COPAM, utilizó las tarifas reales de operación de cargue/descargue de Puerto Berrío (Colombia), único terminal de la muestra con desagregación completa y grúa de 35 toneladas comparable al NTPY-NR, además de usar ponderadores reales de cabotaje (86% en fraccionada, 99% en rodante) del Anexo 6 de Iquitos.',
    apaReferences: [
      'Barbato, G., Barini, E. M., Genta, G., & Levi, R. (2011). Features and performance of some outlier detection methods. Journal of Applied Statistics, 38(10), 2133-2149.',
      'OSITRAN. (2016). Informe Fijación Tarifaria NTPY-NR, Sección IX.3.b (pp. 35-46) y Anexos 4 y 6 (pp. 67, 88).',
    ],
  },
  {
    id: 10,
    sectionCode: '05. Resultados',
    sectionTitle: 'Resultados en el Mercado Regulado: Tarifas Máximas Aprobadas',
    mgpdCriterion: 'Análisis Crítico de la Decisión y sus Efectos (7 pts)',
    title: 'Resultados Regulatorios: Tarifas Máximas Aprobadas vs. Propuesta COPAM',
    subtitle: 'Resolución N° 043-2016-CD-OSITRAN: Reducción de 38.7% en Carga Fraccionada para proteger la competitividad regional',
    durationMinutes: 3.0,
    presenterRole: 'Consultor Senior en Análisis de Impacto Regulatorio',
    chartType: 'tariff-comparison',
    keyPoints: [
      'Impacto en el Mercado Principal (Carga Fraccionada = 99.8% del tráfico): OSITRAN fijó la tarifa máxima en S/ 16.68 por tonelada (USD 5.01), logrando una reducción de 38.7% respecto a los S/ 27.20 (USD 7.80) solicitados por COPAM.',
      'Diferenciación Eficiente en Contenedores: Se corrigió la tarifa plana de COPAM. El contenedor vacío de 20 pies se fijó en S/ 92.99 (-62.7% frente a S/ 249.00 de COPAM) y el vacío de 40 pies en S/ 111.52 (-72.3% frente a S/ 403.20), reflejando menor desgaste de equipos y distinta elasticidad-precio.',
      'Corrección en Carga Rodante: Cambio de unidad de cobro a S/ 75.27 por tonelada (USD 22.62/TM), eliminando la distorsión por vehículo hasta 30 TM que proponía COPAM.',
      'Servicio a la Nave y Pasajeros: Tarifa única a la nave de S/ 0.73 por metro de eslora-hora (USD 0.22) y tarifa a pasajeros de S/ 10.55 (USD 3.17, promedio de Colonia USD 2.11 y Montevideo USD 4.23).',
    ],
    table: {
      caption: 'Cuadro Comparativo Integral: Propuesta COPAM vs. Tarifas Máximas OSITRAN (En Soles sin IGV)',
      headers: ['Estructura Tarifaria (Anexo 5)', 'Unidad de Cobro', 'Propuesta COPAM (TC 3.50)', 'Benchmark OSITRAN (USD)', 'Tarifa Máxima OSITRAN (TC 3.328)', 'Variación / Efecto'],
      rows: [
        { cells: ['Servicio Estándar a la Nave', 'Metro eslora-hora', 'S/ 0.90 (Int.) / S/ 0.20 (Cab.)', 'USD 0.22', 'S/ 0.73', 'Tarifa única contractual'], highlight: true },
        { cells: ['Carga Fraccionada (99.8% tráfico)', 'Por tonelada', 'S/ 27.20 (USD 7.80)', 'USD 5.01', 'S/ 16.68', '-38.7% (Ahorro clave)'], highlight: true },
        { cells: ['Carga Rodante', 'Por tonelada', 'S/ 147.0 a 150.6 / unidad', 'USD 22.62', 'S/ 75.27', 'Estandarizado a TM'] },
        { cells: ['Carga Sólida a Granel', 'Por tonelada', 'S/ 16.90 (USD 4.80)', 'USD 4.98', 'S/ 16.59', '-1.8%'] },
        { cells: ['Carga Líquida a Granel', 'Por tonelada', 'S/ 8.70 (USD 2.50)', 'USD 2.77', 'S/ 9.21', '+5.9%'] },
        { cells: ['Contenedor con carga 20 pies', 'Por contenedor', 'S/ 249.00 (USD 71.10)', 'USD 72.34', 'S/ 240.74', '-3.3%'] },
        { cells: ['Contenedor vacío 20 pies', 'Por contenedor', 'S/ 249.00 (Sin diferenciar)', 'USD 27.94', 'S/ 92.99', '-62.7% (Desincentiva sobrecosto)'], highlight: true },
        { cells: ['Contenedor con carga 40 pies', 'Por contenedor', 'S/ 403.20 (USD 115.20)', 'USD 97.13', 'S/ 323.26', '-19.8%'] },
        { cells: ['Contenedor vacío 40 pies', 'Por contenedor', 'S/ 403.20 (Sin diferenciar)', 'USD 33.51', 'S/ 111.52', '-72.3% (Eficiencia logística)'], highlight: true },
        { cells: ['Servicio a los Pasajeros', 'Por pasajero', 'S/ 11.10 (USD 3.20)', 'USD 3.17', 'S/ 10.55', '-5.0%'] },
      ],
    },
    speakerNotes:
      'En esta tabla comparativa vemos el resultado concreto de la intervención de OSITRAN en el mercado regulado. El hallazgo económico más potente es la reducción del 38.7% en la tarifa de Carga Fraccionada: de S/ 27.20 pedidos por COPAM a S/ 16.68 por tonelada aprobados por OSITRAN. Dado que la carga fraccionada representa el 99.8% del movimiento portuario (93,402 toneladas en 2015), esta decisión evitó un shock inflacionario directo sobre los bienes de consumo básico que abastecen a Iquitos. Asimismo, la reducción de más del 62% y 72% en contenedores vacíos de 20 y 40 pies facilita el retorno logístico de envases y contenedores en la ruta fluvial.',
    apaReferences: [
      'OSITRAN. (2016). Resolución de Consejo Directivo N° 043-2016-CD-OSITRAN, Artículo 1° (p. 4 de la Resolución) y Cuadro N° 26 del Informe (p. 47).',
    ],
  },
  {
    id: 11,
    sectionCode: '06. Teoría Económica y Crítica',
    sectionTitle: 'Elementos de Teoría Económica Aplicados y Análisis Crítico de Efectos',
    mgpdCriterion: 'Análisis Crítico: Evidencia vs. Inferencias y Limitaciones (7 pts)',
    title: 'Evaluación Crítica: Teoría Económica, Efectos No Previstos y Limitaciones',
    subtitle: 'Distinción rigurosa entre resultados documentados en el expediente, inferencias económicas y restricciones de la evidencia',
    durationMinutes: 3.5,
    presenterRole: 'Consultor Senior en Análisis de Impacto Regulatorio',
    economicConcept: {
      term: 'Regulación por Tope de Precios (Price Cap), Competencia por Comparación (Yardstick) y Discriminación de Segundo/Tercer Grado',
      formula: 'P_efectivo ≤ P_máximo (S/ 16.68/TM)  |  Cláusula 9.8 + Art. 23 RETA (Descuentos Comerciales)',
      explanation:
        'Las tarifas fijadas por OSITRAN son Tarifas Máximas (Tope). Cuando existen asimetrías de información sobre costos (proyecto greenfield) y presiones de sustitutos informales con costo monetario cercano a cero ("La Boca"), la tarifa tope otorga flexibilidad hacia abajo para que el concesionario aplique descuentos comerciales (discriminación de precios por volumen o ruta de cabotaje) sin exceder el techo regulado.',
      citation: 'Shleifer, A. (1985). A theory of yardstick competition. The RAND Journal of Economics, 16(3), 319-327.',
    },
    keyPoints: [
      'Resultados Documentados (Evidencia Empírica Directa): (1) Ahorro tarifario de S/ 10.52/TM en carga fraccionada respecto a la pretensión de COPAM; (2) Preocupación formal de 5 navieras fluviales (Matriz de Comentarios, p. 107) advirtiendo que el 70% de la carga son alimentos para Iquitos; (3) Concentración de clientes principales en Tarapoto (Backus: 19,278 TM botellas llenas + 6,489 TM vacías; arroz: 13,845 TM; cemento: 7,702 TM = 90% del embarque).',
      'Inferencias Económicas y Efectos No Previstos: (1) Riesgo de persistencia de la informalidad ("La Boca" y "El Vado"): aunque S/ 16.68/TM es eficiente a nivel internacional, representa un salto frente a la tarifa histórica de TPY-ENAPU (~USD 1.63/TM en Iquitos) y frente a la informalidad; (2) Incentivos perversos del cofinanciamiento PAMO: al tener garantizado el PAMO anual (USD 2.71M), COPAM tiene menor presión de corto plazo por capturar tráfico mediante descuentos si el MTC puede limitar promociones (Art. 23 RETA).',
      'Limitaciones de la Evidencia del Benchmarking: (1) Heterogeneidad geográfica: comparar un puerto amazónico interior con puertos del Río de la Plata (Colonia/Montevideo para pasajeros) o desembocadura del Magdalena (Barranquilla); (2) Extrapolación lineal del costo de estiba de un solo puerto (Puerto Berrío) a toda la muestra de Uruguay y Colombia; (3) Uso de promedio simple en lugar de ponderado por falta de estadísticas desagregadas en Colombia y Uruguay.',
    ],
    table: {
      caption: 'Matriz de Síntesis Crítica según Rúbrica MGPD02: Evidencia, Inferencias y Limitaciones',
      headers: ['Dimensión de Análisis', 'Resultados Documentados en Expediente', 'Inferencias Económicas / Efectos No Previstos', 'Limitaciones Metodológicas de la Evidencia'],
      rows: [
        { cells: ['Usuarios y Bienestar (Carga y Pasajeros)', 'El 90% del embarque de cabotaje se explica por cerveza, arroz y cemento (p. 111). Tarifa tope protege contra abuso monopolístico.', 'Elasticidad cruzada hacia embarcaderos informales ("La Boca") si navieras menores perciben tarifa de S/ 16.68/TM o S/ 10.55/pasajero como alta.', 'Ausencia total de estadísticas históricas de pasajeros en ENAPU; muestra de pasajeros basada solo en 2 puertos uruguayos (Colonia y Montevideo).'], highlight: true },
        { cells: ['Empresa Concesionaria (COPAM)', 'Sostenibilidad cubierta por PPO (USD 6.74M) y PAMO (USD 2.71M/año). Facultad de aplicar descuentos (Cláusula 9.8).', 'Riesgo de subutilización de capacidad instalada (lejos del gatillo Fase II de 600,000 TM) si no aplica descuentos activos al cabotaje.', 'En concesiones cofinanciadas, el Art. 23 del RETA faculta al MTC (Concedente) a limitar descuentos para proteger ingresos del fideicomiso.'], highlight: true },
        { cells: ['Eficiencia Asignativa y Productiva', 'Empaquetamiento (Cláusula 8.14) reduce costos de transacción y tiempos de estadía (moda 13h) con grúas de 30 Tm.', 'Reemplazo de estiba manual insegura por operación mecanizada genera ganancias de productividad y reducción de siniestralidad.', 'Promedios simples en tarifas de nave y carga uruguaya/colombiana por falta de vectores de volumen para ponderar (sesgo de composición).'] },
      ],
    },
    speakerNotes:
      'Para alcanzar el nivel Destacado en el segundo criterio de la rúbrica MGPD02 (7 puntos), distinguimos rigurosamente entre hechos documentados, inferencias económicas y limitaciones de la evidencia. Está documentado que el 90% del embarque son tres productos clave (cerveza, arroz y cemento) cuyos clientes están en Tarapoto, y que las navieras pidieron tarifas diferenciadas de cabotaje. Nuestra inferencia crítica es que, aunque el benchmarking de OSITRAN es técnicamente impecable, fijar una tarifa basada en estándares internacionales de Colombia y Uruguay puede generar un efecto no previsto: la resistencia de embarcaciones menores y pasajeros a abandonar los muelles informales de la ribera del Huallaga si no se acompaña de fiscalización de la APN y descuentos comerciales activos bajo la Cláusula 9.8.',
    apaReferences: [
      'Shleifer, A. (1985). A theory of yardstick competition. The RAND Journal of Economics, 16(3), 319-327.',
      'OSITRAN. (2016). Informe Fijación Tarifaria NTPY-NR, Matriz de Comentarios (pp. 102-112).',
    ],
  },
  {
    id: 12,
    sectionCode: '07. Conclusiones y Recomendaciones',
    sectionTitle: 'Conclusiones, Recomendaciones de Política y Viabilidad Institucional',
    mgpdCriterion: 'Síntesis del Análisis y Viabilidad Institucional (5 pts)',
    title: 'Síntesis del Análisis: Conclusiones y Recomendaciones Viables para el MEF',
    subtitle: 'Propuestas accionables dentro del marco legal peruano con evaluación explícita de beneficios y limitaciones',
    durationMinutes: 3.5,
    presenterRole: 'Consultor Líder / Coordinador MEF',
    keyPoints: [
      'Conclusión 1 (Pertinencia Metodológica): La elección del Benchmarking por OSITRAN fue la única opción técnicamente viable y económicamente consistente ante la naturaleza greenfield del NTPY-NR y el esquema cofinanciado (PPO/PAMO) que resolvía ex ante la recuperación del costo fijo.',
      'Conclusión 2 (Corrección de Distorsiones): La depuración regulatoria de OSITRAN evitó sobrecostos graves al excluir puertos incomparables (Paita y Zárate), estandarizar el paquete de servicios con datos reales de Puerto Berrío e Iquitos, y reducir en 38.7% la tarifa del servicio principal (carga fraccionada).',
      'Conclusión 3 (Tensión Eficiencia vs. Formalización): El éxito económico de la tarifa máxima aprobada no depende solo de su nivel tope, sino de su capacidad para atraer tráfico desde los embarcaderos informales ("La Boca") y activar economías de densidad hacia las 600,000 TM.',
    ],
    table: {
      caption: 'Matriz de Recomendaciones Regulatorias del Equipo Consultor al MEF / OSITRAN / MTC',
      headers: ['Recomendación Derivada del Análisis', 'Viabilidad dentro del Marco Institucional', 'Beneficios Esperados', 'Posibles Limitaciones y Riesgos'],
      rows: [
        { cells: ['1. Implementar Esquema de Descuentos Comerciales Pro-Cabotaje y Horarios Valle para carga alimenticia y pasajeros.', 'Alta Viabilidad: Amparado directamente en la Cláusula 9.8 del Contrato y Art. 23 del RETA (preaviso de 20 días a OSITRAN y MTC).', 'Aumenta factor de utilización del muelle, reduce costo de canasta básica hacia Iquitos y atrae flujo formal.', 'El MTC (Concedente) podría objetar descuentos agresivos si percibe menor recaudación para el fideicomiso de cofinanciamiento.'], highlight: true },
        { cells: ['2. Coordinación Interinstitucional (APN - DICAPI - MTC) para clausura progresiva de embarcaderos informales ("La Boca").', 'Viabilidad Media-Alta: Competencia legal de APN (Ley N° 27943 del Sistema Portuario Nacional) y Capitanía de Puertos.', 'Elimina competencia desleal e insegura, acelera economías de escala en NTPY-NR y protege vida humana.', 'Resistencia social de estibadores informales y comerciantes locales acostumbrados a evasión de controles y pago cero.'], highlight: true },
        { cells: ['3. Preparar Transición a Regulación por Costos (RPI - X / Costos Incrementales) para la primera Revisión Tarifaria.', 'Alta Viabilidad: Previsto en Cláusula 9.2 y Art. 19 del RETA una vez que el puerto acumule 3 a 5 años de contabilidad regulatoria.', 'Reemplaza supuestos externos de benchmarking por costos reales auditados y productividad propia del NTPY-NR.', 'Requiere implementar contabilidad regulatoria separada estricta para evitar subsidios cruzados con Servicios Especiales.'], highlight: true },
      ],
    },
    speakerNotes:
      'Para concluir nuestra consultoría al MEF, integramos nuestros hallazgos en tres conclusiones y tres recomendaciones con análisis explícito de viabilidad institucional, beneficios y limitaciones, tal como exige el nivel Destacado de la rúbrica MGPD02. Primero, recomendamos activar la Cláusula 9.8 del Contrato y el Art. 23 del RETA mediante una política de descuentos comerciales para cabotaje regional, coordinando con el MTC para que no bloquee estas promociones pues la mayor elasticidad-volumen compensará al fideicomiso. Segundo, articular con APN y DICAPI la formalización del tráfico ribereño en "La Boca". Y tercero, exigir desde el día uno contabilidad regulatoria auditada para que en la siguiente revisión quinquenal OSITRAN pueda transitar del benchmarking hacia un modelo de costos eficientes propios. Muchas gracias, quedamos atentos a sus preguntas.',
    apaReferences: [
      'Congreso de la República del Perú. (2003). Ley N° 27943, Ley del Sistema Portuario Nacional.',
      'OSITRAN. (2016). Resolución de Consejo Directivo N° 043-2016-CD-OSITRAN e Informe Conjunto.',
    ],
  },
];

export const MGPD02_RUBRIC_CRITERIA = [
  {
    id: 'crit-1',
    title: '1. Caracterización del caso y aplicación de teoría económica',
    points: 5,
    destacadoDescriptor:
      'Caracteriza la industria, el mercado y el problema regulatorio; relaciona normas, actores y roles con la resolución. Explica el método de regulación, la tarifa óptima subyacente y el esquema tarifario mediante conceptos económicos aplicados al caso.',
    coveredInSlides: [2, 3, 4, 5, 6],
    verificationSummary:
      'Cubierto exhaustivamente: Perfil fluvial Huallaga/IIRSA Norte (Diap. 2), series de tráfico 2010-2015 con 99.8% carga fraccionada (Diap. 3), Ley 27332, Ley 26917, RETA y Contrato DBFOT cofinanciado PPO/PAMO (Diap. 4), Informe 069-2015/GEE de INDECOPI y paquete integrado Cláusula 8.14 (Diap. 5), y dilema teórico de Hotelling (1938) y Sharkey (2008) P=CMg vs P=CMe (Diap. 6).',
  },
  {
    id: 'crit-2',
    title: '2. Análisis crítico de la decisión y sus efectos económicos',
    points: 7,
    destacadoDescriptor:
      'Contrasta la justificación de la resolución con teoría económica y evidencia del mercado. Examina sus efectos sobre usuarios, empresas y eficiencia; identifica ventajas, limitaciones y posibles efectos no previstos. Distingue los resultados documentados de las inferencias y reconoce las limitaciones de la evidencia.',
    coveredInSlides: [7, 8, 9, 10, 11],
    verificationSummary:
      'Cubierto con rigor: Filtros de condición necesaria/suficiente que excluyen Paita y Zárate (Diap. 7), las 5 fallas de la propuesta de COPAM (Diap. 8), homogenización con Test de Tukey (moda 13h) y costos de Puerto Berrío (Diap. 9), ahorro de 38.7% en carga fraccionada y >62% en contenedores vacíos (Diap. 10), y matriz que separa resultados documentados, inferencias (fuga a "La Boca", riesgo PAMO) y limitaciones de la muestra (Diap. 11).',
  },
  {
    id: 'crit-3',
    title: '3. Síntesis del análisis (Conclusiones y Recomendaciones)',
    points: 5,
    destacadoDescriptor:
      'Integra los principales hallazgos en conclusiones. Formula recomendaciones derivadas del análisis, explica su viabilidad dentro del marco institucional y reconoce sus beneficios y posibles limitaciones.',
    coveredInSlides: [12],
    verificationSummary:
      'Cubierto íntegramente en la Diapositiva 12: Integra los hallazgos en 3 conclusiones estructurales y presenta una Matriz de 3 Recomendaciones (Descuentos Cláusula 9.8/Art. 23 RETA, Fiscalización APN/DICAPI sobre "La Boca", y Contabilidad Regulatoria para revisión futura) detallando para cada una su viabilidad legal, beneficios y limitaciones.',
  },
  {
    id: 'crit-4',
    title: '4. Comunicación y sustentación oral del análisis',
    points: 3,
    destacadoDescriptor:
      'Explica y sustenta sus aportes con evidencia, utiliza apoyos visuales para comunicar los hallazgos y responde las preguntas relacionando teoría y caso (30 min exposición + 10 min preguntas, citas APA 7ma ed.).',
    coveredInSlides: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    verificationSummary:
      'Cubierto en toda la plataforma: Incluye cronómetro de 30 minutos distribuido por diapositiva, notas de orador detalladas para cada integrante del grupo, gráficos interactivos (Monopolio Natural, Tráfico 2010-2015, Test de Tukey y Comparativa Tarifaria), referencias en formato APA 7ma edición y exportación directa a Google Slides.',
  },
];

export const QA_DEFENSE_BANK = [
  {
    question: '¿Por qué OSITRAN no utilizó la metodología de Flujo de Caja Descontado o Costo de Servicio si conocía el monto de inversión referencial de USD 37.06 millones?',
    category: 'Teoría Económica y Metodología',
    answer:
      'Por dos razones económicas fundamentales expuestas en el párrafo 74 del Informe: (1) El NTPY-NR es una concesión cofinanciada donde el Estado ya garantiza la recuperación de la inversión mediante el Pago por Obra (PPO ofertado en USD 6.74M) y los costos de operación y mantenimiento mediante el PAMO anual (USD 2.71M). Por ende, fijar tarifas para cubrir el costo medio total duplicaría la remuneración al inversionista y violaría la eficiencia asignativa (Hotelling, 1938); (2) Al ser un proyecto greenfield, no existía contabilidad histórica de costos operativos ni demanda real en la nueva infraestructura.',
  },
  {
    question: '¿Cuál es el sustento económico para cobrar tarifas distintas a los contenedores llenos (S/ 240.74) y vacíos (S/ 92.99) de 20 pies, rechazando la tarifa única que pedía COPAM?',
    category: 'Estructura Tarifaria y Discriminación de Precios',
    answer:
      'OSITRAN sustenta esta diferenciación (párrafo 101) tanto por el lado de los costos como por el lado de la demanda: (1) Por el lado de costos productivos, movilizar un contenedor lleno genera mayor desgaste mecánico y consumo de energía en las grúas de 30 Tm y reachstackers que uno vacío; (2) Por el lado de la demanda (Regla de Ramsey-Boiteux), el servicio para contenedor lleno lo demanda el consignatario o dueño de la mercancía (menor elasticidad respecto al flete portuario), mientras que el contenedor vacío lo demanda la línea naviera para reposicionamiento logístico. Además, así lo exige taxativamente el Anexo 5 del Contrato de Concesión.',
  },
  {
    question: '¿Qué limitación metodológica presenta la imputación de costos de estiba y operación de cargue/descargue realizada por OSITRAN en el benchmarking?',
    category: 'Análisis Crítico y Limitaciones de la Evidencia',
    answer:
      'Como los puertos de Uruguay y tres de los cuatro puertos de Colombia operan bajo esquema multioperador (donde la tarifa pública solo cubre el uso del muelle y la estiba la cobran terceros privados en competencia), OSITRAN tuvo que imputar a todos esos puertos las tarifas de "Operación de Cargue/Descargue" de un único terminal: Puerto Berrío (USD 2.11/TM en fraccionada y USD 2.37/TM en granel sólido). Si bien Puerto Berrío tiene escala similar (3.8 Ha y grúa de 35 Tm), extrapolar los costos laborales y operativos de Antioquia (Colombia) a puertos uruguayos y peruanos introduce un supuesto fuerte ante la falta de datos públicos desagregados.',
  },
  {
    question: 'Si las empresas navieras advirtieron que el 70% de la carga son alimentos hacia Iquitos, ¿por qué OSITRAN no aprobó una tarifa especial reducida para cabotaje local?',
    category: 'Marco Institucional y Efectos en el Mercado',
    answer:
      'Según la Matriz de Comentarios (pág. 107), OSITRAN explicó que el Anexo 5 del Contrato de Concesión define la estructura tarifaria obligatoria y no contempla distinción entre tráfico de cabotaje y tráfico internacional. El regulador no puede modificar unilateralmente el contrato. Sin embargo, OSITRAN fijó una Tarifa Máxima (tope) de S/ 16.68/TM (38.7% menor a lo pedido por COPAM) y recordó que, bajo la Cláusula 9.8 del Contrato y el Art. 23 del RETA, el concesionario tiene plena facultad para otorgar descuentos comerciales al tráfico de cabotaje para competir con los embarcaderos informales.',
  },
];
