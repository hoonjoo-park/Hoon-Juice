import useLazyLoad from 'hooks/useLazyLoad'
import { marked } from 'marked'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Prism from '../../utils/prism'

interface PostContentProps {
  title: string
  date: string
  thumbnail: string
  content: string
}

const renderer = {
  image(href: string, title: string, text: string) {
    return `
      <img class="lazyImage" src="/images/lazy-loading.png" alt=${title} data-src=${href} />
    `
  },
}

const PostContent = ({ title, date, thumbnail, content }: PostContentProps) => {
  const [lazyImages, setLazyImages] =
    useState<NodeListOf<HTMLImageElement> | null>(null)

  useEffect(() => {
    Prism.highlightAll()
    setLazyImages(document.querySelectorAll('.lazyImage'))
  }, [])

  marked.use({ renderer })
  useLazyLoad(lazyImages)

  return (
    <>
      <NextSeo title={title} description="HoonJuice Personal Blog." />
      <div className={'post w-full flex justify-center my-9 mobile:px-4'}>
        <div className={'desktop:w-[700px] mobile:w-full'}>
          <Image
            className={'w-full rounded-xl mb-8'}
            src={thumbnail}
            width={700}
            height={453}
            alt="thumbnail-image"
          />
          <h1 className={'mb-3 desktop:text-4xl mobile:text-3xl font-bold'}>
            {title}
          </h1>
          <div className={'mb-8'}>{date}</div>

          <div>
            <article dangerouslySetInnerHTML={{ __html: marked(content) }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default PostContent
