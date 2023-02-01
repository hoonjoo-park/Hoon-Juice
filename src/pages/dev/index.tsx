import Posts from '@/components/Posts'
import fs from 'fs'
import matter from 'gray-matter'
import { NextSeo } from 'next-seo'
import path from 'path'
import { sortByDate } from 'utils'
import { PostListType } from 'utils/types'

const DevPage = ({ posts }: PostListType) => {
  return (
    <>
      <NextSeo title="훈쥬스 블로그" description="HoonJuice Personal Blog." />
      <Posts title={'Dev'} posts={posts} />
    </>
  )
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts', 'dev'))

  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', 'dev', filename),
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

export default DevPage
