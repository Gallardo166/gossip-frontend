import { useState, useEffect } from "react";
import FilterSystem from "./FilterSystem";
import Post from "./Post";
import type { PostPreviewType } from "../../types/PostPreview";
import { useNavigate, useOutletContext, useSearchParams } from "react-router";
import fetchData from "../../utils/fetchData";
import { Category } from "../../types/Category";
import createURL from "../../utils/createURL";

const Home = () => {
  const [posts, setPosts] = useState<PostPreviewType[]>([]);
  const {categories} = useOutletContext<{ categories: Category[] }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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
      <button onClick={() => navigate(createURL("sort", "time", searchParams))}>By time</button>
      <button onClick={() => navigate(createURL("sort", "favourite", searchParams))}>By favourite</button>
      <main>
        {posts 
          ? posts.map((post) => (
              <Post key={post.id} post={post} />
            ))
          : null}
      </main>
    </>
  )
}

export default Home;