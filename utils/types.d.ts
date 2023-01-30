export interface Frontmatter {
  title: string
  date: string
  excerpt: string
  thumbnail: string
}

export interface PostProps {
  frontmatter: Frontmatter
  slug: string
  content: string
}

export interface PostsType {
  title: string
  posts: PostProps[]
}
