import { Skeleton } from "@mui/material";

const LoadingPost = () => {
  return (
    <>
      <Skeleton variant="text" width={240} height={36} animation="wave" />
      <Skeleton variant="text" width={360} height={48} animation="wave" />
      <Skeleton variant="text" width={120} height={24} animation="wave" />
      <Skeleton variant="text" sx={{mt: "40px"}} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </>
  )
}

export default LoadingPost;