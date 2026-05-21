'use client'

import { useState, useEffect, useRef, Suspense, ReactNode } from 'react'
import Image from 'next/image'

// ─── CONFIGURAR ESTES VALORES ──────────────────────────────────────────────────
const CHECKOUT_ANUAL_URL  = 'https://clkdmg.site/subscribe/oto-anual-fssflix'
const CHECKOUT_MENSAL_URL = 'https://clkdmg.site/subscribe/oto-mensal-fssflix'
const YOUTUBE_PLAYLIST_URL = 'https://www.youtube.com/playlist?list=PLzJ4B1s6bJZ2DL9jhvEgx2ANhwi6LiQk_'
// ──────────────────────────────────────────────────────────────────────────────

/* ────────────────────────────────────────────
   INTERSECTION OBSERVER HOOK
───────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(entry.target) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function FadeUp({ children, delay = 0, style = {} }: { children: ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
function IconArrow() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function IconYouTube() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
}
function IconCheck() {
  return <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}><circle cx="10" cy="10" r="10" fill="rgba(224,21,21,0.1)"/><path d="M6 10.5L8.8 13L14 7" stroke="#E01515" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

/* ─────────────────────────────────────────────
   NAVBAR — começa sobre fundo escuro
───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  // hero section height ≈ 100vh; após passar disso o fundo fica claro
  const DARK_HERO_PX = 560
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > DARK_HERO_PX)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)',
      backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(10,10,10,0.6)',
      backdropFilter: 'blur(14px)',
      transition: 'all 0.35s',
    }}>
      <div className="section-container" style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src="/logo-fss-branco.png" alt="Full Sales System" style={{ height: 36, width: 'auto', display: 'block', filter: scrolled ? 'brightness(0)' : 'none' }} />
        <a
          href={CHECKOUT_ANUAL_URL}
          className="btn-primary"
          style={{ fontSize: 13, padding: '9px 20px' }}
        >
          Garantir Acesso <IconArrow />
        </a>
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────────
   NOTIFICATION BAR — confirmação de aplicação
───────────────────────────────────────────── */
function NotificationBar() {
  return (
    <div style={{
      position: 'relative',
      zIndex: 2,
      background: '#E01515',
      color: '#FFFFFF',
      padding: '14px 20px',
      textAlign: 'center',
      fontSize: 'clamp(13px, 1.6vw, 16px)',
      fontWeight: 800,
      letterSpacing: '0.01em',
      lineHeight: 1.4,
      textTransform: 'uppercase',
    }}>
      Sua aplicação foi recebida. Nosso time entrará em contato em breve para agendar sua reunião de diagnóstico.
    </div>
  )
}

