import React, { useState } from "react";
import styles from "./CreatePage.module.css";
import { useProduct } from "../store/product";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";

const CreatePage = (props) => {
  const { createProduct } = useProduct();
  const [toast, setToast] = useState({
    status: false,
    message: "",
    bgColor: "lightgreen",
    progbarColor: "darkgreen",
  });
  const [newproduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleCreateProduct = async (newproduct) => {
    const res = await createProduct(newproduct);
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
    } else {
      setToast({ ...toast, status: true, message: res.message });
      setTimeout(() => {
        setToast({ ...toast, status: false });
      }, 3000);
      setNewProduct({
        name: "",
        price: "",
        image: "",
      });
    }
  };

  return (
    <div className={styles.createPage}>
      {toast.status === true ? (
        <Toast toast={toast} message={toast.message} crossClose={setToast} />
      ) : (
        ""
      )}
      <div className={styles.createModel}>
        <h1 style={{ color: props.colorSetter["titleColor"] }}>
          Create Product
        </h1>
        <input
          style={{
            backgroundColor: props.colorSetter["bgColor"],
            color: props.colorSetter["textColor"],
          }}
          value={newproduct.name}
          type="text"
          placeholder="Name of the product"
          onChange={(e) => {
            setNewProduct({ ...newproduct, name: e.target.value });
          }}
        />
        <input
          style={{
            backgroundColor: props.colorSetter["bgColor"],
            color: props.colorSetter["textColor"],
          }}
          value={newproduct.price}
          type="text"
          placeholder="Price"
          onChange={(e) => {
            setNewProduct({ ...newproduct, price: e.target.value });
          }}
        />
        <input
          style={{
            backgroundColor: props.colorSetter["bgColor"],
            color: props.colorSetter["textColor"],
          }}
          value={newproduct.image}
          type="text"
          placeholder="Image URL"
          onChange={(e) => {
            setNewProduct({ ...newproduct, image: e.target.value });
          }}
        />
        <div className={styles.buttonsBOX}>
          <button
            onClick={() => {
              handleCreateProduct(newproduct);
            }}
            style={{ backgroundColor: "cyan", border: "none" }}
          >
            Create
          </button>
          <Link
            className={styles.button}
            to={"/"}
            style={{ backgroundColor: "pink", border: "none" }}
          >
            Close
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
