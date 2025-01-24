import { Skeleton } from "@mui/material";

const LoadingPosts = () => {
  return (
    <>
      <Skeleton animation="wave" variant="rounded" height={240} />
      <Skeleton animation="wave" variant="rounded" height={240} />
      <Skeleton animation="wave" variant="rounded" height={240} />
      <Skeleton animation="wave" variant="rounded" height={240} />
    </>
  )
}

export default LoadingPosts;