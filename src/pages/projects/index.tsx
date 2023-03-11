import CarouselCard from '@/components/CarouselCard'
import { NextSeo } from 'next-seo'
import { MY_PROJECTS } from 'utils/constants'
import { PostListType } from 'utils/types'

const OthersPage = (props: PostListType) => {
  return (
    <>
      <NextSeo
        title="Others - 훈쥬스 블로그"
        description="HoonJuice Personal Blog."
      />
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
