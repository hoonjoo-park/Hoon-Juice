import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PostList = ({ post }: any) => {
  const { slug, frontmatter } = post

  return (
    <Link className="post-list" href={`/post/${slug}`}>
      <div>
        <Image
          className="thumbnail"
          src={frontmatter.thumbnail}
          width={300}
          height={200}
          alt="thumbnail"
        />
        <h5>{frontmatter.title}</h5>
        <p>{frontmatter.excerpt}</p>
      </div>
    </Link>
  )
}

export default PostList
