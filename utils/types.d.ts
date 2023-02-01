export interface FrontmatterType {
  title: string
  date: string
  category: string
  excerpt: string
  thumbnail: string
}

export interface PostDetailType {
  frontmatter: Frontmatter
  slug?: string
  content: string
}

export interface PostListType {
  title: string
  posts: PostProps[]
}
