import { useState, useEffect } from "react";
import FilterSystem from "../../../components/FilterSystem";
import Post from "./Post";
import type { PostType } from "../types/PostPreview";
import { useSearchParams } from "react-router";
import fetchData from "../../../utils/fetchData";

const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const title = searchParams.get("title");
    if (!title) {
      fetchData("http://localhost:3000/posts", setPosts);
    } else {
      fetchData(`http://localhost:3000/posts/${title}`, setPosts);
    }
    
  }, [searchParams]);

  return (
    <>
      <FilterSystem />
      <main>
        {posts ? posts.map((post, index) => (
          <Post key={index} post={post} />
        )) : null}
      </main>
    </>
  )
}

export default Home;