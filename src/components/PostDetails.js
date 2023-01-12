import styles from "./PostDetails.module.css";
import { Link } from "react-router-dom";

export const PostDetails = ({ post }) => {
  return (
    <div className={styles.post_details}>
      {post.image ? (
        <img src={post.image} alt={post.title} />
      ) : (
        <p className={styles.no_image}>Sem imagem!</p>
      )}
      <h2>{post.title}</h2>
      <p className={styles.createdby}>{post.createdBy}</p>
      <div className={styles.tags}>
        {post.tagsArray.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      {/*para ver o post de forma individual, para ver o body dele*/}
      <Link to={`/posts/${post.id}`} className="btn btn-outline">
        Ler
      </Link>
      <hr />
    </div>
  );
};
