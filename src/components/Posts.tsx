import { memo } from 'react'
import { PostsType } from 'utils/types'
import PostList from './PostList'

const Posts = ({ title, posts }: PostsType) => {
  return (
    <div
      className={
        'flex flex-col justify-center desktop:max-w-[980px] mobile:w-screen mobile:px-6 desktop:mb-24 mobile:mb-16 desktop:m-auto'
      }
    >
      <h1
        className={
          'desktop:mt-12 desktop:mb-9 mobile:mt-7 mobile:mb-4 py-5 text-3xl font-bold'
        }
      >
        {title}
      </h1>

      <ul className={'flex flex-col gap-14 mt-2'}>
        {posts.map(post => (
          <PostList key={post.slug} post={post} title={title} />
        ))}
      </ul>
    </div>
  )
}

export default memo(Posts)
