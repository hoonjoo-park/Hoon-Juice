import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    Router.push('/dev')
  }, [])

  return <></>
}

export default Home
