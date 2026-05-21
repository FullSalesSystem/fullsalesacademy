import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Obrigado | Full Sales System',
  description:
    'Você deu o primeiro passo. Conheça a Full Sales System — a consultoria que já estruturou mais de 550 operações comerciais no Brasil, Portugal e EUA.',
  keywords: [
    'estrutura comercial',
    'sistema de vendas',
    'escalar negócio',
    'full sales system',
    'vinícius de sá',
  ],
  openGraph: {
    title: 'Obrigado | Full Sales System',
    description:
      'Você deu o primeiro passo. Conheça a Full Sales System — a consultoria que já estruturou mais de 550 operações comerciais.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        {/* ── Meta Pixel ── */}
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','288404690470754');
          fbq('track','PageView');
        `}</Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=288404690470754&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* ── Eventos personalizados — FAP01-LF ── */}
        <Script id="meta-pixel-events" strategy="afterInteractive">{`
          fbq('trackCustom','Pageview-lead-desqualificado-geral');
          fbq('trackCustom','Lead_desqualificado_FAP01');
          console.log('✅ Eventos Meta enviados: Pageview-lead-desqualificado-geral e Lead_desqualificado_FAP01');
        `}</Script>

        {children}
      </body>
    </html>
  )
}
