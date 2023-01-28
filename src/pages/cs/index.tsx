import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sortByDate } from 'utils'
import { PostsType } from '..'
import Posts from '@/components/Posts'

const CSPage = ({ posts }: PostsType) => {
  return <Posts title={'CS'} posts={posts} />
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts', 'cs'))

  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', 'cs', filename),
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

export default CSPage
