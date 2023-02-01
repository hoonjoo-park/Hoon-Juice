import React from 'react'

interface PageButtonProps {
  pageNumber: number
  isSelected: boolean
  paginate: (pageNumber: number) => void
}

const PageButton = ({ pageNumber, isSelected, paginate }: PageButtonProps) => {
  return (
    <li key={pageNumber} className={`flex justify-center items-center`}>
      <button
        className={`px-3 py-2 ml-0 leading-tight  bg-darkNavy border border-lightNavy hover:bg-lightNavy hover:text-white ${
          isSelected && 'bg-lightNavy'
        } ${isSelected ? 'text-white' : 'text-gray'}`}
        onClick={() => paginate(pageNumber)}
        disabled={isSelected}
      >
        {pageNumber}
      </button>
    </li>
  )
}

export default PageButton
