import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { graphQLClient } from "../api";
import "./ProductList.css";

const query = `
  query($first: Int!, $after: String) {
    products(first: $first, after: $after) {
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
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchProducts = async (cursor = null) => {
    try {
      const variables = { first: 10, after: cursor };
      const data = await graphQLClient.request(query, variables);

      const newProducts = data.products.edges.map((edge) => edge.node);

      setProducts((prevProducts) => {
        // Eliminar productos duplicados basados en ID
        const uniqueProducts = [
          ...prevProducts,
          ...newProducts.filter(
            (newProduct) =>
              !prevProducts.some(
                (existingProduct) => existingProduct.id === newProduct.id
              )
          ),
        ];
        return uniqueProducts;
      });

      setCursor(data.products.pageInfo.endCursor);
      setHasNextPage(data.products.pageInfo.hasNextPage);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const loadMore = () => {
    if (hasNextPage) {
      fetchProducts(cursor);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
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
                <div className="product-details">
                  <h2 className="product-title">{product.title}</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {hasNextPage && (
        <button onClick={loadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default ProductList;
