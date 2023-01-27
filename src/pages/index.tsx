import React from 'react'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { sortByDate } from 'utils'
import PostList from '@/components/PostList'

const Home = ({ posts }: any) => {
  return (
    <ul>
      {posts.map((post: any) => (
        <PostList key={post.slug} post={post} />
      ))}
    </ul>
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
