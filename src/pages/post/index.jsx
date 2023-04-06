import React, { useEffect, useState } from "react";
import Edit from "../../img/edit.png";
import Delete from "../../img/delete.png";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import styles from "./single.module.scss";
import Link from "next/link";
import Footer from "@/components/footer/Footer";
import Sidebar from "@/components/sidebar";
import Image from "next/image";
import DOMPurify from "dompurify";
import { useRouter } from "next/router";
import { useDelete } from "@/useRequest";
import dynamic from "next/dynamic";
import Router from "next/router";

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false });

const Post = () => {
  const router = useRouter();
  const { post: data } = router.query;
  const { currentUser } = useContext(AuthContext);
  const post = data ? JSON.parse(data) : null;

  const { mutate, isSuccess } = useDelete(post?._id);

  if (isSuccess) {
    Router.push("/");
  }

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const sanitize = (text) => {
    const isBrowser = typeof window !== "undefined";
    return isBrowser ? DOMPurify.sanitize(text) : null;
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.single}>
        <div className={styles.content}>
          {post?.img && (
            <Image
              src={post?.img}
              alt=""
              className={styles.img}
              loader={myLoader}
              height={400}
              width={100}
            />
          )}
          <div className={styles.user}>
            <div className={styles.info}>
              <span>{post?.username}</span>
              <p>Posted {moment(post?.updatedAt).fromNow()}</p>
            </div>
            {currentUser?.username === post?.user?.username && (
              <div className={styles.edit}>
                <Link
                  href={{
                    pathname: "/write",
                    query: { post: JSON.stringify(post) },
                  }}
                >
                  <Image src={Edit} alt="" className={styles.smallImg} />
                </Link>
                <Image
                  onClick={() => {
                    mutate(post?._id);
                  }}
                  src={Delete}
                  alt=""
                  className={styles.smallImg}
                />
              </div>
            )}
          </div>
          <h1>{post?.title}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: sanitize(post?.desc),
            }}
          ></p>
        </div>
        <Sidebar cat={post?.cat} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Post;
