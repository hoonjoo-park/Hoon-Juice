import Image from 'next/image'
import { memo, useState } from 'react'
import { PostsType } from 'utils/types'
import PostList from './PostList'

const POSTS_PER_PAGE = 5

const Posts = ({ title, posts }: PostsType) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const indexOfLastPost = currentPage * POSTS_PER_PAGE
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const remainder = currentPage % POSTS_PER_PAGE
  let leftEdge = !remainder ? currentPage - 4 : currentPage - remainder + 1
  let rightEdge = !remainder ? currentPage : currentPage - remainder + 5

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const renderPageNumbers = pageNumbers
    .filter(number => number >= leftEdge && number <= rightEdge)
    .map(number => {
      const isSelected = number === currentPage
      return (
        <li key={number} className={`flex justify-center items-center`}>
          <button
            className={`px-3 py-2 ml-0 leading-tight  bg-darkNavy border border-lightNavy hover:bg-lightNavy hover:text-white ${
              isSelected && 'bg-lightNavy'
            } ${isSelected ? 'text-white' : 'text-gray'}`}
            onClick={() => paginate(number)}
            disabled={isSelected}
          >
            {number}
          </button>
        </li>
      )
    })

  return (
    <div
      className={
        'flex flex-col justify-center desktop:max-w-[980px] mobile:w-screen mobile:px-6 desktop:mb-24 mobile:mb-16 desktop:m-auto'
      }
    >
      <h1
        className={
          'desktop:mt-12 desktop:mb-9 mobile:mt-7 mobile:mb-4 py-5 text-3xl font-bold'
        }
      >
        {title}
      </h1>

      <ul className={'flex flex-col gap-14 mt-2'}>
        {currentPosts.map(post => (
          <PostList key={post.slug} post={post} title={title} />
        ))}
      </ul>

      <nav className="flex justify-center w-full desktop:mt-28 mobile:mt-16">
        <ul className="inline-flex items-center -space-x-px">
          <button
            className={`px-3 py-2 ml-0 leading-tight rounded-l-lg bg-darkNavy border border-lightNavy text-lightGray  ${
              currentPage !== 1 && 'hover:bg-lightNavy'
            }`}
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            <Image
              src={'/images/arrow-left.svg'}
              width={20}
              height={20}
              alt="arrow-left"
            />
          </button>

          {renderPageNumbers}

          <button
            className={`px-3 py-2 ml-0 leading-tight rounded-r-lg bg-darkNavy border border-lightNavy text-gray ${
              currentPage !== totalPages && 'hover:bg-lightNavy'
            }`}
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            <Image
              src={'/images/arrow-right.svg'}
              width={20}
              height={20}
              alt="arrow-right"
            />
          </button>
        </ul>
      </nav>
    </div>
  )
}

export default memo(Posts)