/* ─────────────────────────────────────────────
   ACADEMY HERO — dark, com pricing
───────────────────────────────────────────── */
function AcademyHeroSection() {
  return (
    <section style={{ paddingTop: 64, paddingBottom: 96, position: 'relative', overflow: 'hidden', backgroundImage: 'url(/background-fss.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <NotificationBar />
      {/* overlay escuro sobre o background */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,10,30,0.72)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', maxWidth: 860, textAlign: 'center', paddingTop: 72 }}>
        <FadeUp>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.65,
            maxWidth: 680,
            margin: '0 auto 16px',
          }}>
            Enquanto isso, use esse tempo a seu favor...
          </p>

          <h1 style={{
            fontSize: 'clamp(22px, 3.4vw, 40px)',
            fontWeight: 900,
            lineHeight: 1.14,
            letterSpacing: '-0.025em',
            color: '#FFFFFF',
            marginBottom: 20,
          }}>
            o Full Sales Academy reúne tudo que você precisa para{' '}
            <span style={{ color: '#E01515' }}>dominar vendas e estruturar uma operação comercial</span>
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.65,
            maxWidth: 680,
            margin: '0 auto 52px',
          }}>
            Scripts, playbooks, ferramentas de gestão, cursos de liderança e muito mais — o mesmo conteúdo que já estruturou o comercial de mais de{' '}
            <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>600 empresas</span>, agora acessível para você aplicar hoje.
          </p>

          {/* Pricing card — somente anual */}
          <div style={{ maxWidth: 360, margin: '0 auto 32px' }}>
            {/* Anual */}
            <div style={{
              background: 'linear-gradient(145deg, rgba(224,21,21,0.18) 0%, rgba(30,82,232,0.12) 100%)',
              border: '1px solid rgba(224,21,21,0.45)',
              borderRadius: 18,
              padding: '32px 24px 24px',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                background: '#E01515', color: '#fff', fontSize: 11, fontWeight: 800,
                padding: '4px 16px', borderRadius: 100, letterSpacing: '0.06em',
                whiteSpace: 'nowrap', textTransform: 'uppercase',
              }}>
                Melhor valor
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Acesso Anual</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, justifyContent: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#fff', alignSelf: 'flex-start', marginTop: 8 }}>R$</span>
                <span style={{ fontSize: 'clamp(42px, 7vw, 54px)', fontWeight: 900, color: '#fff', lineHeight: 1 }}>597</span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 24 }}>à vista · equivale a R$49,75/mês</div>
              <a href={CHECKOUT_ANUAL_URL} className="btn-primary" style={{ width: '100%', fontSize: 14, padding: '13px 16px', display: 'flex', justifyContent: 'center', boxSizing: 'border-box' as const }}>
                Garantir Acesso Anual <IconArrow />
              </a>
            </div>
          </div>

          {/* micro trust */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', alignItems: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="rgba(224,21,21,0.2)"/><path d="M4 7.2L6.1 9.2L10 5" stroke="#E01515" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Acesso imediato</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="rgba(224,21,21,0.2)"/><path d="M4 7.2L6.1 9.2L10 5" stroke="#E01515" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>+600 empresas estruturadas</span>
            </div>
          </div>
        </FadeUp>
      </div>

      <style>{`@media(max-width:540px){#academy-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}


/* ─────────────────────────────────────────────
   QUEM CONFIA NA FSS
───────────────────────────────────────────── */

const clientLogos = [
  { src: '/cliente-ajs.png',       name: 'AJS' },
  { src: '/cliente-dm.png',        name: 'DM' },
  { src: '/cliente-hotelaria.png', name: 'Hotelaria' },
  { src: '/cliente-instituto.png', name: 'Instituto' },
  { src: '/cliente-kaizen.png',    name: 'Kaizen' },
  { src: '/cliente-maximus.png',   name: 'Maximus' },
  { src: '/cliente-mbi.png',       name: 'MBI' },
  { src: '/cliente-mental.png',    name: 'Mental One' },
  { src: '/cliente-perpetuo.png',  name: 'Perpétuo' },
  { src: '/cliente-positiva.png',  name: 'Positiva' },
  { src: '/cliente-salvus.png',    name: 'Salvus' },
  { src: '/cliente-taugor.png',    name: 'Taugor' },
  { src: '/cliente-ticto.png',     name: 'Ticto' },
  { src: '/cliente-tio.png',       name: 'Tio' },
]
const areas1 = [
  { icon: '🏢', text: 'Empresarial' },
  { icon: '📢', text: 'Marketing' },
  { icon: '🎤', text: 'Eventos' },
  { icon: '⚕️', text: 'Médicos' },
  { icon: '💡', text: 'Mentoria / Consultoria' },
  { icon: '⚖️', text: 'Advocacia' },
  { icon: '🏪', text: 'Franquia' },
  { icon: '💰', text: 'Financeiro' },
  { icon: '🎨', text: 'Branding / Posicionamento' },
  { icon: '🏭', text: 'Serviços / Indústria' },
]
const areas2 = [
  { icon: '💬', text: 'Comercial' },
  { icon: '📊', text: 'Contábil / Tributário' },
  { icon: '💆', text: 'Saúde Estética' },
  { icon: '☁️', text: 'SAAS (Software as Service)' },
  { icon: '⚡', text: 'Energia Solar' },
  { icon: '💻', text: 'Software House' },
  { icon: '📱', text: 'Mercado Digital' },
  { icon: '📡', text: 'Comunicação' },
  { icon: '🏗️', text: 'Civil / Imobiliário' },
  { icon: '🎓', text: 'Educação' },
]

/* ─────────────────────────────────────────────
   MÓDULOS DO ACADEMY
───────────────────────────────────────────── */
const academyModules = [
  { icon: '🎯', title: 'Prospecção ativa' },
  { icon: '🔍', title: 'Qualificação de leads' },
  { icon: '📝', title: 'Roteiros e Scripts' },
  { icon: '💬', title: 'Objeções e Negociação' },
  { icon: '🤝', title: 'Fechamento de vendas' },
  { icon: '📞', title: 'Follow-up estruturado' },
  { icon: '📊', title: 'Gestão de Pipeline' },
  { icon: '📈', title: 'Métricas e KPIs' },
  { icon: '🧭', title: 'Liderança Comercial' },
  { icon: '🧲', title: 'Recrutamento de Vendedores' },
  { icon: '🚀', title: 'Onboarding e Ramp-up' },
  { icon: '📚', title: 'Playbooks Operacionais' },
  { icon: '🔮', title: 'Forecast e Previsibilidade' },
  { icon: '♟️', title: 'Estratégia Comercial' },
]

function ModulesSection() {
  return (
    <section className="section-pad" style={{ background: '#FFFFFF' }}>
      <div className="section-container">
        <FadeUp style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#0A0A0A', lineHeight: 1.12 }}>
            Mais de 14 módulos, cursos e ferramentas práticas no mesmo lugar
          </h2>
          <p style={{ color: '#6B7280', fontSize: 16, marginTop: 12, maxWidth: 640, margin: '12px auto 0', lineHeight: 1.6 }}>
            Cada conteúdo foi criado para resolver um ponto específico da sua operação comercial. Veja o que você acessa hoje:
          </p>
        </FadeUp>

        <FadeUp delay={80}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {academyModules.map((m, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 12,
                padding: '16px 18px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}>
                <span style={{ fontSize: 22, lineHeight: 1 }}>{m.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0A0A0A', lineHeight: 1.35 }}>{m.title}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   FULL SALES FLIX
───────────────────────────────────────────── */
const flixFeatures = [
  { icon: '📘', title: 'Playbooks prontos', desc: 'Modelos operacionais para aplicar direto na sua empresa.' },
  { icon: '🎬', title: 'Análises de call reais', desc: 'Casos comentados por Yuri Barbosa com diagnósticos precisos.' },
  { icon: '🗺️', title: 'Guias práticos', desc: 'Passo a passo detalhado para cada etapa do processo comercial.' },
  { icon: '🎤', title: 'Workshops exclusivos', desc: 'Encontros com especialistas convidados e conteúdo novo toda semana.' },
]

function FlixSection() {
  return (
    <section className="section-pad" style={{ background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 20%, rgba(224,21,21,0.14) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(30,82,232,0.12) 0%, transparent 55%)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative' }}>
        <FadeUp style={{ textAlign: 'center', marginBottom: 40, maxWidth: 720, margin: '0 auto 40px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#E01515', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>
            Full Sales Flix
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#FFFFFF', lineHeight: 1.14 }}>
            Além dos cursos, você ainda acessa o{' '}
            <span style={{ color: '#E01515' }}>Full Sales Flix</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(15px, 2vw, 17px)', lineHeight: 1.65, marginTop: 14 }}>
            Uma biblioteca completa com playbooks, estudos de caso, guias práticos e workshops com especialistas. Conteúdo novo sendo adicionado regularmente.
          </p>
        </FadeUp>

        <FadeUp delay={80}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {flixFeatures.map((f, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14,
                padding: '24px 22px',
              }}>
                <div style={{ fontSize: 28, lineHeight: 1, marginBottom: 14 }}>{f.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 6 }}>{f.title}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.55 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function TrustSection() {
  return (
    <section className="section-pad" style={{ background: '#F5F6F8' }}>
      <div className="section-container">
        <FadeUp style={{ textAlign: 'center', marginBottom: 52 }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#0A0A0A', lineHeight: 1.12 }}>
            O mesmo método que estruturou mais de 600 operações comerciais agora está disponível para você
          </h2>
          <p style={{ color: '#6B7280', fontSize: 16, marginTop: 12, maxWidth: 620, margin: '12px auto 0' }}>
            De escritórios de advocacia a empresas de tecnologia, o sistema funciona independente do segmento.
          </p>
        </FadeUp>
        <FadeUp delay={80}>
          <div style={{ overflow: 'hidden', marginBottom: 56, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #fff, transparent)', zIndex: 1, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #fff, transparent)', zIndex: 1, pointerEvents: 'none' }} />
            <div className="marquee-track">
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div key={i} style={{ flexShrink: 0, width: 160, height: 72, background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.09)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginRight: 12 }}>
                  <Image src={logo.src} alt={logo.name} width={136} height={48} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={120}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h3 style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 700, color: '#0A0A0A' }}>
              Áreas que <strong>já implementamos o nosso processo comercial</strong>
            </h3>
          </div>
          <style>{`
            @keyframes fss-left { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50% - 8px)); } }
            @keyframes fss-right { 0% { transform: translateX(calc(-50% - 8px)); } 100% { transform: translateX(0); } }
            .fss-row { display:flex; gap:14px; width:max-content; }
            .fss-row-1 { animation: fss-left 28s linear infinite; }
            .fss-row-2 { animation: fss-right 28s linear infinite; }
            .fss-overflow { overflow:hidden; width:100%; position:relative; padding: 6px 0; }
            .fss-card { display:inline-flex; align-items:center; gap:10px; background:#1a1a1a; color:#fff; padding:12px 20px; border-radius:10px; white-space:nowrap; flex-shrink:0; font-size:14px; font-weight:500; }
          `}</style>
          <div className="fss-overflow">
            <div className="fss-row fss-row-1">
              {[...areas1, ...areas1].map((a, i) => (
                <div key={i} className="fss-card"><span>{a.icon}</span><span>{a.text}</span></div>
              ))}
            </div>
          </div>
          <div className="fss-overflow" style={{ marginTop: 12 }}>
            <div className="fss-row fss-row-2">
              {[...areas2, ...areas2].map((a, i) => (
                <div key={i} className="fss-card"><span>{a.icon}</span><span>{a.text}</span></div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SOBRE A FSS
───────────────────────────────────────────── */
function AboutSection() {
  return (
    <section className="section-pad" style={{ background: '#FFFFFF' }}>
      <div className="section-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 56, alignItems: 'center' }}>
          {/* Photo */}
          <FadeUp>
            <div style={{
              width: '100%', maxWidth: 420, aspectRatio: '4/5',
              borderRadius: 16, position: 'relative', overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            }}>
              <Image
                src="/socios.png"
                alt="Sócios FSS"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)', pointerEvents: 'none' }} />
            </div>
          </FadeUp>

          {/* Bio */}
          <FadeUp delay={120}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#0A0A0A', lineHeight: 1.18, marginBottom: 16 }}>
              A metodologia que gerou mais de{' '}
              <span style={{ color: '#E01515' }}>R$1 bilhão</span>{' '}
              para empresas — condensada em uma plataforma acessível
            </h2>
            <p style={{ fontSize: 15, color: '#525252', lineHeight: 1.7, marginBottom: 24 }}>
              Fundada por Vinícius de Sá, Yuri Barbosa e Matheus Garcia, a Full Sales System tem mais de 8 anos estruturando operações comerciais. O Full Sales Academy reúne esse mesmo conhecimento em conteúdos práticos que você aplica a partir de hoje.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {[
                'Mais de 600 empresas aceleradas no Brasil, Portugal e EUA em segmentos como advocacia, contabilidade, saúde e tech',
                'Mais de R$1 bilhão em faturamento gerado para empresas aceleradas e mais de R$110 milhões em vendas próprias',
                'NPS de 87 e nota de avaliação 9,44 com foco em resultado real, não só em conteúdo',
                'Metodologia própria de 6 pilares que ativa todos os canais de receita da operação comercial',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <IconCheck />
                  <p style={{ fontSize: 14, color: '#525252', lineHeight: 1.55 }}>{item}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SESSÃO DE IMPRENSA
───────────────────────────────────────────── */

const pressItems = [
  {
    outlet: 'Estadão',
    title: 'Full Sales System: três mentes empreendedoras que transformaram desafios em estratégias',
    quote: 'Nos últimos anos, ajudamos os nossos clientes a girar mais de 500 milhões de faturamento em vendas. Mas quando olhamos para esses números enxergamos algo ainda maior: não foi só o aumento nas vendas, mas eles se tornaram protagonistas da própria empresa.',
    image: '/estadao.webp',
  },
  {
    outlet: 'Valor Econômico',
    title: 'Full Sales System aponta o caminho para crescer em 2026 com estratégias mais inteligentes',
    quote: 'Empresas que adotam estruturas de vendas inteligentes e estratégias orgânicas robustas tendem a prosperar em cenários de incerteza, criando vantagem competitiva mesmo com menor investimento direto em mídia.',
    image: '/valor-economico.webp',
  },
  {
    outlet: 'Pequenas Empresas & Grandes Negócios',
    title: 'Yuri Barbosa, Vinícius de Sá e Matheus Garcia trilharam caminhos distintos, mas marcados pelo mesmo ponto de virada',
    quote: 'Os sócios desenvolveram uma metodologia própria, capaz de integrar processos comerciais eficientes, automação estratégica e construção de autoridade digital. O objetivo não era apenas aumentar vendas, mas criar um modelo de crescimento consistente.',
    image: '/pequenas-empresas.webp',
  },
]

const pressLogos = [
  { name: 'Valor Econômico', src: '/press-valor-economico.png', bg: '#FFFFFF', scale: 1.2 },
  { name: 'Pequenas Empresas & Grandes Negócios', src: '/press-pequenas-empresas.png', bg: '#D35400', scale: 2.3 },
  { name: 'Band', src: '/press-band.png', bg: '#1A1A1A', scale: 1 },
  { name: 'Estadão', src: '/estadao-novo.png', bg: '#FFFFFF', scale: 2.0 },
  { name: 'Terra', src: '/press-terra.png', bg: '#FFFFFF', scale: 1.0 },
]

function PressSection() {
  return (
    <section className="section-pad" style={{ background: '#F5F6F8' }}>
      <div className="section-container">
        <FadeUp style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#0A0A0A', lineHeight: 1.12 }}>
            Full Sales System na Mídia
          </h2>
          <p style={{ color: '#6B7280', fontSize: 16, marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>
            O reconhecimento do mercado sobre quem criou o método que você está prestes a acessar.
          </p>
        </FadeUp>

        {/* Press logos strip — desktop: flex wrap | mobile: marquee */}
        <FadeUp delay={60}>
          {/* Desktop */}
          <div id="press-logos-desktop" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 48 }}>
            {pressLogos.map((logo, i) => (
              <div key={i} style={{ height: 72, width: 180, background: logo.bg, border: '1px solid rgba(0,0,0,0.09)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <Image src={logo.src} alt={logo.name} width={156} height={48} style={{ objectFit: 'contain', width: '100%', height: '100%', transform: `scale(${logo.scale})`, transformOrigin: 'center center' }} />
              </div>
            ))}
          </div>
          {/* Mobile: marquee carousel */}
          <div id="press-logos-mobile" style={{ overflow: 'hidden', marginBottom: 48, position: 'relative', display: 'none' }}>
            <div className="marquee-track" style={{ animationDuration: '18s' }}>
              {[...pressLogos, ...pressLogos].map((logo, i) => (
                <div key={i} style={{ flexShrink: 0, height: 64, width: 150, background: logo.bg, border: '1px solid rgba(0,0,0,0.09)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginRight: 12 }}>
                  <Image src={logo.src} alt={logo.name} width={130} height={44} style={{ objectFit: 'contain', width: '100%', height: '100%', transform: `scale(${logo.scale})`, transformOrigin: 'center center' }} />
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Press quote cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {pressItems.map((item, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className="card" style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Imagem no topo */}
                <div style={{ width: '100%', aspectRatio: '16/7', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                  <Image
                    src={item.image}
                    alt={item.outlet}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
                {/* Conteúdo */}
                <div style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ fontSize: 28, color: '#E01515', fontWeight: 900, lineHeight: 1, marginBottom: 8, fontFamily: 'Georgia, serif' }}>"</div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#0A0A0A', lineHeight: 1.4, marginBottom: 10 }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.65, marginBottom: 16, fontStyle: 'italic', flexGrow: 1 }}>
                    {item.quote}
                  </p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.outlet}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          #press-logos-desktop { display: none !important; }
          #press-logos-mobile { display: block !important; }
        }
      `}</style>
    </section>
  )
}

