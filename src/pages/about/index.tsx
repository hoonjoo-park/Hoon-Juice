/* eslint-disable @next/next/no-img-element */
import Badge from '@/components/public/Badge'
import { NextSeo } from 'next-seo'
import React, { useLayoutEffect } from 'react'

const About = () => {
  useLayoutEffect(() => {
    const body = document.querySelector('body')

    if (!body) return

    body.classList.add('white')

    return () => {
      body.classList.remove('white')
    }
  }, [])

  return (
    <>
      <NextSeo
        title="About - 훈쥬스 블로그"
        description="HoonJuice Personal Blog."
      />
      <div
        className={
          'flex flex-col justify-center desktop:max-w-[980px] mobile:w-screen mobile:px-6 mb-16 desktop:m-auto desktop:pb-14 mobile:pb-0'
        }
      >
        <h2
          className={
            'desktop:my-16 mobile:mt-12 mobile:mb-10 text-navy text-3xl font-bold'
          }
        >
          About Me
        </h2>

        <section
          className={
            'flex desktop:flex-row mobile:flex-col justify-between p-6 rounded-3xl bg-white shadow-lg my-6'
          }
        >
          <img
            className={
              'desktop:w-52 mobile:w-full h-52 rounded-xl shadow-md aspect-square object-cover mr-7 desktop:mb-0 mobile:mb-6'
            }
            src={'/images/profile-vietnam.png'}
            alt="profile-image"
          />

          <article className={'flex flex-col justify-center basis-full'}>
            <h4 className={'text-navy text-base font-medium mb-3'}>박훈주</h4>
            <h4 className={'text-navy text-2xl font-bold mb-3'}>
              Frontend, iOS Engineer
            </h4>
            <p className={'text-navy mobile:text-justify'}>
              경영학과 프로그래밍의 조화를 통해, 비즈니스 밸류 전달의 길라잡이가
              되고싶은 프론트엔드 & iOS 개발자입니다. 꾸준히 성장하고 배우며
              사회에 유의미한 가치를 창출하는데 일조하고 싶습니다.
            </p>
          </article>
        </section>

        <section
          className={
            'flex desktop:flex-row mobile:p-6 mobile:flex-col desktop:items-center desktop:p-12 rounded-3xl bg-white shadow-lg my-7'
          }
        >
          <h3 className={'w-44 mobile:mb-5 text-black text-2xl font-extrabold'}>
            Profile
          </h3>

          <article>
            <p className={'text-navy text-base font-medium mb-3'}>
              - 서울시립대학교 경영학부 졸업
            </p>
            <p className={'text-navy text-base font-medium mb-3'}>
              - 바이브 컴퍼니 인공지능 LAB 인턴 (2019 ~ 2021)
            </p>
            <p className={'text-navy text-base font-medium'}>
              - (주)더블엔씨 니콘내콘 서비스 프론트엔드 개발 (2022.05 ~)
            </p>
          </article>
        </section>

        <section
          className={
            'flex desktop:flex-row mobile:p-6 mobile:flex-col desktop:items-center desktop:p-12 rounded-3xl bg-white shadow-lg my-7'
          }
        >
          <h3 className={'w-44 mobile:mb-5 text-black text-2xl font-extrabold'}>
            Skills
          </h3>

          <article className={'flex flex-wrap gap-3'}>
            <Badge title="NextJS" image="/images/nextjs.svg" />
            <Badge title="React Native" image="/images/react-native.svg" />
            <Badge title="Swift" image="/images/swift.svg" />
            <Badge title="React-Query" image="/images/react-query.svg" />
            <Badge title="Redux" image="/images/redux.svg" />
            <Badge title="SCSS" image="/images/scss.svg" />
          </article>
        </section>

        <section
          className={
            'relative flex desktop:flex-row mobile:flex-col items-center justify-between p-12 rounded-3xl shadow-lg my-7 bg-no-repeat bg-cover'
          }
          style={{ backgroundImage: 'url(/images/green.png)' }}
        >
          <div
            className={
              'absolute w-full h-full bg-black top-0 left-0 rounded-3xl opacity-25'
            }
          />

          <div className={'flex flex-col z-10'}>
            <h3 className={'text-white text-4xl font-extrabold mb-2'}>
              Need more information?
            </h3>
            <p className={'text-lg font-medium mobile:mb-7 desktop:mb-0'}>
              Feel free to visit my Github!
            </p>
          </div>

          <div className={'flex basis-1/4 justify-center z-10'}>
            <a
              href="https://github.com/hoonjoo-park"
              className={
                'w-40 shadow-md flex items-center py-3 px-5 bg-white text-xl font-semibold rounded-full text-center text-navy hover:scale-105 transition-transform'
              }
            >
              <img
                className={'mr-2'}
                src={'/images/github.svg'}
                alt="github"
                width={35}
                height={35}
              />
              Github
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

export default About
