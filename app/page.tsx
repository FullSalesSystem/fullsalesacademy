'use client'

import { useState, useEffect, useRef, Suspense, ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

// ─── CONFIGURAR ESTES VALORES ──────────────────────────────────────────────────
const CHECKOUT_ANUAL_URL  = 'https://clkdmg.site/subscribe/oto-anual-fssflix'
const CHECKOUT_MENSAL_URL = 'https://clkdmg.site/subscribe/oto-mensal-fssflix'
const YOUTUBE_PLAYLIST_URL = 'https://www.youtube.com/playlist?list=PLzJ4B1s6bJZ2DL9jhvEgx2ANhwi6LiQk_'
// ──────────────────────────────────────────────────────────────────────────────

const FORWARDED_PARAMS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'utm_id', 'gclid', 'fbclid', 'gad_source', 'msclkid',
]

function useWithUtms() {
  const params = useSearchParams()
  return (url: string) => {
    if (!params) return url
    const forwarded = new URLSearchParams()
    FORWARDED_PARAMS.forEach(k => {
      const v = params.get(k)
      if (v) forwarded.set(k, v)
    })
    const qs = forwarded.toString()
    if (!qs) return url
    return `${url}${url.includes('?') ? '&' : '?'}${qs}`
  }
}

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
  const withUtms = useWithUtms()
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
        <img src="/assets/logo-fss-branco.png" alt="Full Sales System" loading="lazy" style={{ height: 36, width: 'auto', display: 'block', filter: scrolled ? 'brightness(0)' : 'none' }} />
        <a
          href={withUtms(CHECKOUT_ANUAL_URL)}
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
  const withUtms = useWithUtms()
  return (
    <section style={{ paddingTop: 64, paddingBottom: 96, position: 'relative', overflow: 'hidden', backgroundImage: 'url(/assets/background-fss.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
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
            O Full Sales Academy reúne tudo que você precisa para{' '}
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
              <a href={withUtms(CHECKOUT_ANUAL_URL)} className="btn-primary" style={{ width: '100%', fontSize: 14, padding: '13px 16px', display: 'flex', justifyContent: 'center', boxSizing: 'border-box' as const }}>
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
  { src: '/assets/cliente-ajs.png',       name: 'AJS' },
  { src: '/assets/cliente-dm.png',        name: 'DM' },
  { src: '/assets/cliente-hotelaria.png', name: 'Hotelaria' },
  { src: '/assets/cliente-instituto.png', name: 'Instituto' },
  { src: '/assets/cliente-kaizen.png',    name: 'Kaizen' },
  { src: '/assets/cliente-maximus.png',   name: 'Maximus' },
  { src: '/assets/cliente-mbi.png',       name: 'MBI' },
  { src: '/assets/cliente-mental.png',    name: 'Mental One' },
  { src: '/assets/cliente-perpetuo.png',  name: 'Perpétuo' },
  { src: '/assets/cliente-positiva.png',  name: 'Positiva' },
  { src: '/assets/cliente-salvus.png',    name: 'Salvus' },
  { src: '/assets/cliente-taugor.png',    name: 'Taugor' },
  { src: '/assets/cliente-ticto.png',     name: 'Ticto' },
  { src: '/assets/cliente-tio.png',       name: 'Tio' },
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
  { image: '/assets/academy/vendedor-top-1.png', title: 'Vendedor Top 1', desc: 'Mindset, método e execução para se tornar o top performer da sua área.' },
  { image: '/assets/academy/master-sales-script.png', title: 'Master Sales Script', desc: 'Scripts completos prontos para prospecção, follow-up e fechamento.' },
  { image: '/assets/academy/persuasao-pro.png', title: 'Persuasão Pro', desc: 'Técnicas avançadas de influência, rapport e negociação para fechar mais.' },
  { image: '/assets/academy/workshop-prospeccao-7d.png', title: 'Workshop Prospecção 7D', desc: 'Um plano prático para gerar demanda e encher o funil em 7 dias.' },
  { image: '/assets/academy/intensivo-fechamento-em-reuniao.png', title: 'Intensivo Fechamento em Reunião', desc: 'Como conduzir e fechar reuniões comerciais com consistência.' },
  { image: '/assets/academy/kit-gestao-comercial.png', title: 'Kit de Gestão Comercial', desc: 'Ferramentas e indicadores para quem lidera ou quer liderar um time de vendas.' },
  { image: '/assets/academy/analises-de-call---yuri-barbosa.png', title: 'Análises de Call — Yuri Barbosa', desc: 'Reviews reais de ligações comerciais com feedback ao vivo.' },
  { image: '/assets/academy/raio-x-da-personalidade.png', title: 'Raio X da Personalidade', desc: 'Como adaptar sua abordagem ao perfil de cada cliente e vender mais.' },
  { image: '/assets/academy/lideranca-financeira.png', title: 'Liderança Financeira', desc: 'Como construir inteligência financeira dentro da operação comercial.' },
  { image: '/assets/academy/mapa-da-otimizacao.png', title: 'Mapa da Otimização', desc: 'Como identificar os gargalos que estão travando seu crescimento.' },
  { image: '/assets/academy/desafio-plano-sem-risco-2026---matheus-matuta.png', title: 'Desafio Plano Sem Risco 2026', desc: 'Planejamento comercial prático com metas reais para o ano.' },
  { image: '/assets/academy/a-riqueza-da-necessidade.png', title: 'A Riqueza da Necessidade', desc: 'Como descobrir a dor real do cliente e usá-la como alavanca de venda.' },
  { image: '/assets/academy/eleve-se.png', title: 'Eleve-se', desc: 'Desenvolvimento pessoal e profissional para vendedores de alto nível.' },
  { image: '/assets/academy/analise-de-negocios---vinicius-de-sa.png', title: 'Análises de Negócios — Vinícius de Sá', desc: 'Diagnósticos reais de operações comerciais comentados ao vivo.' },
]

function ModulesSection() {
  return (
    <section className="section-pad" style={{ position: 'relative', overflow: 'hidden', backgroundImage: 'url(/assets/background-fss.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,10,30,0.78)', pointerEvents: 'none' }} />
      <div className="section-container" style={{ position: 'relative' }}>
        <FadeUp style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#FFFFFF', lineHeight: 1.12 }}>
            Mais de 14 módulos, cursos e ferramentas práticas no mesmo lugar
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, marginTop: 12, maxWidth: 640, margin: '12px auto 0', lineHeight: 1.6 }}>
            Cada conteúdo foi criado para resolver um ponto específico da sua operação comercial. Veja o que você acessa hoje:
          </p>
        </FadeUp>

        <FadeUp delay={80}>
          <div className="modules-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 10 }}>
            {academyModules.map((m, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                overflow: 'hidden',
                backdropFilter: 'blur(4px)',
              }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '2/3', background: 'rgba(0,0,0,0.25)' }}>
                  <Image
                    src={m.image}
                    alt={m.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 17vw, 13vw"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div style={{ padding: '8px 10px 10px', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3 }}>{m.title}</div>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', lineHeight: 1.45 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
      <style>{`
        @media (max-width: 1024px) { .modules-grid { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; } }
        @media (max-width: 640px)  { .modules-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
      `}</style>
    </section>
  )
}

/* ─────────────────────────────────────────────
   FULL SALES FLIX
───────────────────────────────────────────── */
const flixItems = [
  { image: '/assets/flix/playbook-estruturacao-comercial-3-0.png', title: 'Playbook Interno de Estruturação Comercial 3.0', desc: 'O guia definitivo para estruturar processos e times comerciais com alto desempenho.' },
  { image: '/assets/flix/script-quebra-objecoes.png', title: 'Script Secreto para Quebra de Objeções', desc: 'Como lidar com as principais objeções e virar o jogo na negociação.' },
  { image: '/assets/flix/guia-social-selling.png', title: 'Guia Prático de Social Selling', desc: 'Como usar redes sociais para gerar oportunidades de venda de forma consistente.' },
  { image: '/assets/flix/estudo-caso-gabriel-bueno.png', title: 'Estudo de Caso: Gabriel Bueno', desc: 'Como um vendedor chegou a 5M de faturamento — análise real, passo a passo.' },
  { image: '/assets/flix/talk-alfredo-soares.png', title: 'Talk com Alfredo Soares', desc: 'Conteúdo exclusivo gravado no Full Sales Experience 2026.' },
  { image: '/assets/flix/workshop-social-selling-thiago-germano.png', title: 'Workshop de Social Selling — Thiago Germano', desc: 'Estratégias práticas de vendas pelas redes sociais.' },
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
          <div className="flix-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 10 }}>
            {flixItems.map((f, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                overflow: 'hidden',
                backdropFilter: 'blur(4px)',
              }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '2/3', background: 'rgba(0,0,0,0.25)' }}>
                  <Image
                    src={f.image}
                    alt={f.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div style={{ padding: '8px 10px 10px', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3 }}>{f.title}</div>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', lineHeight: 1.45 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
      <style>{`
        @media (max-width: 1024px) { .flix-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; } }
        @media (max-width: 640px)  { .flix-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
      `}</style>
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
            .fss-row { display:flex; gap:14px; width:max-content; }
            .fss-row-1 { animation: fss-left 56s linear infinite; }
            .fss-overflow { overflow:hidden; width:100%; position:relative; padding: 6px 0; }
            .fss-card { display:inline-flex; align-items:center; gap:10px; background:#1a1a1a; color:#fff; padding:12px 20px; border-radius:10px; white-space:nowrap; flex-shrink:0; font-size:14px; font-weight:500; }
          `}</style>
          <div className="fss-overflow">
            <div className="fss-row fss-row-1">
              {[...areas1, ...areas2, ...areas1, ...areas2].map((a, i) => (
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
                src="/assets/socios.png"
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

const pressLogos = [
  { name: 'Valor Econômico', src: '/assets/press-valor-economico.png', bg: '#FFFFFF', scale: 1.2, href: 'https://valor.globo.com/patrocinado/pressworks/noticia/2025/11/24/full-sales-system-aponta-o-caminho-para-crescer-em-2026-com-estrategias-mais-inteligentes-1.ghtml' },
  { name: 'Pequenas Empresas & Grandes Negócios', src: '/assets/press-pequenas-empresas.png', bg: '#D35400', scale: 2.3, href: 'https://revistapegn.globo.com/conteudo-de-marca/pressworks/noticia/2025/11/full-sales-system-tres-mentes-empreendedoras-que-transformaram-desafios-em-estrategias-1.ghtml' },
  { name: 'Band', src: '/assets/press-band.png', bg: '#1A1A1A', scale: 1, href: 'https://www.band.com.br/band-vale/noticias/full-sales-system-aponta-o-caminho-para-crescer-com-estrategia-inteligente-202511211836' },
  { name: 'Estadão', src: '/assets/estadao-novo.png', bg: '#FFFFFF', scale: 2.0, href: 'https://bluestudio.estadao.com.br/agencia-de-comunicacao/saftec-digital/full-sales-system-tres-mentes-empreendedoras-que-transformaram-desafios-em-estrategias/' },
  { name: 'Terra', src: '/assets/press-terra.png', bg: '#FFFFFF', scale: 1.0, href: 'https://www.terra.com.br/economia/vendas-que-colocam-sua-empresa-no-protagonismo-full-sales-mostra-o-caminho,f72fe2c2ee9101ee76a02aea5e3eef8c69xd33kv.html' },
]

function PressSection() {
  return (
    <section className="section-pad" style={{ background: '#F5F6F8' }}>
      <div className="section-container">
        <FadeUp style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#0A0A0A', lineHeight: 1.12 }}>
            Full Sales System na Mídia
          </h2>
          <p style={{ color: '#6B7280', fontSize: 16, marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>
            O reconhecimento do mercado sobre quem criou o método que você está prestes a acessar.
          </p>
        </FadeUp>

        <FadeUp delay={60}>
          <div id="press-logos-desktop" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            {pressLogos.map((logo, i) => (
              <a
                key={i}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ler matéria em ${logo.name}`}
                style={{ height: 72, width: 180, background: logo.bg, border: '1px solid rgba(0,0,0,0.09)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.10)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)' }}
              >
                <Image src={logo.src} alt={logo.name} width={156} height={48} style={{ objectFit: 'contain', width: '100%', height: '100%', transform: `scale(${logo.scale})`, transformOrigin: 'center center' }} />
              </a>
            ))}
          </div>
          <div id="press-logos-mobile" style={{ overflow: 'hidden', position: 'relative', display: 'none' }}>
            <div className="marquee-track" style={{ animationDuration: '18s' }}>
              {[...pressLogos, ...pressLogos].map((logo, i) => (
                <a
                  key={i}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ler matéria em ${logo.name}`}
                  style={{ flexShrink: 0, height: 64, width: 150, background: logo.bg, border: '1px solid rgba(0,0,0,0.09)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginRight: 12, textDecoration: 'none' }}
                >
                  <Image src={logo.src} alt={logo.name} width={130} height={44} style={{ objectFit: 'contain', width: '100%', height: '100%', transform: `scale(${logo.scale})`, transformOrigin: 'center center' }} />
                </a>
              ))}
            </div>
          </div>
          <p style={{ textAlign: 'center', color: '#6B7280', fontSize: 14, marginTop: 20 }}>
            Clique aqui para ver as matérias na íntegra
          </p>
        </FadeUp>
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
  const withUtms = useWithUtms()
  return (
    <section className="section-pad" style={{ position: 'relative', overflow: 'hidden', backgroundImage: 'url(/assets/background-fss.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
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

            <a href={withUtms(CHECKOUT_ANUAL_URL)} className="btn-primary" style={{ width: '100%', fontSize: 15, padding: '16px 20px', display: 'flex', justifyContent: 'center', boxSizing: 'border-box' as const }}>
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
  const withUtms = useWithUtms()
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '56px 0 40px' }}>
      <div className="section-container">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 40, marginBottom: 48 }}>
          <div style={{ maxWidth: 300 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <img src="/assets/logo-fss-branco.png" alt="Full Sales System" loading="lazy" style={{ height: 40, width: 'auto', display: 'block' }} />
            </div>
            <p style={{ fontSize: 14, color: '#71717A', lineHeight: 1.65 }}>
              Estruturação comercial para empresas que já faturam e querem crescer com processo e previsibilidade.
            </p>
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
          <a href={withUtms(CHECKOUT_ANUAL_URL)} className="btn-primary" style={{ fontSize: 14, padding: '14px 24px' }}>
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
