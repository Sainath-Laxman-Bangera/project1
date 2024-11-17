import React, { useState } from "react";
import styles from "./UpdateModel.module.css";
import { useProduct } from "../store/product";
import Toast from "./Toast";

const UpdateModel = (props) => {
  const { updateProduct } = useProduct();
  const [newproduct, setNewProduct] = useState(props.product);
  const [toast, setToast] = useState({
    status: false,
    message: "",
    bgColor: "lightgreen",
    progbarColor: "darkgreen",
  });
  const handleUpdate = async (pid, newproduct) => {
    const res = await updateProduct(pid, newproduct);
    if (!res.success) {
      setToast({
        ...toast,
        status: true,
        message: res.message,
        bgColor: "pink",
        progbarColor: "red",
      });
      setTimeout(() => {
        setToast({ ...toast, status: false });
      }, 3000);
      //alert(res.message);
    } else {
      setToast({ ...toast, status: true, message: res.message });
      setTimeout(() => {
        setToast({ ...toast, status: false });
        props.cancelButton(false);
      }, 3000);
      //alert(res.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {toast.status === true ? (
        <Toast toast={toast} message={toast.message} crossClose={setToast} />
      ) : (
        ""
      )}

      <div className={styles.updateModel}></div>
      <div
        className={styles.modelBox}
        style={{
          backgroundColor: props.colorSet["bgColor"],
          color: props.colorSet["textColor"],
        }}
      >
        <h1 style={{ margin: "5px", textAlign: "center", width: "100%" }}>
          Update Product Info
        </h1>
        <input
          placeholder="name"
          style={{
            backgroundColor: props.colorSet["bgColor"],
            color: props.colorSet["textColor"],
          }}
          value={newproduct.name}
          onChange={(e) => {
            setNewProduct({ ...newproduct, name: e.target.value });
          }}
        />
        <input
          placeholder="price"
          style={{
            backgroundColor: props.colorSet["bgColor"],
            color: props.colorSet["textColor"],
          }}
          value={newproduct.price}
          onChange={(e) => {
            setNewProduct({ ...newproduct, price: e.target.value });
          }}
        />
        <input
          placeholder="image"
          style={{
            backgroundColor: props.colorSet["bgColor"],
            color: props.colorSet["textColor"],
          }}
          value={newproduct.image}
          onChange={(e) => {
            setNewProduct({ ...newproduct, image: e.target.value });
          }}
        />
        <div className={styles.updateButtons}>
          <div
            onClick={() => handleUpdate(newproduct._id, newproduct)}
            className={styles.updateButton}
            style={{ color: "black", fontWeight: "bolder" }}
          >
            Update
          </div>
          <div
            className={styles.cancelButton}
            style={{ color: "black", fontWeight: "bolder" }}
            onClick={() => props.cancelButton(false)}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModel;
