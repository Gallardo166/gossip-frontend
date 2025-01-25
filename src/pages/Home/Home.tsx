import { useState, useEffect, useContext } from "react";
import FilterSystem from "./FilterSystem";
import SortingSystem from "./SortingSystem";
import Post from "./Post";
import type { PostPreviewType } from "../../types/PostPreview";
import { useOutletContext, useSearchParams } from "react-router";
import { fetchData } from "../../utils/fetchFunctions";
import { Category } from "../../types/Category";
import { AuthContext } from "../../contexts";
import { Link } from "react-router-dom";
import "../../styles/Home/Home.css";
import { Fab, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SickIcon from '@mui/icons-material/Sick';

const Home = () => {
  const [posts, setPosts] = useState<PostPreviewType[]>([]);
  const {categories} = useOutletContext<{ categories: Category[] }>();
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.toString()) {
      fetchData(`${import.meta.env.VITE_URL}/posts?${searchParams.toString()}`, setPosts);
    } else {
      fetchData(import.meta.env.VITE_URL + "/posts", setPosts);
    }
    window.scrollTo(0, 0);
    document.title = "Gossip";
  }, [searchParams]);

  return (
    <>
      <div className="controls">
          <div className="controlsLeft">
            <FilterSystem categories={categories} />
            <SortingSystem />
          </div>
          {user
            ? <Link to="/user/create">
                <Fab color="primary" size="medium" aria-label="create" className="createPost">
                <AddIcon />
              </Fab></Link>
            : null}
        </div>
        <section className="posts">
          {posts
            ? posts.map((post) => (
                <Post key={post.id} post={post} />
              ))
            : <div className="noPosts">
                <SickIcon />
                <Typography>No posts found!</Typography>
              </div>}
        </section>
    </>
  )
}

export default Home;