import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sortByDate } from 'utils'
import Posts from '@/components/Posts'
import { NextSeo } from 'next-seo'
import { PostListType } from 'utils/types'

const OthersPage = (props: PostListType) => {
  const { posts, categories } = props
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

  const filteredFiles = files.filter(file => file.includes('.md'))

  const posts = filteredFiles.map(filename => {
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

  const defaultCategory = posts.length ? ['All'] : null
  const categorySet = new Set(defaultCategory)

  if (posts.length) {
    posts.forEach(post => categorySet.add(post.frontmatter.category ?? null))
  }

  return {
    props: {
      posts: posts.sort(sortByDate),
      categories: Array.from(categorySet),
    },
  }
}

export default OthersPage
