import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header
      className={
        'h-16 fixed bg-black w-full z-20 top-0 left-0 flex items-center justify-center border-b border-gray-600'
      }
    >
      <nav className={'max-w-6xl w-11/12 flex items-center justify-between'}>
        <h2 className={'font-bold text-xl'}>훈주스 블로그</h2>
        <div>
          <ul className={'flex items-center'}>
            <li className={'font-semibold text-base'}>
              <Link
                className={'px-4 hover:text-blue-500 transition'}
                href={'/posts/web'}
              >
                웹 개발
              </Link>
            </li>
            <li className={'font-semibold text-base'}>
              <Link
                className={'px-4 hover:text-blue-500 transition'}
                href={'/posts/app'}
              >
                앱 개발
              </Link>
            </li>
            <li className={'font-semibold text-base'}>
              <Link
                className={'px-4 hover:text-blue-500 transition'}
                href={'/about'}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
