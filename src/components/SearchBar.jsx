import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { graphQLClient } from "../api";
import "./SearchBar.css";

const query = `
  query ($query: String!) {
    products(first: 10, query: $query) {
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

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value.length > 0) {
      const variables = { query: e.target.value };
      const data = await graphQLClient.request(query, variables);
      setResults(data.products.edges.map((edge) => edge.node));
    } else {
      setResults([]);
    }
  };

  const handleResultClick = () => {
    setSearchTerm("");
    setResults([]);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar producto..."
        className="search-input"
      />
      {results.length > 0 && (
        <div className="search-results">
          {results.map((product) => {
            const productId = product.id.split("/").pop();
            return (
              <Link
                key={productId}
                to={`/product/${productId}`}
                className="search-result-item"
                onClick={handleResultClick}
              >
                <img
                  src={product.images.edges[0]?.node.src}
                  alt={product.title}
                  className="search-result-image"
                />
                <span>{product.title}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
