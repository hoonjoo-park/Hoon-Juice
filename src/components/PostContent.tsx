import { marked } from 'marked'
import Image from 'next/image'
import React, { useLayoutEffect } from 'react'
import Prism from '../../utils/prism'

interface PostContentProps {
  title: string
  date: string
  thumbnail: string
  content: string
}

const PostContent = ({ title, date, thumbnail, content }: PostContentProps) => {
  useLayoutEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className={'post w-full flex justify-center my-9 mobile:px-4'}>
      <div className={'desktop:w-[700px] mobile:w-full'}>
        <Image
          className={'w-full rounded-xl mb-8'}
          src={thumbnail}
          width={900}
          height={0}
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
  )
}

export default PostContent
