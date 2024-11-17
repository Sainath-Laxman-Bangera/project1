import { create } from "zustand";

export const useProduct = create((set) => ({
  products: [],
  setProducts: (product) => ({ product }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill all the fields" };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product Created Succesfully" };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (pid, newUpdateProduct) => {
    if (
      !newUpdateProduct.name ||
      !newUpdateProduct.price ||
      !newUpdateProduct.image
    ) {
      return { success: false, message: "Dont leave any field empty" };
    }

    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUpdateProduct),
    });

    const data = await res.json();
    if (!data.success) {
      return { success: false, message: "Error while updating" };
    }
    set((state) => ({
      products: state.products.map((item) =>
        item._id === pid ? data.data : item
      ),
    }));
    return { success: true, message: "Updated successfully" };
  },
}));
