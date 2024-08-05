// src/components/Product.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { graphQLClient } from "../api";
import "./Product.css";

const query = `
  query ($id: ID!) {
    product(id: $id) {
      id
      title
      description
      images(first: 3) {
        edges {
          node {
            src
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const variables = { id: `gid://shopify/Product/${id}` }; // Reconstruir el ID completo
        const data = await graphQLClient.request(query, variables);
        console.log("Product data:", data);
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product">
      <h1>{product.title}</h1>
      <div className="product-images">
        {product.images.edges.map((image, index) => (
          <img key={index} src={image.node.src} alt={product.title} />
        ))}
      </div>
      <p>{product.description}</p>
      <p>
        Price: {product.priceRange.minVariantPrice.amount}{" "}
        {product.priceRange.minVariantPrice.currencyCode}
      </p>
    </div>
  );
};

export default Product;
