import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {GraphQLClient, gql} from 'graphql-request';
import BlogCard from '../components/BlogCard';

const graphcms = new GraphQLClient('https://api-us-east-1.hygraph.com/v2/cl6jn71ld5fot01uqg2yd5z8k/master');
const QUERY = gql`
{
  posts {
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

export async function getStaticProps() {
  const {posts} = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function Home({posts}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard 
          title = {post.title}
          slug = {post.slug}
          tags = {post.tags}
          date = {post.date}
          postUrl = {post.postUrl}
          excerpt = {post.excerpt}
          author={post.author}
          coverImage={post.coverImage}
          />
          ))}
      </main>
    </div>
  )
}
