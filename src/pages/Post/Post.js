import styles from "./Post.module.css";

// hooks
import { useParams } from "react-router-dom";

export const Post = () => {
  const { id } = useParams();

  return <div>Post: {id}</div>;
};
