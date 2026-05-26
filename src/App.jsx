import React, { useState, useEffect, useRef } from 'react';
import { Upload, CheckCircle2, Plane, ChevronRight, TrendingUp, Clock, Shield, Zap, ArrowLeft } from 'lucide-react';

const B = {
  primary: '#1aa990',
  dark: '#0a5a62',
  light: '#e8f8f5',
  lighter: '#f4fbfa',
  shadow: 'rgba(26, 169, 144, 0.22)',
};

const airlines = [
  { name: 'Ryanair',    logo: 'https://logo.clearbit.com/ryanair.com',    bg: '#073590', initial: 'RY' },
  { name: 'Vueling',    logo: 'https://logo.clearbit.com/vueling.com',    bg: '#FF5A00', initial: 'VY' },
  { name: 'Iberia',     logo: 'https://logo.clearbit.com/iberia.com',     bg: '#C8102E', initial: 'IB' },
  { name: 'Air Europa', logo: 'https://logo.clearbit.com/aireuropa.com',  bg: '#004E9E', initial: 'UX' },
  { name: 'Otra',       logo: null,                                       bg: B.dark,    initial: '+' },
];

const issues = [
  { id: 'delay',       label: 'Vuelo retrasado',  icon: '⏱️', min: 250, max: 600 },
  { id: 'cancelled',   label: 'Vuelo cancelado',  icon: '✈️', min: 400, max: 600 },
  { id: 'luggage',     label: 'Equipaje perdido', icon: '🧳', min: 300, max: 500 },
  { id: 'overbooking', label: 'Overbooking',      icon: '🎫', min: 400, max: 600 },
];

const STEPS = ['Aerolínea', 'Vuelo', 'Billete', 'Incidencia'];

function AirlineLogo({ airline }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
         style={{ background: airline.bg }}>
      {airline.logo && !failed ? (
        <img src={airline.logo} alt={airline.name}
             className="w-10 h-10 object-contain"
             onError={() => setFailed(true)} />
      ) : (
        <span className="text-white font-black text-base">{airline.initial}</span>
      )}
    </div>
  );
}

