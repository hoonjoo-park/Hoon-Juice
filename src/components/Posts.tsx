import { memo } from 'react'
import PostList from './PostList'

export interface Frontmatter {
  title: string
  date: string
  excerpt: string
  thumbnail: string
}

export interface PostProps {
  frontmatter: Frontmatter
  slug: string
  content: string
}

interface PostsProps {
  title: string
  posts: PostProps[]
}

const Posts = ({ title, posts }: PostsProps) => {
  return (
    <div
      className={
        'flex flex-col justify-center desktop:max-w-[980px] mobile:w-screen mobile:px-6 mb-16 desktop:m-auto'
      }
    >
      <h1 className={'mt-12 mb-9 py-5 text-3xl font-bold'}>{title}</h1>
      <ul className={'flex flex-col gap-14 mt-2'}>
        {posts.map(post => (
          <PostList key={post.slug} post={post} title={title} />
        ))}
      </ul>
    </div>
  )
}

export default memo(Posts)
