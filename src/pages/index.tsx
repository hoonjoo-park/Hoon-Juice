import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  router.replace('/dev')
  return <></>
}

export default Home
