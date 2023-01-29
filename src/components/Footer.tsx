import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className="w-screen h-24 flex justify-center items-center bg-black mt-auto bottom-0 shadow">
      <span className="text-base text-white desktop:w-[932px] mobile:w-[90%]">
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
    </footer>
  )
}

export default Footer
