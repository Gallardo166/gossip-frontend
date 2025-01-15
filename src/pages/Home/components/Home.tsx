import { useState, useEffect } from "react";
import FilterSystem from "./FilterSystem";
import Post from "./Post";
import type { PostPreviewType } from "../../../types/PostPreview";
import { useOutletContext, useSearchParams } from "react-router";
import fetchData from "../../../utils/fetchData";
import { Category } from "../../../types/Category";

const Home = () => {
  const [posts, setPosts] = useState<PostPreviewType[]>([]);
  const {categories} = useOutletContext<{ categories: Category[] }>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.toString()) {
      fetchData(`http://localhost:3000/posts?${searchParams.toString()}`, setPosts);
    } else {
      fetchData("http://localhost:3000/posts", setPosts);
    }
  }, [searchParams]);

  return (
    <>
      <FilterSystem categories={categories} />
      <main>
        {posts 
          ? posts.map((post, index) => (
              <Post key={index} post={post} />
            ))
          : null}
      </main>
    </>
  )
}

export default Home;