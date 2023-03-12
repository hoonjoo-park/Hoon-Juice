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
      className={`relative p-2 desktop:mr-9 mobile:mr-6 text-base font-semibold hover:text-white transition-all duration-200 ${
        isSelected ? 'text-white' : 'text-lightGray'
      }`}
      disabled={isSelected}
      onClick={() => onClick(title)}
    >
      {title}

      {isSelected && (
        <span
          className={
            'absolute top-full left-0 bottom-0 w-full h-[3px] bg-yellow'
          }
        />
      )}
    </button>
  )
}

export default CategoryButton
