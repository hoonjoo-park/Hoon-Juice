import '../styles/globals.css'
import '../styles/prism.css'

import type { AppProps } from 'next/app'

import Footer from '@/components/public/Footer'
import Header from '@/components/public/Header'
import BlogSEO from 'utils/seo'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <BlogSEO title="훈쥬스 블로그" path="/" />
      <div className={'flex flex-col min-w-[320px] min-h-screen'}>
        <Header />
        <main className={'flex-grow'}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default MyApp
