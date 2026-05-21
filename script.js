// ── URLs DE CHECKOUT ──
const CHECKOUT_ANUAL_URL  = 'https://clkdmg.site/subscribe/oto-anual-fssflix'
const CHECKOUT_MENSAL_URL = 'https://clkdmg.site/subscribe/oto-mensal-fssflix'

// ── PARÂMETROS UTM ──
const FORWARDED_PARAMS = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','utm_id','gclid','fbclid','gad_source','msclkid']

function withUtms(url) {
  const params = new URLSearchParams(window.location.search)
  const forwarded = new URLSearchParams()
  FORWARDED_PARAMS.forEach(k => { const v = params.get(k); if (v) forwarded.set(k, v) })
  const qs = forwarded.toString()
  if (!qs) return url
  return url + (url.includes('?') ? '&' : '?') + qs
}

// ── DADOS ──
const academyModules = [
  { image: 'public/academy/vendedor-top-1.png', title: 'Vendedor Top 1', desc: 'Mindset, método e execução para se tornar o top performer da sua área.' },
  { image: 'public/academy/master-sales-script.png', title: 'Master Sales Script', desc: 'Scripts completos prontos para prospecção, follow-up e fechamento.' },
  { image: 'public/academy/persuasao-pro.png', title: 'Persuasão Pro', desc: 'Técnicas avançadas de influência, rapport e negociação para fechar mais.' },
  { image: 'public/academy/workshop-prospeccao-7d.png', title: 'Workshop Prospecção 7D', desc: 'Um plano prático para gerar demanda e encher o funil em 7 dias.' },
  { image: 'public/academy/intensivo-fechamento-em-reuniao.png', title: 'Intensivo Fechamento em Reunião', desc: 'Como conduzir e fechar reuniões comerciais com consistência.' },
  { image: 'public/academy/kit-gestao-comercial.png', title: 'Kit de Gestão Comercial', desc: 'Ferramentas e indicadores para quem lidera ou quer liderar um time de vendas.' },
  { image: 'public/academy/analises-de-call---yuri-barbosa.png', title: 'Análises de Call — Yuri Barbosa', desc: 'Reviews reais de ligações comerciais com feedback ao vivo.' },
  { image: 'public/academy/raio-x-da-personalidade.png', title: 'Raio X da Personalidade', desc: 'Como adaptar sua abordagem ao perfil de cada cliente e vender mais.' },
  { image: 'public/academy/lideranca-financeira.png', title: 'Liderança Financeira', desc: 'Como construir inteligência financeira dentro da operação comercial.' },
  { image: 'public/academy/mapa-da-otimizacao.png', title: 'Mapa da Otimização', desc: 'Como identificar os gargalos que estão travando seu crescimento.' },
  { image: 'public/academy/desafio-plano-sem-risco-2026---matheus-matuta.png', title: 'Desafio Plano Sem Risco 2026', desc: 'Planejamento comercial prático com metas reais para o ano.' },
  { image: 'public/academy/a-riqueza-da-necessidade.png', title: 'A Riqueza da Necessidade', desc: 'Como descobrir a dor real do cliente e usá-la como alavanca de venda.' },
  { image: 'public/academy/eleve-se.png', title: 'Eleve-se', desc: 'Desenvolvimento pessoal e profissional para vendedores de alto nível.' },
  { image: 'public/academy/analise-de-negocios---vinicius-de-sa.png', title: 'Análises de Negócios — Vinícius de Sá', desc: 'Diagnósticos reais de operações comerciais comentados ao vivo.' },
]

const flixItems = [
  { image: 'public/flix/playbook-estruturacao-comercial-3-0.png', title: 'Playbook Interno de Estruturação Comercial 3.0', desc: 'O guia definitivo para estruturar processos e times comerciais com alto desempenho.' },
  { image: 'public/flix/script-quebra-objecoes.png', title: 'Script Secreto para Quebra de Objeções', desc: 'Como lidar com as principais objeções e virar o jogo na negociação.' },
  { image: 'public/flix/guia-social-selling.png', title: 'Guia Prático de Social Selling', desc: 'Como usar redes sociais para gerar oportunidades de venda de forma consistente.' },
  { image: 'public/flix/estudo-caso-gabriel-bueno.png', title: 'Estudo de Caso: Gabriel Bueno', desc: 'Como um vendedor chegou a 5M de faturamento — análise real, passo a passo.' },
  { image: 'public/flix/talk-alfredo-soares.png', title: 'Talk com Alfredo Soares', desc: 'Conteúdo exclusivo gravado no Full Sales Experience 2026.' },
  { image: 'public/flix/workshop-social-selling-thiago-germano.png', title: 'Workshop de Social Selling — Thiago Germano', desc: 'Estratégias práticas de vendas pelas redes sociais.' },
]

