import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";
import Userprofile from "../../components/userpofile/Userprofile";
import t1 from "../../imgs/t1.svg";
import t2 from "../../imgs/t2.svg";
import t6 from "../../imgs/t6.svg";
import prev from "../../imgs/prev.svg";
function StudentNavbar({ changeModal, modal }) {
  const [modalClass, setModalClass] = useState("");
  const [bool, setBool] = useState(false);
  let navigate = useNavigate();
  const lessonsRef = useRef();
  const balanceRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    if (window.location.pathname === "/student") {
      lessonsRef?.current?.classList?.add("active");
      balanceRef?.current?.classList?.remove("active");
      profileRef?.current?.classList?.remove("active");
    } else if (window.location.pathname === "/student/hisoblar") {
      lessonsRef?.current?.classList?.remove("active");
      balanceRef?.current?.classList?.add("active");
      profileRef?.current?.classList?.remove("active");
    } else if (window.location.pathname === "/student/profile/subs") {
      lessonsRef?.current?.classList?.remove("active");
      balanceRef?.current?.classList?.remove("active");
      profileRef?.current?.classList?.add("active");
    }
    // console.log(window.location.pathname);
    if (
      window.location.pathname === "/student" ||
      window.location.pathname === "/student/hisoblar" ||
      window.location.pathname === "/student/profile/subs" ||
      window.location.pathname === "/"
    ) {
      setBool(false);
    }else{
      setBool(true);
    }
  }, [window.location.pathname]);
  const handleClick = () => {
    changeModal(false);
  };

  return (
    <div
      className={
        modalClass == "qaytish" ? "Nav  user-navbar qaytish" : "Nav user-navbar"
      }
    >
      <div className={modal ? "circle" : "d-none circle"} onClick={handleClick}>
        <img src={prev} alt="prev" />
      </div>
      <div>
        <Userprofile />
      </div>
      {!bool ? (
        <ul className="student_nav_main">
          <li ref={lessonsRef}>
            <img src={t1} alt="" />
            <Link to="/student">darslar</Link>
          </li>
          <li ref={balanceRef}>
            <img src={t2} alt="" />
            <Link to="/student/hisoblar">hisob balans</Link>
          </li>
          <li ref={profileRef}>
            <img src={t6} alt="" />
            <Link to="/student/profile/subs">profile</Link>
          </li>
        </ul>
      ) : (
        <ul className="student_nav_main">
          <li onClick={() => {navigate(-1)}} ref={lessonsRef}>
            <img src={t1} alt="" />
            <Link>orqaga</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default StudentNavbar;
