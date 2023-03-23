import React, { useEffect, useState } from "react";
import Edit from "../../img/edit.png";
import Delete from "../../img/delete.png";
import Menu from "../../components/sidebar";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import styles from "./single.module.scss";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer/Footer";
import Sidebar from "@/components/sidebar";
import Image from "next/image";

const Post = () => {
  // const router = useRouter();
  // const { cat } = router.query;

  const [post, setPost] = useState({
    id: 4,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  });

  // const location = useLocation();
  // const navigate = useNavigate();

  // const postId = location.pathname.split("/")[2];

  // const { currentUser } = useContext(AuthContext);
  const currentUser = "";

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const res = await axios.get(`/posts/${postId}`);
    //     setPost(res.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();
  }, []);

  const handleDelete = async () => {
    // try {
    //   await axios.delete(`/posts/${postId}`);
    //   navigate("/");
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.single}>
        <div className={styles.content}>
          <Image
            src={post?.img}
            alt=""
            className={styles.img}
            loader={myLoader}
            height={400}
            width={100}
          />
          <div className={styles.user}>
            {post.userImg && (
              <Image
                src={post.userImg}
                className={styles.smallImg}
                alt=""
                loader={myLoader}
              />
            )}
            <div className={styles.info}>
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser.username === post.username && (
              <div className={styles.edit}>
                <Link href={`/write?edit=2`} state={post}>
                  <Image src={Edit} alt="" className={styles.smallImg} />
                </Link>
                <Image
                  onClick={handleDelete}
                  src={Delete}
                  alt=""
                  className={styles.smallImg}
                />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
        </div>
        <Sidebar cat={post.cat} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Post;
