import React, { useEffect, useState } from "react";
import styles from "./Product.module.css";
import ProductCard from "../components/ProductCard";
import { useProduct } from "../store/product";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";

const ProductPage = (props) => {
  const { fetchProducts, products } = useProduct();
  const [toast, setToast] = useState({
    status: false,
    message: "",
    bgColor: "lightgreen",
    progbarColor: "darkgreen",
  });
  useEffect(() => {
    fetchProducts();
    props.prodLength(products.length);
  }, [fetchProducts, products, toast]);
  return (
    <div
      style={{
        width: "100%",
        paddingTop: "50px",
      }}
    >
      <h1
        className={styles.currentProduct}
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        Current Products &#128640;
      </h1>
      <div className={styles.productPage}>
        {products.length !== 0 ? (
          products.map((item) => (
            <ProductCard
              deletToast={setToast}
              colorSet={props.colorSetter}
              key={item._id}
              product={item}
            />
          ))
        ) : (
          <div
            style={{ height: "100%", color: props.colorSetter["textColor"] }}
          >
            No products found to display &#128531;{" "}
            <Link to={"/create"}>Create Product</Link>
          </div>
        )}
      </div>
      {toast.status === true ? (
        <Toast toast={toast} message={toast.message} crossClose={setToast} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductPage;
