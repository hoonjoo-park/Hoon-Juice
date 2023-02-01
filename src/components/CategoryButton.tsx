import React from 'react'

interface CategoryButtonProps {
  title: string
  onClick: (category: string) => void
  isSelected: boolean
}

const CategoryButton = ({
  title,
  onClick,
  isSelected,
}: CategoryButtonProps) => {
  return (
    <button
      className={`p-2 mr-9 text-base font-semibold hover:text-white ${
        isSelected
          ? 'text-white border-b-[3px] border-b-yellow'
          : 'text-lightGray'
      }`}
      disabled={isSelected}
      onClick={() => onClick(title)}
    >
      {title}
    </button>
  )
}

export default CategoryButton
