import styles from "../../styles/Slug.module.css";
import {GraphQLClient, gql} from 'graphql-request';
import moment from "moment";

const graphcms = new GraphQLClient('https://api-us-east-1.hygraph.com/v2/cl6jn71ld5fot01uqg2yd5z8k/master');
const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
        title
        slug
        tags
        date
        postUrl
        excerpt
        author {
        name
        }
        coverImage {
        url
        }
    }
    }

`;
const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const slugdata = await graphcms.request(QUERY, { slug });
  const post = slugdata.post;
  return {
    props: {
      post,
    },
    revalidate: 30,
  };
}

export default function BlogPost({ post }) {
  return (
    <main className={styles.blog}>
      <img
        className={styles.cover}
        src={post.coverImage.url}
        alt={post.title}
      />
      <div className={styles.title}>
        <div className={styles.authdetails}>
          <div className={styles.authtext}>
            <h6>By {post.author.name} </h6>
            <h6 className={styles.date}>
              {moment(post.date).format("MMMM d, YYYY")}
            </h6>
          </div>
        </div>
        <h2>{post.title}</h2>
      </div>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.postUrl }}
      ></div>
    </main>
  );
}