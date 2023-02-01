import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sortByDate } from 'utils'
import Posts from '@/components/Posts'
import { NextSeo } from 'next-seo'
import { PostListType } from 'utils/types'

const OthersPage = ({ posts, categories }: PostListType) => {
  return (
    <>
      <NextSeo
        title="Others - 훈쥬스 블로그"
        description="HoonJuice Personal Blog."
      />
      <Posts title={'Others'} posts={posts} categories={categories} />
    </>
  )
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts', 'others'))

  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', 'others', filename),
      'utf-8',
    )

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }
  })

  const categorySet = new Set(['All'])

  posts.forEach(post => categorySet.add(post.frontmatter.category))

  return {
    props: {
      posts: posts.sort(sortByDate),
      categories: Array.from(categorySet),
    },
  }
}

export default OthersPage