const clientLogos = [
  { src: 'public/cliente-ajs.png', name: 'AJS' }, { src: 'public/cliente-dm.png', name: 'DM' },
  { src: 'public/cliente-hotelaria.png', name: 'Hotelaria' }, { src: 'public/cliente-instituto.png', name: 'Instituto' },
  { src: 'public/cliente-kaizen.png', name: 'Kaizen' }, { src: 'public/cliente-maximus.png', name: 'Maximus' },
  { src: 'public/cliente-mbi.png', name: 'MBI' }, { src: 'public/cliente-mental.png', name: 'Mental One' },
  { src: 'public/cliente-perpetuo.png', name: 'Perpétuo' }, { src: 'public/cliente-positiva.png', name: 'Positiva' },
  { src: 'public/cliente-salvus.png', name: 'Salvus' }, { src: 'public/cliente-taugor.png', name: 'Taugor' },
  { src: 'public/cliente-ticto.png', name: 'Ticto' }, { src: 'public/cliente-tio.png', name: 'Tio' },
]

const pressLogos = [
  { name: 'Valor Econômico', src: 'public/press-valor-economico.png', bg: '#FFFFFF', scale: 1.2, href: 'https://valor.globo.com/patrocinado/pressworks/noticia/2025/11/24/full-sales-system-aponta-o-caminho-para-crescer-em-2026-com-estrategias-mais-inteligentes-1.ghtml' },
  { name: 'Pequenas Empresas & Grandes Negócios', src: 'public/press-pequenas-empresas.png', bg: '#D35400', scale: 2.3, href: 'https://revistapegn.globo.com/conteudo-de-marca/pressworks/noticia/2025/11/full-sales-system-tres-mentes-empreendedoras-que-transformaram-desafios-em-estrategias-1.ghtml' },
  { name: 'Band', src: 'public/press-band.png', bg: '#1A1A1A', scale: 1, href: 'https://www.band.com.br/band-vale/noticias/full-sales-system-aponta-o-caminho-para-crescer-com-estrategia-inteligente-202511211836' },
  { name: 'Estadão', src: 'public/estadao-novo.png', bg: '#FFFFFF', scale: 2.0, href: 'https://bluestudio.estadao.com.br/agencia-de-comunicacao/saftec-digital/full-sales-system-tres-mentes-empreendedoras-que-transformaram-desafios-em-estrategias/' },
  { name: 'Terra', src: 'public/press-terra.png', bg: '#FFFFFF', scale: 1.0, href: 'https://www.terra.com.br/economia/vendas-que-colocam-sua-empresa-no-protagonismo-full-sales-mostra-o-caminho,f72fe2c2ee9101ee76a02aea5e3eef8c69xd33kv.html' },
]

const areas = [
  { icon: '🏢', text: 'Empresarial' }, { icon: '📢', text: 'Marketing' }, { icon: '🎤', text: 'Eventos' },
  { icon: '⚕️', text: 'Médicos' }, { icon: '💡', text: 'Mentoria / Consultoria' }, { icon: '⚖️', text: 'Advocacia' },
  { icon: '🏪', text: 'Franquia' }, { icon: '💰', text: 'Financeiro' }, { icon: '🎨', text: 'Branding / Posicionamento' },
  { icon: '🏭', text: 'Serviços / Indústria' }, { icon: '💬', text: 'Comercial' }, { icon: '📊', text: 'Contábil / Tributário' },
  { icon: '💆', text: 'Saúde Estética' }, { icon: '☁️', text: 'SAAS (Software as Service)' }, { icon: '⚡', text: 'Energia Solar' },
  { icon: '💻', text: 'Software House' }, { icon: '📱', text: 'Mercado Digital' }, { icon: '📡', text: 'Comunicação' },
  { icon: '🏗️', text: 'Civil / Imobiliário' }, { icon: '🎓', text: 'Educação' },
]

