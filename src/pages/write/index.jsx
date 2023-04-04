import React, { useContext, useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";
import styles from "./write.module.scss";
import dynamic from "next/dynamic";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
import { useCreatePost } from "@/useRequest";
import { AuthContext } from "@/context/authContext";
import Router from "next/router";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Write = () => {
  const router = useRouter();
  const { post: data } = router.query;
  const post = data ? JSON.parse(data) : {};

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
        }
  );

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const {
    isLoading,
    isSuccess,
    mutate,
    data: createdPost,
  } = useCreatePost({ ...inputs, desc });

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const save = () => {
    // save image
    mutate();
    if (isSuccess) {
      Router.push({ pathname: "/post", query: JSON.stringify(createdPost) });
    }
  };

  const handleClickSaveDraft = async (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, draft: true }));
    save();
  };

  const handleClickPublish = async (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, draft: false }));
    save();
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.add}>
        <div className={styles.content}>
          <input
            type="text"
            value={inputs.title || "Title"}
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
            <label className={styles.file} htmlFor="file">
              Upload Image
            </label>
          </div>
          <div className={styles.item}>
            <h1>Visibility</h1>
            <div className={styles.cat}>
              <input
                type="radio"
                checked={inputs?.draft === true}
                name="draft"
                value={true}
                id="draft"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="art">Draft</label>
            </div>
            <div className={styles.cat}>
              <input
                type="radio"
                checked={inputs?.draft === false}
                name="draft"
                value={false}
                id="draft"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="science">Public</label>
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
                onChange={(e) => handleChange(e.target)}
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
