import { Post } from "../types/Post";

export default function parseComments(post: Post) {
  if (post.comments) {
    post.comments = post.comments.map((comment) => JSON.parse(comment));
  }
  return post;
}