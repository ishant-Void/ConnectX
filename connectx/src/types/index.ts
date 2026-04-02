export interface User {
  id: string
  name: string
  username: string
  avatar: string
  bio?: string
  location?: string
  website?: string
  joinedDate?: string
  following: number
  followers: number
  posts: number
  isOnline?: boolean
}

export interface Post {
  id: string
  author: User
  content: string
  images?: string[]
  createdAt: string
  timeAgo: string
  likes: number
  comments: number
  shares: number
  isLiked?: boolean
  isBookmarked?: boolean
}

export interface TrendingTopic {
  category: string
  topic: string
  postCount: string
}

export interface SuggestedUser {
  id: string
  name: string
  username: string
  avatar: string
}

export interface Notification {
  id: string
  type: 'like' | 'comment' | 'follow' | 'share' | 'mention'
  user: User
  content: string
  timeAgo: string
  read: boolean
  post?: Post
}
