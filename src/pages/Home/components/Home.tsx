import { useState, useEffect } from "react";
import FilterSystem from "../../../components/FilterSystem";
import Post from "./Post";
import type { PostType } from "../types/PostPreview";

const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

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
          <Post key={index} post={post} />
        ))}
      </main>
    </>
  )
}

export default Home;