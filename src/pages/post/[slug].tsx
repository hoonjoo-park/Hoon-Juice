import fs from 'fs'
import matter from 'gray-matter'
import { marked } from 'marked'
import Image from 'next/image'
import path from 'path'

interface Frontmatter {
  title: string
  date: string
  thumbnail: string
}

interface PostProps {
  frontmatter: Frontmatter
  slug: string
  content: string
}

interface PathParams {
  slug: string
}

interface GetStaticPathsReturn {
  paths: Array<{ params: PathParams }>
  fallback: boolean
}

interface GetStaticPropsContext {
  params: PathParams
}

const Post = ({ frontmatter, slug, content }: PostProps) => {
  const { title, date, thumbnail } = frontmatter

  console.log(thumbnail)
  return (
    <div className={'w-full flex justify-center my-9'}>
      <div className={'w-[700px]'}>
        <img
          className={'w-full rounded-xl mb-8'}
          src={thumbnail}
          alt="thumbnail-image"
        />
        <h1 className={'mb-3 text-4xl font-bold'}>{title}</h1>
        <div className={'mb-8 '}>{date}</div>

        <div>
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async (): Promise<GetStaticPathsReturn> => {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { slug } = params

  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8',
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  }
}

export default Post
