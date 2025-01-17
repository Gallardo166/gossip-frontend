import { UnparsedPostType, PostType } from "../types/Post";

export default function parseComments(post: UnparsedPostType): PostType {
  if (post.comments) {
    post.comments = post.comments.map((comment) => JSON.parse(comment));
  }
  return post as unknown as PostType;
}