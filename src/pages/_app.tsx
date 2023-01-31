import '../styles/globals.css'
import '../styles/prism.css'

import type { AppProps } from 'next/app'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { NextSeo } from 'next-seo'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo title="훈쥬스 블로그" description="HoonJuice Personal Blog." />
      <div className={'flex flex-col min-h-screen'}>
        <Header />
        <main className={'flex-grow'}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}
