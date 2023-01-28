import React from 'react'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { sortByDate } from 'utils'
import PostList from '@/components/PostList'

const Home = ({ posts }: any) => {
  return (
    <div className={'flex mobile:w-screen mobile:px-6 mb-16'}>
      <ul className={'flex flex-col gap-14 mt-6'}>
        {posts.map((post: any) => (
          <PostList key={post.slug} post={post} />
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8',
    )

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }
  })

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  }
}

export default Home