const offerIncludes = [
  'Mais de 14 módulos e cursos completos do Full Sales Academy',
  'Acesso completo ao Full Sales Flix e sua biblioteca de playbooks e guias',
  'Workshops exclusivos com especialistas convidados',
  'Análises de call reais comentadas por Yuri Barbosa',
  'Diagnósticos de negócios ao vivo com Vinícius de Sá',
  'Atualizações e novos conteúdos incluídos sem custo adicional',
  'Acesso imediato após a confirmação do pagamento',
]

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {

  // Links de checkout com UTMs
  document.querySelectorAll('#nav-cta, #hero-cta, #offer-cta, #footer-cta, #exit-popup-cta').forEach(el => {
    el.href = withUtms(CHECKOUT_ANUAL_URL)
  })

  // Ano no footer
  document.getElementById('year').textContent = new Date().getFullYear()

  // Navbar scroll
  const navbar = document.getElementById('navbar')
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 560)
  }, { passive: true })

  // Fade up com IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
    })
  }, { threshold: 0.12 })
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))

  // ── RENDER MÓDULOS ──
  const modulesGrid = document.getElementById('modules-grid-el')
  academyModules.forEach(m => {
    modulesGrid.innerHTML += `
      <div class="media-card">
        <div class="media-card-img"><img src="${m.image}" alt="${m.title}" loading="lazy" /></div>
        <div class="media-card-body"><div class="media-card-title">${m.title}</div><p class="media-card-desc">${m.desc}</p></div>
      </div>`
  })

  // ── RENDER FLIX ──
  const flixGrid = document.getElementById('flix-grid-el')
  flixItems.forEach(f => {
    flixGrid.innerHTML += `
      <div class="media-card">
        <div class="media-card-img"><img src="${f.image}" alt="${f.title}" loading="lazy" /></div>
        <div class="media-card-body"><div class="media-card-title">${f.title}</div><p class="media-card-desc">${f.desc}</p></div>
      </div>`
  })

  // ── RENDER LOGOS CLIENTES ──
  const track = document.getElementById('client-logos-track')
  ;[...clientLogos, ...clientLogos].forEach(logo => {
    track.innerHTML += `<div style="flex-shrink:0;width:160px;height:72px;background:#fff;border:1px solid rgba(0,0,0,0.09);border-radius:10px;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:12px;box-shadow:0 2px 8px rgba(0,0,0,0.06);margin-right:12px;">
      <img src="${logo.src}" alt="${logo.name}" style="object-fit:contain;width:100%;height:100%;" loading="lazy" /></div>`
  })

  // ── RENDER ÁREAS ──
  const areasTrack = document.getElementById('areas-track')
  ;[...areas, ...areas].forEach(a => {
    areasTrack.innerHTML += `<div class="fss-card"><span>${a.icon}</span><span>${a.text}</span></div>`
  })

  // ── RENDER OFERTA INCLUSO ──
  const offerEl = document.getElementById('offer-includes')
  offerIncludes.forEach(item => {
    offerEl.innerHTML += `<div style="display:flex;gap:12px;align-items:flex-start;">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="flex-shrink:0;margin-top:2px;"><circle cx="10" cy="10" r="10" fill="rgba(224,21,21,0.18)"/><path d="M6 10.5L8.8 13L14 7" stroke="#E01515" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.55;">${item}</p></div>`
  })

  // ── RENDER LOGOS IMPRENSA ──
  const pressDesktop = document.getElementById('press-logos-desktop')
  const pressMobile = document.getElementById('press-logos-mobile-track')
  pressLogos.forEach(logo => {
    pressDesktop.innerHTML += `<a href="${logo.href}" target="_blank" rel="noopener noreferrer" aria-label="Ler matéria em ${logo.name}" style="height:72px;width:180px;background:${logo.bg};border:1px solid rgba(0,0,0,0.09);border-radius:10px;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:12px;box-shadow:0 2px 8px rgba(0,0,0,0.06);text-decoration:none;transition:transform 0.2s,box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 18px rgba(0,0,0,0.10)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(0,0,0,0.06)'">
      <img src="${logo.src}" alt="${logo.name}" style="object-fit:contain;width:100%;height:100%;transform:scale(${logo.scale});transform-origin:center center;" loading="lazy" /></a>`
  })
  ;[...pressLogos, ...pressLogos].forEach(logo => {
    pressMobile.innerHTML += `<a href="${logo.href}" target="_blank" rel="noopener noreferrer" style="flex-shrink:0;height:64px;width:150px;background:${logo.bg};border:1px solid rgba(0,0,0,0.09);border-radius:10px;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:10px;box-shadow:0 2px 8px rgba(0,0,0,0.06);margin-right:12px;text-decoration:none;">
      <img src="${logo.src}" alt="${logo.name}" style="object-fit:contain;width:100%;height:100%;transform:scale(${logo.scale});transform-origin:center center;" loading="lazy" /></a>`
  })

  // ── META PIXEL EVENTS ──
  if (typeof fbq !== 'undefined') {
    fbq('trackCustom', 'Pageview-lead-desqualificado-geral')
    fbq('trackCustom', 'Lead_desqualificado_FAP01')
  }

  // ── EXIT POPUP ──
  const popup = document.getElementById('exit-popup')
  if (popup) {
    let shown = sessionStorage.getItem('fss-exit-popup-shown') === '1'

    const openPopup = () => {
      if (shown) return
      shown = true
      sessionStorage.setItem('fss-exit-popup-shown', '1')
      popup.classList.add('is-open')
      popup.setAttribute('aria-hidden', 'false')
      document.body.classList.add('exit-popup-open')
    }

    const closePopup = () => {
      popup.classList.remove('is-open')
      popup.setAttribute('aria-hidden', 'true')
      document.body.classList.remove('exit-popup-open')
    }

    // Fechar: botão, clique no backdrop, ESC
    popup.querySelector('.exit-popup-close').addEventListener('click', closePopup)
    popup.addEventListener('click', (e) => { if (e.target === popup) closePopup() })
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popup.classList.contains('is-open')) closePopup()
    })
    // CTA também fecha (antes de navegar)
    document.getElementById('exit-popup-cta').addEventListener('click', closePopup)

    // Gatilho desktop: mouse sai pelo topo
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 0) openPopup()
    })

    // Gatilho mobile: botão voltar
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch && !shown) {
      history.pushState({ fssExitPopup: true }, '')
      window.addEventListener('popstate', () => openPopup())
    }
  }

})
