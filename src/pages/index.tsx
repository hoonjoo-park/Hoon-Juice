const Home = () => {
  return <></>
}

export const getStaticProps = async () => {
  if (true) {
    return {
      redirect: {
        permanent: true,
        destination: '/dev',
      },
    }
  }
}

export default Home
