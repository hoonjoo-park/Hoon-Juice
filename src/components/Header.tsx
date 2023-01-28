import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'

const Header = () => {
  const navListBox = useRef<HTMLDivElement>(null)

  const handleClickHamburger = () => {
    if (!navListBox.current) return

    if (navListBox.current.classList.contains('opened')) {
      navListBox.current.classList.remove('opened')
    } else {
      navListBox.current.classList.add('opened')
    }
  }

  return (
    <header
      className={
        'min-h-16 min-h-[64px] w-full fixed z-20 top-0 left-0 flex items-center justify-center bg-black'
      }
    >
      <nav
        className={
          'max-w-6xl min-h-[64px] w-11/12 flex desktop:flex-row items-center mobile:flex-col tablet:flex-col justify-between'
        }
      >
        <Link
          className={
            'flex items-center font-bold text-xl p-2 mobile:w-full flex-grow min-h-[64px]'
          }
          href={'/'}
        >
          훈주스 블로그
        </Link>

        <div className="desktop:hidden absolute right-5 top-[32px] -translate-y-1/2">
          <button
            className={'rounded-lg p-2 hover:bg-gray-700 '}
            onClick={handleClickHamburger}
          >
            <Image
              src={'/images/hamburger.svg'}
              width={20}
              height={20}
              alt="hamburger"
            />
          </button>
        </div>

        <div
          ref={navListBox}
          className={'overflow-y-hidden accordion mobile:w-full'}
        >
          <ul
            className={
              'flex items-center mobile:flex-col mobile:w-full mobile:overflow-y-hidden flex-grow'
            }
          >
            <li className={'font-semibold text-base mobile:w-full flex'}>
              <Link
                className={
                  'desktop:px-4 hover:text-blue-500 transition mobile:px-3 mobile:py-4'
                }
                href={'/posts/web'}
              >
                웹 개발
              </Link>
            </li>
            <li className={'font-semibold text-base mobile:w-full flex'}>
              <Link
                className={
                  'desktop:px-4 hover:text-blue-500 transition mobile:px-3 mobile:py-4'
                }
                href={'/posts/app'}
              >
                앱 개발
              </Link>
            </li>
            <li className={'font-semibold text-base mobile:w-full flex'}>
              <Link
                className={
                  'desktop:px-4 hover:text-blue-500 transition mobile:px-3 mobile:py-4'
                }
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
