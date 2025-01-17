export type CommentType = {
  id: number;
  username: string;
  body: string;
  date: string;
  likeCount: number;
  replyCount: number;
  parentId: number;
}