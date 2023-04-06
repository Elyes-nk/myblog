import Footer from "@/components/footer/Footer";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./index.module.scss";
import { useGetPosts } from "@/useRequest";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";
import Loading from "../img/loading.gif";
import { getText } from "@/helpers";

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false });

export default function Home() {
  const router = useRouter();
  const { cat, myposts } = router.query;
  const { currentUser } = useContext(AuthContext);

  const options = {};

  if (cat) {
    options.cat = cat;
  }

  if (myposts) {
    options.user = currentUser?._id;
    options.withDraft = true;
  }

  const { isLoading, isError, data: posts } = useGetPosts(options);

  // Load url image
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const LoadingContent = () => (
    <div className={styles.emptyContent}>
      <Image src={Loading} height={100} width={120} alt="loading" />
    </div>
  );

  const ErrorContent = () => (
    <div className={styles.emptyContent}>
      <p>An error occured please retry later.</p>
    </div>
  );

  const EmptyContent = () => (
    <div className={styles.emptyContent}>
      <p>No results {cat ? "for " + cat : ""}</p>
    </div>
  );

  const Content = () => (
    <div className={styles.home}>
      <div className={styles.posts}>
        {posts.map((post) => (
          <div className={styles.post} key={post.id}>
            <div className={styles.img}>
              {isLoading ? (
                <div className={styles.image}>
                  <Skeleton style={{ height: 400, width: 470 }} />
                </div>
              ) : (
                <>
                  {post?.img && (
                    <Image
                      loader={myLoader}
                      src={post.img}
                      className={styles.image}
                      alt=""
                      height={400}
                      width={100}
                    />
                  )}
                </>
              )}
            </div>
            <div className={styles.content}>
              <Link
                href={{
                  pathname: "/post",
                  query: { post: JSON.stringify(post) },
                }}
                className={styles.link}
              >
                <h1>{post.title || <Skeleton />}</h1>
              </Link>
              <p>{getText(post.desc) || <Skeleton count={4} />}</p>
              {!isLoading && (
                <div className={styles.postFooter}>
                  <Link
                    href={{
                      pathname: "/post",
                      query: { post: JSON.stringify(post) },
                    }}
                    className={styles.link}
                  >
                    <button>Read more</button>
                  </Link>
                  <p>
                    {post.draft ? "Draft created" : "Posted"}{" "}
                    {moment(post.updatedAt).fromNow()} By {post?.user?.username}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <Navbar />
      {isLoading ? (
        <LoadingContent />
      ) : isError ? (
        <ErrorContent />
      ) : posts?.length > 0 ? (
        <Content />
      ) : (
        <EmptyContent />
      )}
      <Footer />
    </React.Fragment>
  );
}
