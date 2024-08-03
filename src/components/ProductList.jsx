import React, { useEffect, useState } from "react";
import { graphQLClient } from "../api";

const query = `
  {
    products(first: 25) {
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

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await graphQLClient.request(query);
      setProducts(data.products.edges);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.node.id}>
            <h2>{product.node.title}</h2>
            <p>{product.node.description}</p>
            {product.node.images.edges.length > 0 && (
              <img
                src={product.node.images.edges[0].node.src}
                alt={product.node.title}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
