import { useState, useEffect } from "react";
import FilterSystem from "./FilterSystem";

type Post = {
  id: number,
  title: string,
  body: string,
  imageUrl?: string,
  category: string,
  username: string,
  date: string,
  likeCount: number,
  commentCount: number,
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  async function fetchData() {
    try {
      const response = await fetch(
        "http://localhost:3000/posts",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      const resJson = await response.json();
      setPosts(resJson);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <FilterSystem />
      <main>
        {posts.map((post, index) => (
          <div key={index}>
            <p>{post.title}</p>
            <p>{post.body}</p>
            <p>{post.username}</p>
            <p>{post.likeCount}</p>
          </div>
        ))}
      </main>
    </>
  )
}

export default Home;