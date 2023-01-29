import Image from 'next/image'
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
            <Image
              src={'/images/github-circle.svg'}
              width={30}
              height={30}
              alt="github"
            />
          </a>
          <a href="https://www.linkedin.com/in/hoonjoo-park">
            <Image
              src={'/images/linked-in.svg'}
              width={30}
              height={30}
              alt="linked-in"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
