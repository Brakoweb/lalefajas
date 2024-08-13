import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { graphQLClient } from "../api";
import "./FeaturedProducts.css";

const query = `
  query {
    products(first: 4, sortKey: BEST_SELLING) {
      edges {
        node {
          id
          title
          description
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

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const variables = { first: 10, after: cursor };
        const data = await graphQLClient.request(query, variables);
        const newProducts = data.products.edges.map((edge) => edge.node);
        setProducts(newProducts);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="featured-products">
      <h2>Productos Destacados</h2>
      <div className="products-list">
        {products.map((product) => {
          const productId = product.id.split("/").pop(); // Extraer solo el ID numérico
          return (
            <Link
              key={productId}
              to={`/product/${productId}`}
              className="product-link"
            >
              <div className="product-card">
                {product.images.edges.length > 0 && (
                  <img
                    src={product.images.edges[0].node.src}
                    alt={product.title}
                    className="product-image"
                  />
                )}
                <h3 className="product-title">{product.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
