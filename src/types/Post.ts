import { CommentType } from "./Comment";

export interface UnparsedPostType  {
  title: string;
  body: string;
  imageUrl?: string;
  category: string;
  username: string;
  date: string;
  likeCount: number;
  comments: string[];
}

export interface PostType {
  title: string;
  body: string;
  imageUrl?: string;
  category: string;
  username: string;
  date: string;
  likeCount: number;
  comments: CommentType[] | null;
}


