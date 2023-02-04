import Router from 'next/router'
import { useLayoutEffect } from 'react'

const Home = () => {
  useLayoutEffect(() => {
    Router.replace('/dev')
  }, [])

  return <></>
}

export default Home
