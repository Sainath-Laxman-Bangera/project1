import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useProduct } from "../store/product";
import UpdateModel from "./UpdateModel";
import Toast from "./Toast";

const ProductCard = (props) => {
  const { deleteProduct } = useProduct();
  const [model, setModel] = useState(false);

  const handleDelete = async (pid) => {
    const res = await deleteProduct(pid);
    if (!res.success) {
      props.deletToast({
        ...props.deletToast,
        status: true,
        message: res.message,
        bgColor: "pink",
        progbarColor: "red",
      });
      setTimeout(() => {
        props.deletToast({ ...props.deletToast, status: false });
      }, 3000);
    } else {
      props.deletToast({
        ...props.deletToast,
        status: true,
        message: res.message,
        bgColor: "lightgreen",
        progbarColor: "darkgreen",
      });
      setTimeout(() => {
        props.deletToast({ ...props.deletToast, status: false });
      }, 3000);
      // alert(res.message);
    }
  };
  return (
    <div
      className={styles.productCard}
      style={{ backgroundColor: props.colorSet["cardColor"] }}
    >
      <img src={props.product.image} />
      <h2 style={{ color: props.colorSet["titleColor"], marginBottom: "5px" }}>
        {props.product.name}
      </h2>
      <h4 style={{ color: props.colorSet["priceColor"], marginBottom: "5px" }}>
        $ {props.product.price}
      </h4>
      <div
        style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}
      >
        <FaEdit
          style={{
            backgroundColor: "rgb(125, 249, 255)",
            width: "30px",
            padding: "5px",
            height: "30px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setModel(true)}
        />
        <MdDeleteOutline
          onClick={() => handleDelete(props.product._id)}
          style={{
            backgroundColor: "pink",
            padding: "5px",
            width: "30px",
            height: "30px",
            marginLeft: "5px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        />
      </div>
      {model === true ? (
        <UpdateModel
          prodToast={props.toast}
          product={props.product}
          cancelButton={setModel}
          colorSet={props.colorSet}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductCard;
