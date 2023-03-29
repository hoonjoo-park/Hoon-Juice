import { NextSeo, NextSeoProps } from 'next-seo'

const BASE_URL = 'https://hoon-juice.pages.dev'

interface BlogSEOProps {
  title?: string
  description?: string
  path: string
}

const DEFAULT_SEO: NextSeoProps = {
  title: '훈쥬스 블로그',
  description:
    'iOS 및 프론트엔드 개발 관련 내용들을 정리하고 있는 개인 기술 블로그입니다.',
  openGraph: {
    type: 'article',
    locale: 'ko_KR',
    url: 'https://hoon-juice.pages.dev/dev',
    title: '훈쥬스 블로그',
    description:
      'iOS 및 프론트엔드 개발 관련 내용들을 정리하고 있는 개인 기술 블로그입니다.',
    siteName: '훈쥬스 블로그',
  },
}

const BlogSEO = ({ title, description, path }: BlogSEOProps) => {
  const getConfig = () => {
    const defaultConfig = { ...DEFAULT_SEO }
    defaultConfig.openGraph!.url = BASE_URL + path

    if (title) {
      defaultConfig.title = title
      defaultConfig.openGraph!.title = title
    }

    if (description) {
      defaultConfig.description = description
      defaultConfig.openGraph!.description = description
    }

    return defaultConfig
  }

  return <NextSeo {...getConfig()} />
}

export default BlogSEO
