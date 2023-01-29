import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PostProps } from './Posts'

interface PostListProps {
  post: PostProps
  title: string
}

const PostList = ({ post, title }: PostListProps) => {
  const { slug, frontmatter } = post

  return (
    <Link className={'postList'} href={`/post/${title.toLowerCase()}/${slug}`}>
      <div
        className={'flex desktop:items-center desktop:flex-row mobile:flex-col'}
      >
        <div
          className={
            'relative desktop:w-48 desktop:h-48 mobile:w-full desktop:mb-0 desktop:mr-12 mobile:mb-5 shrink-0 overflow-hidden drop-shadow-md rounded-xl'
          }
        >
          <Image
            className={
              'desktop:w-48 desktop:h-48 mobile:w-full object-cover thumbnail'
            }
            src={frontmatter.thumbnail}
            width={300}
            height={200}
            alt="thumbnail"
          />
          <div
            className={'absolute top-0 left-0 bg-black w-full h-full overlay'}
          />
        </div>
        <div>
          <h5
            className={
              'max-h-16 mobile:mb-[10px] desktop:mb-4 desktop:text-3xl mobile:text-2xl font-bold text-ellipsis break-keep'
            }
          >
            {frontmatter.title}
          </h5>
          <p className={'max-h-24 mb-3 text-base text-gray'}>
            {frontmatter.excerpt}
          </p>
          <span className={'text-sm text-lightGray'}>{frontmatter.date}</span>
        </div>
      </div>
    </Link>
  )
}

export default PostList
