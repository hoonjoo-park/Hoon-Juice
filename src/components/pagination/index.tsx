import Image from 'next/image'
import React from 'react'
import PageButton from './PageButton'

interface PaginationProps {
  currentPage: number
  paginate: (pageNumber: number) => void
  lastPageNumber: number
  currentPageNumbers: number[]
}

const Pagination = ({
  currentPage,
  paginate,
  lastPageNumber,
  currentPageNumbers,
}: PaginationProps) => {
  return (
    <nav className="flex justify-center w-full desktop:mt-28 mobile:mt-16">
      <ul className="inline-flex items-center -space-x-px">
        <li>
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
        </li>

        {currentPageNumbers.map(pageNumber => (
          <PageButton
            key={pageNumber}
            pageNumber={pageNumber}
            paginate={paginate}
            isSelected={currentPage === pageNumber}
          />
        ))}

        <li>
          <button
            className={`px-3 py-2 ml-0 leading-tight rounded-r-lg bg-darkNavy border border-lightNavy text-gray ${
              currentPage !== lastPageNumber && 'hover:bg-lightNavy'
            }`}
            disabled={currentPage === lastPageNumber}
            onClick={() => paginate(currentPage + 1)}
          >
            <Image
              src={'/images/arrow-right.svg'}
              width={20}
              height={20}
              alt="arrow-right"
            />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
