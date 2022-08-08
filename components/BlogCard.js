import styles from "../styles/BlogCard.module.css";
import Link from "next/link";
/*import Image from "next/image";*/

function BlogCard({ title, slug, tags, date, postUrl, excerpt, author, coverImage }) {
  return (
    <div className={styles.card}>
        <Link href={`/posts/${slug}`}>
            <div className={styles.imgContainer}>
                <a href={postUrl}>
                    <img layout="fill" src={coverImage.url} alt="" />
                </a>
            </div>
        </Link>
        <div className={styles.text}>
            <h2>{title}</h2>
        </div>
        <div className={styles.details}>
            <div className={styles.author}>
                <h3>{author.name}</h3>
                {/*<h3>{moment(date).format("MMMM d, YYYY")}</h3>*/}
                <h3>{excerpt}</h3>
                <h3>{tags}</h3>
            </div>
        </div>
    </div>
  );
}

{
  /* <div dangerouslySetInnerHTML={{ __html: content.html }}></div> */
}
export default BlogCard;