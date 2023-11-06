import React, { useRef, useState } from "react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import user from "../../../imgs/edit_user.png";
import camera from "../../../imgs/camera.png";

function deleteplatforma(url) {
  try {
    if (url.includes("platforma")) {
      url = url.split("/");
      let res = "";
      for (let i = 2; i < url.length; i++) {
        res += "/" + url[i];
      }
      return res;
    }
    return "/" + url;
  } catch (error) {
    console.log(error);
  }
}


const StudentProfileEdit = () => {
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState([]);

  const fullNameRef = useRef(null);
  const bioRef = useRef(null);
  const joylashuvRef = useRef(null);
  const boglashlinkRef = useRef(null);
  const usernameRef = useRef(null);
  const userimgRef = useRef(null);

  const navigate = useNavigate();

 

  const onBack = () => {
    navigate("/student/profile/subs");
  };
  
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setImage(imageUrl);
  };


  const onHandleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", fullnameRef.current.value);
    formData.append("mutahasislik", mutahasislikRef.current.value);
    formData.append("bio", bioRef.current.value);
    formData.append("joylashuv", joylashuvRef.current.value);
    formData.append("boglashlink", boglashlinkRef.current.value);
    formData.append("username", usernameRef.current.value);
    formData.append("file", userimgRef.current.files[0]); 

    axios
      .put("https://api.ilmlar.com/teacher/", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/teacher/profile");
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className="app-content">
      <div className={style.edit_profile}>
        <button onClick={onBack} className={style.back}>
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <div className={style.imgs_div}>
          <img src={user}  className={style.imgs_div_img} alt="" />
          <div className={style.select_camera_wrap}>
            <img src={camera} alt="camera img" />
            <input
              type="file"
              className={style.img_file_input}
              onChange={handleImageChange}
            />
          </div>
        </div>
        <form onSubmit={(e) => onHandleSubmit(e)} className={style.form}>
          <input type="text" placeholder="ism" />
          <input type="text" placeholder="familiya" />  
          <input type="text" placeholder="username" />
          <input type="password" placeholder="parol" />
          <button>Saqlash</button>
        </form>
      </div>
    </div>
  );
};

export default StudentProfileEdit;
