import React, { Suspense, useContext, useState } from "react";
import "react-quill/dist/quill.snow.css";
import styles from "./write.module.scss";
import dynamic from "next/dynamic";
import Footer from "@/components/footer/Footer";
import { useRouter } from "next/router";
import { useCreatePost, useSaveImage } from "@/useRequest";
import { AuthContext } from "@/context/authContext";
import Router from "next/router";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false });

const Write = () => {
  const router = useRouter();
  const { post: data } = router.query;
  const post = data ? JSON.parse(data) : null;

  const { currentUser } = useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState(post?.desc || "");
  const [inputs, setInputs] = useState(
    post
      ? { ...post, user: currentUser?._id }
      : {
          value: "",
          title: "",
          cat: "",
          user: currentUser?._id,
          draft: true,
        }
  );

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { isLoading, isSuccess, mutate, isError } = useCreatePost(file, {
    ...inputs,
    desc,
  });

  if (isSuccess) {
    Router.push("/");
  }

  const handleClickPublish = async (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, draft: false }));
    mutate();
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.add}>
        <div className={styles.content}>
          <input
            type="text"
            value={inputs.title}
            name="title"
            onChange={(e) => handleChange(e)}
          />
          <div className={styles.editorContainer}>
            <ReactQuill
              className={styles.editor}
              theme="snow"
              value={desc}
              onChange={setDesc}
              name="desc"
            />
          </div>
          <div className={styles.buttons}>
            <button onClick={(e) => handleClickPublish(e)}>
              {isLoading ? "Please wait" : "Publish"}
            </button>
          </div>
          {isError && <p style={{ color: "red" }}>Something went wrong</p>}
        </div>
        <div className={styles.menu}>
          <div className={styles.item}>
            <h1>Publish</h1>
            <span>
              <b>Status: </b> {post ? "Published" : "Draft"}
            </span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name=""
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file && (
              <Image
                className={styles.smallImage}
                src={URL.createObjectURL(file)}
                alt="ae"
                height={70}
                width={70}
              />
            )}
            <label className={styles.file} htmlFor="file">
              Upload Image
            </label>
          </div>
          <div className={styles.item}>
            <h1>Visibility</h1>
            <div
              className={styles.cat}
              onClick={() =>
                setInputs((prev) => ({ ...prev, draft: !inputs?.draft }))
              }
            >
              <input type="radio" checked={inputs?.draft} />
              <label htmlFor="draft">Draft</label>
            </div>
            <div
              className={styles.cat}
              onClick={() =>
                setInputs((prev) => ({ ...prev, draft: !inputs?.draft }))
              }
            >
              <input type="radio" checked={!inputs?.draft} />
              <label htmlFor="draft">Public</label>
            </div>
          </div>
          <div className={styles.item}>
            <h1>Category</h1>
            <div className={styles.cat}>
              <input
                type="radio"
                checked={inputs?.cat === "art"}
                name="cat"
                value="art"
                id="art"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="art">Art</label>
            </div>
            <div className={styles.cat}>
              <input
                type="radio"
                checked={inputs?.cat === "science"}
                name="cat"
                value="science"
                id="science"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="science">Science</label>
            </div>
            <div className={styles.cat}>
              <input
                type="radio"
                checked={inputs?.cat === "technology"}
                name="cat"
                value="technology"
                id="technology"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className={styles.cat}>
              <input
                type="radio"
                checked={inputs?.cat === "cinema"}
                name="cat"
                value="cinema"
                id="cinema"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="cinema">Cinema</label>
            </div>
            <div className={styles.cat}>
              <input
                type="radio"
                checked={inputs?.cat === "design"}
                name="cat"
                value="design"
                id="design"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="design">Design</label>
            </div>
            <div className={styles.cat}>
              <input
                type="radio"
                checked={inputs?.cat === "food"}
                name="cat"
                value="food"
                id="food"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="food">Food</label>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Write;
