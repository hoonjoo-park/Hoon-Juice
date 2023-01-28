import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PostList = ({ post }: any) => {
  const { slug, frontmatter } = post

  return (
    <Link href={`/post/${slug}`}>
      <div>
        <Image
          className={'w-full rounded-xl mb-5'}
          src={frontmatter.thumbnail}
          width={300}
          height={200}
          alt="thumbnail"
        />
        <div>
          <h5
            className={
              'max-h-16 mb-[10px] text-2xl font-bold text-ellipsis break-keep transition-colors'
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
