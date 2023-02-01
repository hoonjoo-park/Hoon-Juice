import { memo, useState } from 'react'
import { PostListType } from 'utils/types'
import CategoryButton from './CategoryButton'
import Pagination from './pagination'
import PostList from './PostList'

const POSTS_PER_PAGE = 5

const Posts = ({ title, posts, categories }: PostListType) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const lastPageNumber = Math.ceil(posts.length / POSTS_PER_PAGE)
  const indexOfLastPost = currentPage * POSTS_PER_PAGE
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE

  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter(post => {
          return post.frontmatter.category === selectedCategory
        })
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  const remainder = currentPage % POSTS_PER_PAGE
  let leftEdge = !remainder ? currentPage - 4 : currentPage - remainder + 1
  let rightEdge = !remainder
    ? currentPage
    : currentPage - remainder + POSTS_PER_PAGE

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  const pageNumbers = []

  for (let i = 1; i <= lastPageNumber; i++) {
    pageNumbers.push(i)
  }

  const currentPageNumbers = pageNumbers.filter(
    number => number >= leftEdge && number <= rightEdge,
  )

  const handleClickCategory = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <section
      className={
        'flex flex-col justify-center desktop:max-w-[980px] mobile:w-screen mobile:px-6 desktop:mb-24 mobile:mb-16 desktop:m-auto'
      }
    >
      <section
        className={
          'flex flex-col desktop:mt-16 mobile:mt-7 desktop:mb-16 mobile:mb-4'
        }
      >
        <h2 className={' mb-12 text-3xl font-bold'}>{title}</h2>

        <nav className={'flex'}>
          {categories.map(category => (
            <CategoryButton
              key={category}
              title={category}
              isSelected={category === selectedCategory}
              onClick={handleClickCategory}
            />
          ))}
        </nav>
      </section>

      <ul className={'flex flex-col gap-14 mt-2'}>
        {currentPosts.map(post => (
          <PostList key={post.slug} post={post} title={title} />
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        paginate={paginate}
        lastPageNumber={lastPageNumber}
        currentPageNumbers={currentPageNumbers}
      />
    </section>
  )
}

export default memo(Posts)
