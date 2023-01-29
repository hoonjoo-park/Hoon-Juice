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
      <div className={'flex items-center desktop:flex-row mobile:flex-col'}>
        <Image
          className={
            'desktop:w-48 desktop:h-48 desktop:mb-0 desktop:mr-12 mobile:w-full mobile:mb-5 object-cover rounded-xl drop-shadow-md'
          }
          src={frontmatter.thumbnail}
          width={300}
          height={200}
          alt="thumbnail"
        />
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