function StepperBar({ step }) {
  return (
    <div className="flex items-center gap-2 px-8 pt-7 pb-5 border-b border-slate-100">
      {STEPS.map((label, idx) => (
        <React.Fragment key={idx}>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                 style={{
                   background: step > idx ? B.primary : step === idx ? B.primary : '#f1f5f9',
                   color: step >= idx ? 'white' : '#94a3b8',
                   boxShadow: step === idx ? `0 0 0 4px ${B.primary}22` : 'none',
                 }}>
              {step > idx ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
            </div>
            <span className="text-sm font-semibold hidden sm:block"
                  style={{ color: step >= idx ? B.dark : '#94a3b8' }}>
              {label}
            </span>
          </div>
          {idx < STEPS.length - 1 && (
            <div className="flex-1 h-0.5 rounded-full bg-slate-100 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                   style={{ width: step > idx ? '100%' : '0%', background: B.primary }} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ airline: '', flightNumber: '', issue: '', file: null });
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) { setFormData(d => ({...d, file: file.name})); setTimeout(() => setStep(3), 500); }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2500));
    setLoading(false);
    setShowResult(true);
  };

  const reset = () => { setShowResult(false); setStarted(false); setStep(0); setFormData({ airline: '', flightNumber: '', issue: '', file: null }); };

  const selectedIssue = issues.find(i => i.id === formData.issue);
  const comp = selectedIssue ? `${selectedIssue.min}€ – ${selectedIssue.max}€` : '250€ – 600€';

  const gradBtn = { background: `linear-gradient(135deg, ${B.primary} 0%, ${B.dark} 100%)` };

  return (
    <div className="min-h-screen bg-white">

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/defendme_logo.png" alt="DefendMe" className="w-10 h-10" />
            <span className="text-2xl font-black tracking-tight" style={{ color: B.dark }}>
              defend<span style={{ color: B.primary }}>Me</span>
            </span>
          </div>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 overflow-hidden"
               style={{ background: 'linear-gradient(150deg, #eaf8f5 0%, #d5f0eb 60%, #cce8f4 100%)' }}>
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-8 w-80 h-80 rounded-full blur-3xl opacity-25"
               style={{ background: `radial-gradient(circle, ${B.primary}, transparent 70%)`,
                        transform: `translateY(${scrollY * 0.25}px)` }} />
          <div className="absolute bottom-10 right-12 w-[440px] h-[440px] rounded-full blur-3xl opacity-20"
               style={{ background: `radial-gradient(circle, ${B.dark}, transparent 70%)`,
                        transform: `translateY(${scrollY * -0.15}px)` }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-7 animate-fadeIn"
               style={{ background: 'rgba(26,169,144,0.12)', border: '1px solid rgba(26,169,144,0.28)' }}>
            <TrendingUp className="w-4 h-4" style={{ color: B.primary }} />
            <span className="text-sm font-semibold" style={{ color: B.dark }}>
              Más de 15.000 reclamaciones procesadas
            </span>
          </div>

          {/* Logo grande */}
          <div className="flex flex-col items-center mb-6 animate-fadeIn">
            <img src="/defendme_logo.png" alt="DefendMe" className="w-24 h-24 drop-shadow-xl mb-3" />
            <span className="text-6xl md:text-7xl font-black tracking-tight" style={{ color: B.dark }}>
              defend<span style={{ color: B.primary }}>Me</span>
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 animate-slideUp"
              style={{ color: B.dark, lineHeight: '1.2' }}>
            Reclama tu compensación
            <br />
            <span style={{ color: B.primary }}>en menos de 1 minuto</span>
          </h1>

          <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto leading-relaxed animate-slideUp"
             style={{ animationDelay: '0.1s' }}>
            <span className="font-semibold" style={{ color: B.dark }}>Ellos complican, nosotros resolvemos.</span>
            <br />Sin papeleo. Sin conocimientos legales. Solo resultados.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm animate-slideUp"
               style={{ animationDelay: '0.2s' }}>
            {[
              { icon: <Shield className="w-4 h-4" />, label: '100% sin riesgo' },
              { icon: <Zap className="w-4 h-4" />, label: 'Solo cobramos si ganas (20%)' },
              { icon: <Clock className="w-4 h-4" />, label: 'Validación en segundos' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur shadow-sm">
                <span style={{ color: B.primary }}>{item.icon}</span>
                <span className="font-semibold text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>

          {!started && (
            <div className="mt-10 animate-slideUp" style={{ animationDelay: '0.3s' }}>
              <button onClick={() => { setStarted(true); setTimeout(() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                      className="px-10 py-4 rounded-full text-white font-black text-lg transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
                      style={gradBtn}>
                Comenzar reclamación →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── FORM SECTION ───────────────────────────────────────────────── */}
      {started && (
      <section id="form-section" className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-6">

          {!showResult && !loading && (
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-100"
                 style={{ boxShadow: `0 24px 64px ${B.shadow}` }}>
              <StepperBar step={step} />

              <div className="p-8">

                {/* STEP 0 — Aerolínea */}
                {step === 0 && (
                  <div className="animate-fadeIn">
                    <h2 className="text-2xl font-black mb-1" style={{ color: B.dark }}>
                      ¿Con qué aerolínea volaste?
                    </h2>
                    <p className="text-slate-500 text-sm mb-6">Selecciona tu aerolínea para continuar</p>
                    <div className="grid grid-cols-2 gap-3">
                      {airlines.map(a => (
                        <button key={a.name}
                                onClick={() => { setFormData(d => ({...d, airline: a.name})); setTimeout(() => setStep(1), 220); }}
                                className="group relative p-4 rounded-2xl border-2 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                                style={{
                                  borderColor: formData.airline === a.name ? B.primary : '#f1f5f9',
                                  background:  formData.airline === a.name ? B.light : 'white',
                                }}>
                          <div className="flex items-center gap-3">
                            <AirlineLogo airline={a} />
                            <span className="font-bold text-slate-800">{a.name}</span>
                          </div>
                          {formData.airline === a.name && (
                            <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                                 style={{ background: B.primary }}>
                              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 1 — Número de vuelo */}
                {step === 1 && (
                  <div className="animate-fadeIn">
                    <button onClick={() => setStep(0)}
                            className="flex items-center gap-1 text-sm font-semibold mb-5 hover:underline"
                            style={{ color: B.primary }}>
                      <ArrowLeft className="w-4 h-4" /> Volver
                    </button>
                    <h2 className="text-2xl font-black mb-1" style={{ color: B.dark }}>
                      ¿Cuál era tu número de vuelo?
                    </h2>
                    <p className="text-slate-500 text-sm mb-6">Lo puedes encontrar en tu billete o tarjeta de embarque</p>
                    <div className="relative mb-4">
                      <Plane className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="text" placeholder="Ej: FR4587"
                             value={formData.flightNumber}
                             onChange={e => setFormData(d => ({...d, flightNumber: e.target.value.toUpperCase()}))}
                             className="w-full pl-12 pr-4 py-4 rounded-xl border-2 text-lg font-bold focus:outline-none transition-all"
                             style={{
                               borderColor: formData.flightNumber ? B.primary : '#e2e8f0',
                               color: B.dark,
                             }} />
                    </div>
                    <button onClick={() => formData.flightNumber && setStep(2)}
                            disabled={!formData.flightNumber}
                            className="w-full py-4 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                            style={gradBtn}>
                      Continuar <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* STEP 2 — Billete */}
                {step === 2 && (
                  <div className="animate-fadeIn">
                    <button onClick={() => setStep(1)}
                            className="flex items-center gap-1 text-sm font-semibold mb-5 hover:underline"
                            style={{ color: B.primary }}>
                      <ArrowLeft className="w-4 h-4" /> Volver
                    </button>
                    <h2 className="text-2xl font-black mb-1" style={{ color: B.dark }}>
                      Sube tu tarjeta de embarque
                    </h2>
                    <p className="text-slate-500 text-sm mb-6">Formato PDF, PNG o JPG — la procesaremos automáticamente</p>
                    <input ref={fileInputRef} type="file" accept=".pdf,.png,.jpg,.jpeg"
                           onChange={handleFileSelect} className="hidden" />
                    <div className="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all hover:bg-teal-50/40"
                         style={{ borderColor: formData.file ? B.primary : '#cbd5e1' }}
                         onClick={() => fileInputRef.current?.click()}>
                      {!formData.file ? (
                        <>
                          <Upload className="w-10 h-10 mx-auto mb-3 text-slate-400" />
                          <p className="font-bold text-slate-700 mb-1">Arrastra tu archivo aquí</p>
                          <p className="text-sm text-slate-400">o haz clic para seleccionar</p>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                               style={{ background: B.primary }}>
                            <CheckCircle2 className="w-7 h-7 text-white" />
                          </div>
                          <p className="font-bold mb-1" style={{ color: B.primary }}>¡Archivo subido!</p>
                          <p className="text-sm text-slate-500">{formData.file}</p>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 3 — Incidencia */}
                {step === 3 && (
                  <div className="animate-fadeIn">
                    <button onClick={() => setStep(2)}
                            className="flex items-center gap-1 text-sm font-semibold mb-5 hover:underline"
                            style={{ color: B.primary }}>
                      <ArrowLeft className="w-4 h-4" /> Volver
                    </button>
                    <h2 className="text-2xl font-black mb-1" style={{ color: B.dark }}>
                      ¿Qué problema tuviste?
                    </h2>
                    <p className="text-slate-500 text-sm mb-6">Selecciona el tipo de incidencia</p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {issues.map(issue => (
                        <button key={issue.id}
                                onClick={() => setFormData(d => ({...d, issue: issue.id}))}
                                className="p-5 rounded-2xl border-2 text-left transition-all hover:scale-[1.02] hover:shadow-md"
                                style={{
                                  borderColor: formData.issue === issue.id ? B.primary : '#f1f5f9',
                                  background:  formData.issue === issue.id ? B.light : 'white',
                                }}>
                          <div className="text-3xl mb-2">{issue.icon}</div>
                          <div className="font-bold text-slate-800 mb-0.5">{issue.label}</div>
                          <div className="text-xs font-semibold" style={{ color: B.primary }}>
                            {issue.min}€ – {issue.max}€
                          </div>
                        </button>
                      ))}
                    </div>
                    <button onClick={handleSubmit}
                            disabled={!formData.issue}
                            className="w-full py-4 rounded-xl text-white font-black text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                            style={gradBtn}>
                      Comprobar mi compensación <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="bg-white rounded-3xl p-16 border text-center animate-fadeIn"
                 style={{ boxShadow: `0 24px 64px ${B.shadow}`, borderColor: `${B.primary}20` }}>
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full border-4" style={{ borderColor: `${B.primary}20` }} />
                <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
                     style={{ borderColor: B.primary, borderTopColor: 'transparent' }} />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: B.dark }}>Analizando tu reclamación...</h3>
              <p className="text-slate-500">Validando tu vuelo y calculando tu compensación</p>
            </div>
          )}

          {/* RESULT */}
          {showResult && !loading && (
            <div className="animate-fadeIn rounded-3xl overflow-hidden border"
                 style={{ borderColor: `${B.primary}30`, boxShadow: `0 24px 64px ${B.shadow}` }}>
              {/* Header verde */}
              <div className="p-8 text-center" style={{ background: `linear-gradient(135deg, ${B.primary} 0%, ${B.dark} 100%)` }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center animate-scaleIn">
                  <CheckCircle2 className="w-9 h-9 text-white" />
                </div>
                <h2 className="text-2xl font-black text-white mb-3">¡Tu vuelo puede optar a compensación!</h2>
                <div className="inline-block px-6 py-3 rounded-2xl bg-white/20 backdrop-blur">
                  <div className="text-white/75 text-xs font-semibold mb-1 uppercase tracking-wide">Compensación estimada</div>
                  <div className="text-4xl font-black text-white">{comp}</div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white px-8 pt-7 pb-2">
                <h3 className="font-black text-sm uppercase tracking-wide mb-5" style={{ color: B.dark }}>
                  Estado de tu reclamación
                </h3>
                {[
                  { label: 'Validación inicial',              status: 'done',    time: 'Completado' },
                  { label: 'Reclamación enviada a aerolínea', status: 'done',    time: 'Hoy' },
                  { label: 'Seguimiento activo',              status: 'active',  time: 'En proceso' },
                  { label: 'Resolución y pago',               status: 'pending', time: '14-30 días' },
                ].map((item, idx, arr) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.status === 'active' ? 'animate-pulse' : ''}`}
                           style={{
                             background: item.status === 'pending' ? '#f1f5f9' : B.primary,
                             color: item.status === 'pending' ? '#94a3b8' : 'white',
                           }}>
                        {item.status === 'done'    && <CheckCircle2 className="w-4 h-4" />}
                        {item.status === 'active'  && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                        {item.status === 'pending' && <div className="w-2 h-2 rounded-full bg-slate-300" />}
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="w-0.5 h-7 mt-1 rounded-full"
                             style={{ background: item.status === 'done' ? B.primary : '#e2e8f0' }} />
                      )}
                    </div>
                    <div className="pt-1.5 pb-5">
                      <div className="font-bold text-slate-800 text-sm">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-8 pb-8">
                <div className="flex items-center gap-2 p-3.5 rounded-xl text-sm mb-5" style={{ background: B.light }}>
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: B.primary }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <span style={{ color: B.dark }} className="font-semibold">
                    Te hemos enviado un enlace de seguimiento a tu correo
                  </span>
                </div>
                <button onClick={reset}
                        className="w-full py-4 rounded-xl text-white font-black text-base transition-all hover:scale-[1.02] hover:shadow-xl"
                        style={gradBtn}>
                  Hacer otra reclamación
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      )}

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="border-t" style={{ borderColor: `${B.primary}18`, background: B.lighter }}>
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src="/defendme_logo.png" alt="DefendMe" className="w-7 h-7" />
            <span className="font-black text-lg" style={{ color: B.dark }}>
              defend<span style={{ color: B.primary }}>Me</span>
            </span>
          </div>
          <p className="text-sm text-slate-500">© 2026 DefendMe. Todos los derechos reservados.</p>
          <p className="text-xs text-slate-400 mt-1">Protegiendo tus derechos como pasajero ✈️</p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.85); }    to { opacity:1; transform:scale(1); } }
        .animate-fadeIn  { animation: fadeIn  0.5s ease-out both; }
        .animate-slideUp { animation: slideUp 0.7s ease-out both; }
        .animate-scaleIn { animation: scaleIn 0.4s ease-out both; }
      `}</style>
    </div>
  );
}
