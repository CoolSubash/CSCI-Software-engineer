import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UpdateProduct.css";

const UpdateProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    product_details: "",
    product_images: [
      { url: "", alt_text: "" },
      { url: "", alt_text: "" },
    ],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch product data by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await fetch(
          `http://127.0.0.1:5000/api/v1/products/${id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to load product");
        }

        const data = await response.json();
        const product = data.product;

        setFormData({
          name: product.name || "",
          description: product.product_details?.detailed_description || "",
          price: product.price ?? "",
          quantity: product.product_details?.quantity ?? "",
          product_details: product.product_details?.detailed_description || "",
          product_images: Array.isArray(product.product_image)
            ? product.product_image.map((img) => ({
                url: img.image_url,
                alt_text: img.image_alt_text,
              }))
            : [
                { url: "", alt_text: "" },
                { url: "", alt_text: "" },
              ],
        });

        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleImageChange = (index, field, value) => {
    const updatedImages = [...formData.product_images];
    updatedImages[index][field] = value;
    setFormData((prev) => ({ ...prev, product_images: updatedImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = sessionStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/v1/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(response)

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product");
      }

      const result = await response.json();
      console.log("Product updated successfully:", result);
      alert("Product updated successfully!");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Error updating product: " + err.message);
    }
  };

  if (loading) return <p>Loading product data...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="product-create-container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            min={1}
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            min={1}
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Product Details:
          <textarea
            name="product_details"
            value={formData.product_details}
            onChange={handleChange}
            required
          />
        </label>

        <h4>Product Images:</h4>
        {formData.product_images.map((image, index) => (
          <div key={index} className="image-fields">
            <input
              type="text"
              placeholder="Image URL"
              value={image.url}
              onChange={(e) => handleImageChange(index, "url", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Alt Text"
              value={image.alt_text}
              onChange={(e) =>
                handleImageChange(index, "alt_text", e.target.value)
              }
              required
            />
          </div>
        ))}

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