/* ─────────────────────────────────────────────
   OFERTA
───────────────────────────────────────────── */
const offerIncludes = [
  'Mais de 14 módulos e cursos completos do Full Sales Academy',
  'Acesso completo ao Full Sales Flix e sua biblioteca de playbooks e guias',
  'Workshops exclusivos com especialistas convidados',
  'Análises de call reais comentadas por Yuri Barbosa',
  'Diagnósticos de negócios ao vivo com Vinícius de Sá',
  'Atualizações e novos conteúdos incluídos sem custo adicional',
  'Acesso imediato após a confirmação do pagamento',
]

function OfferSection() {
  return (
    <section className="section-pad" style={{ position: 'relative', overflow: 'hidden', backgroundImage: 'url(/background-fss.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,10,30,0.78)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 20%, rgba(224,21,21,0.14) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(30,82,232,0.12) 0%, transparent 55%)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ position: 'relative', maxWidth: 960 }}>
        <FadeUp style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(22px, 3.2vw, 36px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#FFFFFF', lineHeight: 1.12 }}>
            Garanta seu acesso ao{' '}
            <span style={{ color: '#E01515' }}>Full Sales Academy</span>{' '}
            agora
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(15px, 2vw, 17px)', lineHeight: 1.65, marginTop: 14, maxWidth: 580, margin: '14px auto 0' }}>
            Tudo que você precisa para estruturar, evoluir e dominar o processo comercial — em um único lugar, por um único preço.
          </p>
        </FadeUp>

        <FadeUp delay={80}>
          <div style={{
            background: 'linear-gradient(145deg, rgba(224,21,21,0.14) 0%, rgba(30,82,232,0.10) 100%)',
            border: '1px solid rgba(224,21,21,0.35)',
            borderRadius: 20,
            padding: 'clamp(28px, 4vw, 44px)',
            position: 'relative',
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{
              position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
              background: '#E01515', color: '#fff', fontSize: 11, fontWeight: 800,
              padding: '4px 16px', borderRadius: 100, letterSpacing: '0.06em',
              whiteSpace: 'nowrap', textTransform: 'uppercase',
            }}>
              Oferta especial
            </div>

            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>
                Acesso Anual
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 6 }}>
                De <span style={{ textDecoration: 'line-through' }}>R$1.164</span> por apenas
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, justifyContent: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#fff', alignSelf: 'flex-start', marginTop: 10 }}>R$</span>
                <span style={{ fontSize: 'clamp(54px, 9vw, 76px)', fontWeight: 900, color: '#fff', lineHeight: 1 }}>597</span>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                à vista — equivale a R$49,75/mês
              </div>
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '4px 0 24px' }} />

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                O que está incluso:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {offerIncludes.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                      <circle cx="10" cy="10" r="10" fill="rgba(224,21,21,0.18)" />
                      <path d="M6 10.5L8.8 13L14 7" stroke="#E01515" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.82)', lineHeight: 1.55 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <a href={CHECKOUT_ANUAL_URL} className="btn-primary" style={{ width: '100%', fontSize: 15, padding: '16px 20px', display: 'flex', justifyContent: 'center', boxSizing: 'border-box' as const }}>
              Garantir Acesso Anual — R$597 <IconArrow />
            </a>

            <p style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
              Pagamento seguro. Acesso imediato. Cancele quando quiser.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   FOOTER (dark)
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '56px 0 40px' }}>
      <div className="section-container">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 40, marginBottom: 48 }}>
          <div style={{ maxWidth: 300 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <img src="/logo-fss-branco.png" alt="Full Sales System" style={{ height: 40, width: 'auto', display: 'block' }} />
            </div>
            <p style={{ fontSize: 14, color: '#71717A', lineHeight: 1.65 }}>
              Estruturação comercial para empresas que já faturam e querem crescer com processo e previsibilidade.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#71717A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>Academy</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href={CHECKOUT_ANUAL_URL} style={{ fontSize: 14, color: '#A1A1AA', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = '#A1A1AA')}>Garantir Acesso Anual — R$597</a>
                <a href={CHECKOUT_MENSAL_URL} style={{ fontSize: 14, color: '#A1A1AA', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = '#A1A1AA')}>Parcelar em 12× de R$97</a>
                <a href={YOUTUBE_PLAYLIST_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: '#A1A1AA', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = '#A1A1AA')}>YouTube — Comercial Faixa Preta</a>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA strip */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(224,21,21,0.1) 0%, rgba(30,82,232,0.08) 100%)',
          border: '1px solid rgba(224,21,21,0.2)',
          borderRadius: 14, padding: '26px 32px',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20, marginBottom: 36,
        }}>
          <div style={{ flex: '1 1 320px' }}>
            <p style={{ fontWeight: 700, fontSize: 17, color: '#fff', marginBottom: 6 }}>Tudo isso por menos de R$50 por mês</p>
            <p style={{ fontSize: 13, color: '#A1A1AA', lineHeight: 1.55 }}>14+ módulos. Biblioteca completa. Playbooks, análises de call reais e workshops exclusivos. Acesso imediato assim que você garantir sua vaga.</p>
          </div>
          <a href={CHECKOUT_ANUAL_URL} className="btn-primary" style={{ fontSize: 14, padding: '14px 24px' }}>
            Garantir Acesso Anual — R$597 <IconArrow />
          </a>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p style={{ fontSize: 13, color: '#52525B' }}>© {new Date().getFullYear()} Full Sales System. Todos os direitos reservados. CNPJ 51.843.626/0001-09</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              <a href="https://fss.fullsalessystem.com/politicas-de-privacidade" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#52525B', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#A1A1AA')} onMouseLeave={e => (e.currentTarget.style.color = '#52525B')}>Política de Privacidade</a>
              <a href="https://fss.fullsalessystem.com/termos-de-uso" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#52525B', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#A1A1AA')} onMouseLeave={e => (e.currentTarget.style.color = '#52525B')}>Termos de Uso</a>
            </div>
          </div>
          <p style={{ fontSize: 13, color: '#52525B' }}>Feito para quem leva vendas a sério.</p>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
function HomeContent() {
  return (
    <main style={{ backgroundColor: '#F5F6F8', color: '#0A0A0A', overflowX: 'hidden' }}>
      <Navbar />
      <AcademyHeroSection />
      <ModulesSection />
      <FlixSection />
      <TrustSection />
      <OfferSection />
      <AboutSection />
      <PressSection />
      <Footer />
    </main>
  )
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  )
}
