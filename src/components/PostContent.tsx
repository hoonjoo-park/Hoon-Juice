import { marked } from 'marked'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import BlogSEO from 'utils/seo'
import { PostDetailType } from 'utils/types'
import Prism from '../../utils/prism'

const PostContent = ({ frontmatter, content }: PostDetailType) => {
  const { title, date, thumbnail } = frontmatter
  const router = useRouter()

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <>
      <BlogSEO
        title={title}
        description={frontmatter.excerpt}
        path={router.asPath}
      />
      <div
        className={
          'w-full flex justify-center desktop:my-9 mobile:mt-3 mobile:mb-12 mobile:px-4'
        }
      >
        <div className={'desktop:w-[700px] mobile:w-full'}>
          <img
            className={
              'w-full desktop:h-[400px] aspect-[400:700] object-cover rounded-xl mb-8'
            }
            src={thumbnail}
            alt="thumbnail-image"
            width={700}
            height={400}
          />
          <h1 className={'mb-3 desktop:text-4xl mobile:text-3xl font-bold'}>
            {title}
          </h1>
          <div className={'mb-8 text-gray'}>{date}</div>

          <div>
            <article
              className="post"
              dangerouslySetInnerHTML={{ __html: marked(content) }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default PostContent
