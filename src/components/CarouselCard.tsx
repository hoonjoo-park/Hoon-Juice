import Link from 'next/link'
import { ProjectType } from 'utils/constants'

interface CarouselCardProps {
  project: ProjectType
}

const CarouselCard = ({ project }: CarouselCardProps) => {
  const { image, title, languages, description, gitLink, webLink } = project

  return (
    <div>
      <img src={image} alt={'carousel-image'} />
      <h2>{title}</h2>

      <div>
        {languages.map(language => (
          <div key={language} className={`language-${language}`}>
            {language}
          </div>
        ))}
      </div>

      <p>{description}</p>

      <div>
        <Link href={gitLink}>
          <a>깃헙</a>
        </Link>
        <Link href={webLink}>
          <a>구경하기</a>
        </Link>
      </div>
    </div>
  )
}

export default CarouselCard
