import Router from 'next/router'
import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    Router.replace('/dev')
  }, [])

  return <></>
}

export default Home
