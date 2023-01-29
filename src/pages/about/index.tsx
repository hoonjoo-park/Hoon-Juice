import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div
      className={
        'flex flex-col justify-center desktop:max-w-[980px] mobile:w-screen mobile:px-6 mb-16 desktop:m-auto'
      }
    >
      <h1 className={'mt-12 py-5 text-3xl font-bold'}> About Me</h1>

      <div
        className={
          'flex justify-between p-6 rounded-3xl bg-white shadow-lg my-12'
        }
      >
        <Image
          className={'rounded-xl shadow-md aspect-square object-cover mr-8'}
          src={'/images/profile-vietnam.jpg'}
          alt="profile-image"
          width={200}
          height={200}
        />

        <div className={'flex flex-col justify-center basis-full'}>
          <h2 className={'text-navy text-base font-medium mb-3'}>
            HoonJoo Park
          </h2>
          <h3 className={'text-navy text-2xl font-bold mb-3'}>
            Frontend, iOS Engineer
          </h3>
          <p className={'text-navy'}>
            I am a front-end & iOS developer who wants to be a guide to business
            value delivery through the harmony of business administration and
            programming. In particular, I want to grow steadily, learn, and help
            create meaningful value in society.
          </p>
        </div>
      </div>

      <div className={'flex p-6 rounded-3xl bg-white shadow-lg my-12'}>
        <h3>Profile</h3>

        <div>
          <p></p>
        </div>
      </div>

      <div className={'flex p-6 rounded-3xl bg-white shadow-lg my-12'}>
        <h3>Career</h3>

        <div>
          <p></p>
        </div>
      </div>
    </div>
  )
}

export default About
