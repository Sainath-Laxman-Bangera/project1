import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { BsPlusSquare } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { IoMoonSharp } from "react-icons/io5";

const Navbar = (props) => {
  const [icon, setIcon] = useState(true);
  const handleBackgroundColor = (bool, clr) => {
    props.toggleBackgroundColor({
      ...props.toggleBackgroundColor,
      bgColor: clr,
      textColor: clr === "white" ? "black" : "white",
      titleColor: clr === "white" ? "black" : "white",
      priceColor: clr === "white" ? "darkgreen" : "grey",
      cardColor: clr === "white" ? "white" : "rgb(26, 26, 29)",
    });
    setIcon(bool);
  };

  return (
    <div
      className={styles.navbar}
      style={
        icon === true
          ? { backgroundColor: "white" }
          : { backgroundColor: "black" }
      }
    >
      <div
        style={{
          maxWidth: "1140px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div className={styles.productPage}>
          <Link className={styles.productLink} to={"/"}>
            Product page &#128722;
          </Link>
        </div>
        <div className={styles.iconsNav}>
          <Link
            className={styles.plus}
            style={{ paddingRight: "5px" }}
            to={"/create"}
          >
            <BsPlusSquare
              className={styles.plusSquare}
              style={icon === true ? { color: "#03697a" } : { color: "white" }}
            />
          </Link>
          {icon === true ? (
            <IoMoonSharp
              className={styles.fiMoon}
              onClick={() => handleBackgroundColor(false, "rgb(37,37,38)")}
            />
          ) : (
            <FiSun
              onClick={() => handleBackgroundColor(true, "white")}
              className={styles.fiSun}
              style={{ paddingRight: "5px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
