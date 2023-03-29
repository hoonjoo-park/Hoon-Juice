import CarouselCard from '@/components/CarouselCard'
import { useRouter } from 'next/router'
import { MY_PROJECTS } from 'utils/constants'
import BlogSEO from 'utils/seo'
import { PostListType } from 'utils/types'

const OthersPage = (props: PostListType) => {
  const router = useRouter()

  return (
    <>
      <BlogSEO title="Projects - 훈쥬스 블로그" path={router.asPath} />
      <article className="min-h-screen desktop:max-w-[980px] desktop:m-auto px-8 py-16">
        <h1 className="desktop:mb-12 mobile:mb-6 text-3xl font-bold">
          Projects
        </h1>

        <h2>준비 중입니다...</h2>

        <div>
          {MY_PROJECTS.map(project => (
            <CarouselCard key={project.title} project={project} />
          ))}
        </div>
      </article>
    </>
  )
}
export default OthersPage
