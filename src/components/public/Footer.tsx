/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Footer = () => {
  return (
    <footer className="w-screen flex items-center justify-center bg-black desktop:h-24 mobile:h-32">
      <div
        className={
          'desktop:w-[932px] mobile:w-[90%] flex items-center desktop:flex-row  mobile:flex-col desktop:justify-between mobile:justify-center'
        }
      >
        <span className="text-base text-white desktop:text-left mobile:text-center mobile:mb-3.5 desktop:mb-0">
          © 2023 Hoon-Juice. All Rights Reserved.
        </span>

        <div className={'flex gap-4'}>
          <a href="https://github.com/hoonjoo-park">
            <img
              src={'/images/github-circle.svg'}
              alt="github"
              width={30}
              height={30}
            />
          </a>
          <a href="https://www.linkedin.com/in/hoonjoo-park">
            <img
              src={'/images/linked-in.svg'}
              alt="linked-in"
              width={30}
              height={30}
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
