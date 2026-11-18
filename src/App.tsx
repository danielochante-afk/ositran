import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Play,
  Pause,
  RotateCcw,
  FileSpreadsheet,
  CheckCircle2,
  BookOpen,
  FileText,
  ExternalLink,
  HelpCircle,
  Sparkles,
  LogOut,
  AlertCircle,
  Download,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  SLIDES_DATA,
  PRESENTATION_METADATA,
  MGPD02_RUBRIC_CRITERIA,
  QA_DEFENSE_BANK,
} from './data/slidesData';
import {
  TrafficEvolutionChart,
  NaturalMonopolyChart,
  TukeyOutlierChart,
  TariffComparisonChart,
} from './components/SlideVisualCharts';
import { initAuth, googleSignIn, logout, getAccessToken } from './services/googleAuth';
import { exportToGoogleSlides } from './services/googleSlidesService';
import { exportSlideToPdf } from './services/pdfExportService';

type ActiveTab = 'diapositivas' | 'rubrica' | 'simulador' | 'documentos';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('diapositivas');
  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);

  // 30-minute Oral Defense Timer (1800 seconds)
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Interactive Tariff Calculator State
  const [calcCategory, setCalcCategory] = useState<string>('fraccionada');
  const [calcQuantity, setCalcQuantity] = useState<number>(500);
  const [calcHours, setCalcHours] = useState<number>(13);

  // Google Workspace Auth & Slides Export State
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [pdfFeedback, setPdfFeedback] = useState<string | null>(null);
  const [exportStatus, setExportStatus] = useState<string>('');
  const [exportedUrl, setExportedUrl] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  const currentSlide = SLIDES_DATA[currentSlideIdx];

  useEffect(() => {
    const unsubscribe = initAuth(
      (u, token) => {
        setUser(u);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'diapositivas' || isExportModalOpen) return;
      if (e.key === 'ArrowRight') {
        setCurrentSlideIdx((prev) => Math.min(SLIDES_DATA.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIdx((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, isExportModalOpen]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const handleGoogleLoginAndOpenModal = async () => {
    setExportError(null);
    if (!accessToken) {
      try {
        const res = await googleSignIn();
        if (res) {
          setUser(res.user);
          setAccessToken(res.accessToken);
          setIsExportModalOpen(true);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'No se pudo autenticar con Google';
        setExportError(msg);
        setIsExportModalOpen(true);
      }
    } else {
      setIsExportModalOpen(true);
    }
  };

  const handleExportCurrentSlidePdf = () => {
    try {
      const fileName = exportSlideToPdf(currentSlide, SLIDES_DATA.length, showSpeakerNotes);
      setPdfFeedback(`Descargado: ${fileName}`);
      setTimeout(() => setPdfFeedback(null), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al generar el PDF';
      setPdfFeedback(msg);
      setTimeout(() => setPdfFeedback(null), 4000);
    }
  };

  const handleConfirmCreateGoogleSlides = async () => {
    setIsExporting(true);
    setExportError(null);
    try {
      let token = await getAccessToken();
      if (!token) {
        const loginRes = await googleSignIn();
        if (!loginRes) throw new Error('Se requiere iniciar sesión con Google para exportar a Google Slides.');
        token = loginRes.accessToken;
        setUser(loginRes.user);
        setAccessToken(loginRes.accessToken);
      }

      const result = await exportToGoogleSlides(token, SLIDES_DATA, (status) => {
        setExportStatus(status);
      });
      setExportedUrl(result.presentationUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al exportar presentación a Google Slides';
      setExportError(msg);
    } finally {
      setIsExporting(false);
    }
  };

  // Interactive Calculator logic
  const getCalculatorResult = () => {
    switch (calcCategory) {
      case 'fraccionada':
        return {
          name: 'Carga Fraccionada (Cerveza, Arroz, Cemento)',
          unit: 'Toneladas Métricas (TM)',
          copamRate: 27.2,
          ositranRate: 16.68,
          copamTotal: calcQuantity * 27.2,
          ositranTotal: calcQuantity * 16.68,
        };
      case 'nave':
        return {
          name: 'Servicio Estándar a la Nave (Amarradero + Amarre/Desamarre)',
          unit: 'Metros de Eslora × Horas',
          copamRate: 0.9,
          ositranRate: 0.73,
          copamTotal: calcQuantity * calcHours * 0.9,
          ositranTotal: calcQuantity * calcHours * 0.73,
        };
      case 'teu_vacio':
        return {
          name: 'Contenedor Vacío de 20 pies (Retorno Logístico)',
          unit: 'Contenedores (TEU)',
          copamRate: 249.0,
          ositranRate: 92.99,
          copamTotal: calcQuantity * 249.0,
          ositranTotal: calcQuantity * 92.99,
        };
      case 'feu_vacio':
        return {
          name: 'Contenedor Vacío de 40 pies (Retorno Logístico)',
          unit: 'Contenedores (FEU)',
          copamRate: 403.2,
          ositranRate: 111.52,
          copamTotal: calcQuantity * 403.2,
          ositranTotal: calcQuantity * 111.52,
        };
      case 'teu_lleno':
        return {
          name: 'Contenedor con Carga de 20 pies',
          unit: 'Contenedores (TEU)',
          copamRate: 249.0,
          ositranRate: 240.74,
          copamTotal: calcQuantity * 249.0,
          ositranTotal: calcQuantity * 240.74,
        };
      case 'pasajeros':
        return {
          name: 'Servicio Estándar a los Pasajeros (Embarque/Desembarque)',
          unit: 'Pasajeros',
          copamRate: 11.1,
          ositranRate: 10.55,
          copamTotal: calcQuantity * 11.1,
          ositranTotal: calcQuantity * 10.55,
        };
      default:
        return {
          name: 'Carga Sólida a Granel',
          unit: 'Toneladas Métricas (TM)',
          copamRate: 16.9,
          ositranRate: 16.59,
          copamTotal: calcQuantity * 16.9,
          ositranTotal: calcQuantity * 16.59,
        };
    }
  };

  const calcResult = getCalculatorResult();
  const calcSavings = calcResult.copamTotal - calcResult.ositranTotal;
  const calcSavingsPct =
    calcResult.copamTotal > 0 ? ((calcSavings / calcResult.copamTotal) * 100).toFixed(1) : '0.0';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-slate-200 sticky top-0 z-30">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('diapositivas');
          }}
          className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 font-display"
        >
          OSITRAN · Caso Yurimaguas (MGPD02)
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setActiveTab('diapositivas')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'diapositivas'
                ? 'border-sky-700 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Presentación (12 Diapositivas)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rubrica')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'rubrica'
                ? 'border-sky-700 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Rúbrica MGPD02 y Preguntas
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('simulador')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'simulador'
                ? 'border-sky-700 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Simulador de Impacto Tarifario
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('documentos')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'documentos'
                ? 'border-sky-700 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Documentos Fuente (PDF)
          </button>
        </nav>

        {/* Zone 3: 1 primary action (Export to Google Slides) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleGoogleLoginAndOpenModal}
            className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Exportar a Google Slides
          </button>
        </div>
      </header>

      {/* Mobile Navigation Bar */}
      <div className="flex md:hidden items-center gap-2 px-4 py-2 bg-white border-b border-slate-200 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('diapositivas')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
            activeTab === 'diapositivas' ? 'bg-slate-900 text-white' : 'text-slate-600'
          }`}
        >
          Diapositivas (12)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('rubrica')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
            activeTab === 'rubrica' ? 'bg-slate-900 text-white' : 'text-slate-600'
          }`}
        >
          Rúbrica MGPD02
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('simulador')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
            activeTab === 'simulador' ? 'bg-slate-900 text-white' : 'text-slate-600'
          }`}
        >
          Simulador Tarifario
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('documentos')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
            activeTab === 'documentos' ? 'bg-slate-900 text-white' : 'text-slate-600'
          }`}
        >
          PDFs Fuente
        </button>
      </div>

      {/* Sub-header context strip & 30-Min Presentation Timer */}
      <div className="bg-slate-900 text-slate-200 px-6 py-2.5 border-b border-slate-800">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-2 text-slate-300">
            <span className="font-semibold text-white">{PRESENTATION_METADATA.program}</span>
            <span aria-hidden="true">·</span>
            <span>{PRESENTATION_METADATA.clientRole}</span>
            <span aria-hidden="true">·</span>
            <span className="text-sky-300">{PRESENTATION_METADATA.resolution}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer for 30-min defense rule */}
            <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-md border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-slate-400">Exposición (Máx 30:00):</span>
              <span
                className={`font-mono-num font-bold ${
                  timerSeconds > 1800 ? 'text-red-400' : 'text-white'
                }`}
              >
                {formatTime(timerSeconds)}
              </span>
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                title={isTimerRunning ? 'Pausar cronómetro' : 'Iniciar simulación de 30 min'}
                className="p-1 hover:bg-slate-700 rounded text-slate-200 transition-colors cursor-pointer"
              >
                {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(0);
                }}
                title="Reiniciar cronómetro"
                className="p-1 hover:bg-slate-700 rounded text-slate-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {user && (
              <div className="flex items-center gap-2 text-slate-300">
                <span className="truncate max-w-[160px]">{user.email}</span>
                <button
                  type="button"
                  onClick={logout}
                  title="Cerrar sesión de Google"
                  className="text-slate-400 hover:text-white p-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'diapositivas' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Sidebar: 12-Slide Outline grouped by MGPD02 Structure */}
            <aside className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-900">
                  Índice Estructural MGPD02
                </span>
                <span className="font-mono-num text-xs text-slate-500">12 Diap. · 30 min</span>
              </div>
              <div className="space-y-1 max-h-[640px] overflow-y-auto pr-1">
                {SLIDES_DATA.map((slide, idx) => {
                  const isActive = idx === currentSlideIdx;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentSlideIdx(idx)}
                      className={`w-full text-left p-2.5 rounded-lg transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-sky-50/90 border-sky-300 text-slate-900 shadow-2xs'
                          : 'bg-transparent border-transparent hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-0.5">
                        <span className={isActive ? 'font-semibold text-sky-800' : ''}>
                          {slide.sectionCode}
                        </span>
                        <span className="font-mono-num">{slide.durationMinutes}m</span>
                      </div>
                      <div
                        className={`text-xs leading-snug line-clamp-2 ${
                          isActive ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'
                        }`}
                      >
                        {slide.id}. {slide.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Right Main Stage: Current Slide Deck Canvas + Speaker Notes */}
            <section className="lg:col-span-9 space-y-5">
              {/* Slide Controls Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-2xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentSlideIdx === 0}
                    onClick={() => setCurrentSlideIdx((prev) => Math.max(0, prev - 1))}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Anterior
                  </button>
                  <span className="font-mono-num text-xs font-semibold text-slate-700 px-2">
                    Diapositiva {currentSlide.id} de {SLIDES_DATA.length}
                  </span>
                  <button
                    type="button"
                    disabled={currentSlideIdx === SLIDES_DATA.length - 1}
                    onClick={() =>
                      setCurrentSlideIdx((prev) => Math.min(SLIDES_DATA.length - 1, prev + 1))
                    }
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Siguiente
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-600">
                  <span>
                    Expositor sugerido: <strong className="text-slate-900">{currentSlide.presenterRole}</strong>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-num">
                    Tiempo: <strong>{currentSlide.durationMinutes} min</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
                    className="px-2.5 py-1.5 text-xs font-medium rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {showSpeakerNotes ? 'Ocultar Guion Oral' : 'Ver Guion Oral'}
                  </button>
                  <button
                    type="button"
                    onClick={handleExportCurrentSlidePdf}
                    title="Descargar la diapositiva actual en formato PDF para revisión offline"
                    className="px-3 py-1.5 text-xs font-semibold rounded-md border border-sky-200 bg-sky-50 text-sky-900 hover:bg-sky-100 transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-700" />
                    Exportar PDF
                  </button>
                </div>
              </div>

              {pdfFeedback && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{pdfFeedback}</span>
                </div>
              )}

              {/* PRIMARY SLIDE CANVAS (16:9 Presentation Feel) */}
              <article className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
                {/* Slide Top Header Banner */}
                <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-sky-50/40">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sky-800">{currentSlide.sectionCode}</span>
                      <span aria-hidden="true">·</span>
                      <span>{currentSlide.sectionTitle}</span>
                    </div>
                    <div className="text-slate-500">
                      Criterio Rúbrica: <span className="font-semibold text-slate-800">{currentSlide.mgpdCriterion}</span>
                    </div>
                  </div>

                  <h1
                    className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug font-display"
                    style={{ textWrap: 'balance' }}
                  >
                    {currentSlide.title}
                  </h1>
                  <p className="text-sm text-slate-600 mt-1">{currentSlide.subtitle}</p>
                </div>

                {/* Slide Body Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* KPI Stats Row (if present) */}
                  {currentSlide.stats && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                      {currentSlide.stats.map((st) => (
                        <div
                          key={st.label}
                          className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/90"
                        >
                          <div className="text-xs text-slate-500">{st.label}</div>
                          <div className="font-mono-num text-lg font-bold text-slate-900 mt-0.5">
                            {st.value}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1 leading-tight">
                            {st.subtext}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Economic Theory Callout (if present) */}
                  {currentSlide.economicConcept && (
                    <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200/90 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-sky-950 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-sky-700" />
                          Fundamento de Teoría Económica: {currentSlide.economicConcept.term}
                        </span>
                        {currentSlide.economicConcept.formula && (
                          <code className="font-mono-num text-xs font-semibold text-sky-900 bg-white px-2.5 py-0.5 rounded border border-sky-200">
                            {currentSlide.economicConcept.formula}
                          </code>
                        )}
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {currentSlide.economicConcept.explanation}
                      </p>
                      <div className="text-[11px] text-slate-500 italic">
                        Referencia teórica: {currentSlide.economicConcept.citation}
                      </div>
                    </div>
                  )}

                  {/* Interactive Chart / Simulation (if present on this slide) */}
                  {currentSlide.chartType === 'traffic-evolution' && <TrafficEvolutionChart />}
                  {currentSlide.chartType === 'natural-monopoly' && <NaturalMonopolyChart />}
                  {currentSlide.chartType === 'tukey-outlier' && <TukeyOutlierChart />}
                  {currentSlide.chartType === 'tariff-comparison' && <TariffComparisonChart />}

                  {/* Key Points Analytical List */}
                  <div className="space-y-2.5">
                    <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                      Análisis Técnico y Argumentos Centrales (Sustento para el MEF)
                    </h3>
                    <ul className="space-y-2">
                      {currentSlide.keyPoints.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed"
                        >
                          <span className="font-mono-num text-xs font-bold text-sky-700 mt-0.5 shrink-0">
                            0{i + 1}.
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Structured Data Table (if present) */}
                  {currentSlide.table && (
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-800">
                        {currentSlide.table.caption}
                      </div>
                      <div className="overflow-x-auto border border-slate-200 rounded-xl">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700">
                              {currentSlide.table.headers.map((h, i) => (
                                <th key={i} className="py-2.5 px-3 font-semibold">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {currentSlide.table.rows.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className={
                                  row.highlight
                                    ? 'bg-sky-50/50 font-medium text-slate-900'
                                    : 'bg-white text-slate-700'
                                }
                              >
                                {row.cells.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`py-2.5 px-3 leading-snug ${
                                      cIdx > 0 ? 'font-mono-num' : ''
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                {/* Slide Footer: APA 7ma References & Page Number */}
                <div className="px-6 sm:px-8 py-3.5 bg-slate-50 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
                  <div className="space-y-0.5 max-w-3xl">
                    {currentSlide.apaReferences.map((ref, idx) => (
                      <div key={idx} className="truncate">
                        <strong className="text-slate-700">Cita APA 7ma:</strong> {ref}
                      </div>
                    ))}
                  </div>
                  <div className="font-mono-num font-semibold text-slate-700 shrink-0">
                    P-TIF · Diapositiva {currentSlide.id} / {SLIDES_DATA.length}
                  </div>
                </div>
              </article>

              {/* Speaker Notes Panel for Oral Defense */}
              {showSpeakerNotes && (
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">
                      Guion de Sustentación Oral sugerido para el Expositor ({currentSlide.presenterRole} ·{' '}
                      {currentSlide.durationMinutes} min)
                    </span>
                    <span className="text-xs text-slate-500">
                      Diseñado para no depender de la lectura literal de la diapositiva (Rúbrica: 3 pts)
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
                    “{currentSlide.speakerNotes}”
                  </p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* TAB 2: MGPD02 RUBRIC COMPLIANCE & 10-MINUTE Q&A DEFENSE BANK */}
        {activeTab === 'rubrica' && (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="max-w-3xl mb-6">
                <div className="text-xs font-semibold text-sky-800 mb-1">
                  Auditoría de Cumplimiento Académico · Sobre 20 Puntos
                </div>
                <h2 className="text-2xl font-bold text-slate-900 font-display">
                  Matriz de Verificación: Lineamientos y Rúbrica MGPD02 (Nivel Destacado)
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Cada criterio de evaluación del curso Regulación y Gestión de los Servicios Públicos está
                  vinculado directamente con las diapositivas de la presentación para asegurar los 20 puntos.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MGPD02_RUBRIC_CRITERIA.map((crit) => (
                  <div
                    key={crit.id}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{crit.title}</h3>
                        <span className="font-mono-num text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md shrink-0">
                          Nivel Destacado: {crit.points} / {crit.points} pts
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 italic leading-relaxed">
                        “{crit.destacadoDescriptor}”
                      </p>
                      <p className="text-xs text-slate-800 leading-relaxed pt-1">
                        <strong className="text-sky-900">Cómo se cumple en las diapositivas: </strong>
                        {crit.verificationSummary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-slate-500 mr-1">Ir a diapositiva:</span>
                      {crit.coveredInSlides.map((sId) => (
                        <button
                          key={sId}
                          type="button"
                          onClick={() => {
                            setCurrentSlideIdx(sId - 1);
                            setActiveTab('diapositivas');
                          }}
                          className="px-2 py-0.5 text-xs font-mono-num font-semibold bg-white border border-slate-200 rounded hover:border-sky-500 hover:text-sky-700 transition-colors cursor-pointer"
                        >
                          #{sId}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 10-Minute Q&A Defense Bank */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="max-w-3xl mb-6">
                <div className="text-xs font-semibold text-sky-800 mb-1">
                  Preparación para la Ronda de Preguntas (10 Minutos)
                </div>
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  Banco de Respuestas para Preguntas del Profesor y Otros Grupos
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Respuestas estructuradas integrando teoría económica, cláusulas contractuales y evidencia del
                  expediente OSITRAN.
                </p>
              </div>

              <div className="space-y-4">
                {QA_DEFENSE_BANK.map((qa, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-sky-800">{qa.category}</span>
                      <span className="font-mono-num text-xs text-slate-400">Pregunta Crítica #{i + 1}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                      <span>{qa.question}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-6">
                      {qa.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INTERACTIVE TARIFF IMPACT SIMULATOR */}
        {activeTab === 'simulador' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold text-sky-800 mb-1">
                Laboratorio Cuantitativo para el Informe MEF
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Simulador de Impacto Económico: Propuesta COPAM vs. Tarifas Máximas OSITRAN
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Calcula el ahorro directo en costos logísticos para usuarios fluviales, navieras de cabotaje y
                comerciantes de la ruta Yurimaguas – Iquitos (en Soles sin IGV).
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    1. Selecciona el Servicio Estándar (Anexo 5 Contrato)
                  </label>
                  <select
                    value={calcCategory}
                    onChange={(e) => setCalcCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-900 font-medium focus:outline-none focus:border-sky-600"
                  >
                    <option value="fraccionada">Carga Fraccionada (99.8% del tráfico: Cerveza, Arroz, Cemento)</option>
                    <option value="teu_vacio">Contenedor Vacío de 20 pies (Reposicionamiento)</option>
                    <option value="feu_vacio">Contenedor Vacío de 40 pies (Reposicionamiento)</option>
                    <option value="teu_lleno">Contenedor con Carga de 20 pies</option>
                    <option value="granel_solido">Carga Sólida a Granel</option>
                    <option value="nave">Servicio Estándar a la Nave (Amarradero + Amarre)</option>
                    <option value="pasajeros">Servicio Estándar a los Pasajeros</option>
                  </select>
                </div>

                <div>
                  <label className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                    <span>
                      2. {calcCategory === 'nave' ? 'Eslora de la Nave (Metros)' : `Cantidad (${calcResult.unit})`}
                    </span>
                    <span className="font-mono-num text-sky-800">
                      {calcQuantity.toLocaleString()} {calcCategory === 'nave' ? 'm' : ''}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={calcCategory === 'nave' ? 20 : 10}
                    max={calcCategory === 'fraccionada' ? 93402 : calcCategory === 'nave' ? 150 : 1000}
                    step={calcCategory === 'fraccionada' ? 100 : 1}
                    value={calcQuantity}
                    onChange={(e) => setCalcQuantity(Number(e.target.value))}
                    className="w-full accent-sky-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>Mínimo</span>
                    {calcCategory === 'fraccionada' && (
                      <button
                        type="button"
                        onClick={() => setCalcQuantity(93402)}
                        className="text-sky-700 underline font-medium cursor-pointer"
                      >
                        Simular Todo el Tráfico 2015 (93,402 TM)
                      </button>
                    )}
                    {calcCategory === 'nave' && (
                      <button
                        type="button"
                        onClick={() => {
                          setCalcQuantity(68);
                          setCalcHours(13);
                        }}
                        className="text-sky-700 underline font-medium cursor-pointer"
                      >
                        Usar Nave Promedio OSITRAN (68m × 13h)
                      </button>
                    )}
                    <span>Máximo</span>
                  </div>
                </div>

                {calcCategory === 'nave' && (
                  <div>
                    <label className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                      <span>3. Tiempo de Estadía en Muelle (Horas)</span>
                      <span className="font-mono-num text-sky-800">{calcHours} horas (Moda Tukey: 13h)</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={72}
                      value={calcHours}
                      onChange={(e) => setCalcHours(Number(e.target.value))}
                      className="w-full accent-sky-700 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs text-slate-500">Costo con Propuesta COPAM</div>
                  <div className="font-mono-num text-xl font-bold text-slate-700 mt-1">
                    S/ {calcResult.copamTotal.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    Tarifa unitaria: <span className="font-mono-num">S/ {calcResult.copamRate.toFixed(2)}</span> (TC S/ 3.50)
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-sky-200 bg-sky-50/50">
                  <div className="text-xs text-sky-800 font-medium">Costo con Tarifa Máxima OSITRAN</div>
                  <div className="font-mono-num text-xl font-bold text-sky-950 mt-1">
                    S/ {calcResult.ositranTotal.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-sky-800 mt-2">
                    Tarifa unitaria: <span className="font-mono-num">S/ {calcResult.ositranRate.toFixed(2)}</span> (TC S/ 3.328)
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/50">
                  <div className="text-xs text-emerald-800 font-medium">Ahorro Generado al Mercado</div>
                  <div className="font-mono-num text-xl font-bold text-emerald-950 mt-1">
                    S/ {calcSavings.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-emerald-800 font-semibold mt-2">
                    Reducción del {calcSavingsPct}% en sobrecosto
                  </div>
                </div>

                <div className="sm:col-span-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <strong>Interpretación Económica para la Exposición:</strong> Si evaluamos el volumen total de
                  carga fraccionada movilizado en Yurimaguas en 2015 (<strong>93,402 toneladas</strong>), la
                  intervención regulatoria de OSITRAN al reducir la tarifa de S/ 27.20 a S/ 16.68 por tonelada
                  generó un ahorro directo de <strong>S/ 982,589 anuales</strong> para los consumidores y
                  comerciantes amazónicos, evitando que el poder monopólico del terminal encarezca la canasta
                  básica en Loreto.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EMBEDDED SOURCE PDFs */}
        {activeTab === 'documentos' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-sky-700" />
                      Expediente OSITRAN: Resolución N° 043-2016-CD-OSITRAN (112 págs.)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Resolución, Informe Conjunto GRE-GAJ, Anexos 1-7, Exposición de Motivos y Matriz de Comentarios
                    </p>
                  </div>
                  <a
                    href="/assets/aistudio/5._OSITRAN_Tarifas_Maximas_Puerto_de_Yurimaguas__2__ebbbcd6f.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 text-xs font-semibold text-sky-700 border border-sky-200 rounded-lg hover:bg-sky-50 flex items-center gap-1 whitespace-nowrap shrink-0"
                  >
                    Abrir PDF <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <iframe
                  title="Documento OSITRAN Tarifas Máximas Puerto de Yurimaguas"
                  src="/assets/aistudio/5._OSITRAN_Tarifas_Maximas_Puerto_de_Yurimaguas__2__ebbbcd6f.pdf"
                  className="w-full h-[540px] rounded-xl border border-slate-200"
                />
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-sky-700" />
                      Lineamientos y Rúbrica del Trabajo Integrador Final (MGPD02)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Escuela de Gestión Pública - Universidad del Pacífico (Estructura y Rúbrica sobre 20 pts)
                    </p>
                  </div>
                  <a
                    href="/assets/aistudio/MGPD02_RGSP_Lineamientos_y_r_brica_TIF.docx__1__02693116.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 text-xs font-semibold text-sky-700 border border-sky-200 rounded-lg hover:bg-sky-50 flex items-center gap-1 whitespace-nowrap shrink-0"
                  >
                    Abrir PDF <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <iframe
                  title="Lineamientos y Rúbrica MGPD02"
                  src="/assets/aistudio/MGPD02_RGSP_Lineamientos_y_r_brica_TIF.docx__1__02693116.pdf"
                  className="w-full h-[540px] rounded-xl border border-slate-200"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mandatory Confirmation & Export Modal for Google Slides (Workspace Integration Skill) */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Confirmar Creación de Presentación en Google Slides
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Integración oficial con Google Workspace (Google Slides API v1)
                </p>
              </div>
            </div>

            {!user ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <p className="text-xs text-slate-700 leading-relaxed">
                  Para crear las 12 diapositivas directamente en tu cuenta de Google Slides, inicia sesión con tu
                  cuenta de Google autorizando el permiso de presentaciones:
                </p>
                <button
                  type="button"
                  onClick={handleGoogleLoginAndOpenModal}
                  className="gsi-material-button"
                >
                  <div className="gsi-material-button-state"></div>
                  <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        style={{ display: 'block' }}
                      >
                        <path
                          fill="#EA4335"
                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                        ></path>
                        <path
                          fill="#4285F4"
                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                        ></path>
                        <path
                          fill="#FBBC05"
                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                        ></path>
                        <path
                          fill="#34A853"
                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                        ></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                    </div>
                    <span className="gsi-material-button-contents">Sign in with Google</span>
                  </div>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                  <div>
                    <strong>Acción a confirmar:</strong> Se creará una nueva presentación de Google Slides en la
                    cuenta <strong>{user.email}</strong>.
                  </div>
                  <div>
                    <strong>Título del archivo:</strong> {PRESENTATION_METADATA.caseTitle} (
                    {PRESENTATION_METADATA.resolution}) - MGPD02
                  </div>
                  <div>
                    <strong>Alcance:</strong> 12 diapositivas estructuradas según los 7 capítulos de los
                    lineamientos MGPD02, incluyendo tablas tarifarias, fórmulas de teoría económica y citas APA 7ma
                    edición.
                  </div>
                </div>

                {isExporting && (
                  <div className="p-3 rounded-lg bg-sky-50 border border-sky-200 text-xs text-sky-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin text-sky-700 shrink-0" />
                    <span>{exportStatus || 'Procesando diapositivas...'}</span>
                  </div>
                )}

                {exportedUrl && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>¡Presentación creada exitosamente en tu Google Slides!</span>
                    </div>
                    <a
                      href={exportedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors"
                    >
                      Abrir Presentación en Google Slides
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {exportError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{exportError}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setIsExportModalOpen(false);
                  setExportedUrl(null);
                  setExportError(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Cerrar
              </button>
              {user && !exportedUrl && (
                <button
                  type="button"
                  disabled={isExporting}
                  onClick={handleConfirmCreateGoogleSlides}
                  className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 disabled:opacity-50 cursor-pointer"
                >
                  {isExporting ? 'Creando Diapositivas...' : 'Confirmar y Crear en Google Slides'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200 px-6 py-4 text-xs text-slate-500">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            Trabajo Integrador Final (P-TIF) · Maestría en Gestión Pública Descentralizada (MGPD02) · Escuela de
            Gestión Pública
          </div>
          <div>
            Caso Regulatorio: Resolución de Consejo Directivo N° 043-2016-CD-OSITRAN (Terminal Portuario de
            Yurimaguas – Nueva Reforma)
          </div>
        </div>
      </footer>
    </div>
  );
}
