export type Post = {
  title: string;
  body: string;
  imageUrl?: string;
  category: string;
  username: string;
  date: string;
  likeCount: number;
  comments: string[] | null;
}