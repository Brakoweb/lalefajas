import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { graphQLClient } from "../api";
import "./ProductList.css";

const query = `
  {
    products(first: 10) {
      edges {
        node {
          id
          title
          images(first: 1) {
            edges {
              node {
                src
              }
            }
          }
        }
      }
    }
  }
`;

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await graphQLClient.request(query);
        setProducts(data.products.edges);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
        {products.map((product) => {
          const productId = product.node.id.split("/").pop(); // Extraer solo el ID numérico
          return (
            <Link
              key={productId}
              to={`/product/${productId}`}
              className="product-card-link"
            >
              <div className="product-card">
                {product.node.images.edges.length > 0 && (
                  <img
                    src={product.node.images.edges[0].node.src}
                    alt={product.node.title}
                    className="product-image"
                  />
                )}
                <div className="product-details">
                  <h2 className="product-title">{product.node.title}</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
