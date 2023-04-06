import Image from "next/image";
import React from "react";
import styles from "./sidebar.module.scss";
import { useGetPosts } from "@/useRequest";
import Link from "next/link";

const Menu = ({ cat }) => {
  const { isLoading, isError, data } = useGetPosts();
  const posts = data?.slice(0, 5);

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  if (isLoading || isError) {
    return null;
  }
  return (
    <div className={styles.sidebar}>
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          {post?.img && (
            <Image
              src={post?.img}
              className={styles.img}
              width={400}
              height={50}
              alt=""
              loader={myLoader}
            />
          )}
          <h2 className={styles.link}>
            <Link
              href={{
                pathname: "/post",
                query: { post: JSON.stringify(post) },
              }}
            >
              {post.title}
            </Link>
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Menu;
