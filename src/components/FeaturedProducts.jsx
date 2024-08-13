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
          vendor
          variants(first: 5) {
            edges {
              node {
                id
                title
                image {
                  src
                }
                selectedOptions {
                  name
                  value
                }
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await graphQLClient.request(query);
        const newProducts = data.products.edges.map((edge) => ({
          ...edge.node,
          selectedVariant: edge.node.variants.edges[0].node, // Seleccionar la primera variante por defecto
        }));
        setProducts(newProducts);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleVariantChange = (productId, variantId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              selectedVariant: product.variants.edges.find(
                (variant) => variant.node.id === variantId
              ).node,
            }
          : product
      )
    );
  };

  const mapColor = (color) => {
    switch (color.toLowerCase()) {
      case "brown":
        return "sienna";
      case "blue":
        return "cyan";
      default:
        return color.toLowerCase();
    }
  };

  return (
    <div className="featured-products">
      <h2>Productos Destacados</h2>
      <div className="products-list">
        {products.map((product) => {
          const productId = product.id.split("/").pop(); // Extraer solo el ID numérico
          return (
            <div key={productId} className="product-card">
              <Link to={`/product/${productId}`} className="product-link">
                <img
                  src={product.selectedVariant.image.src}
                  alt={product.title}
                  className="product-image"
                />
                <h3 className="product-title">{product.title}</h3>
              </Link>
              <div className="color-variants">
                {product.variants.edges
                  .filter((variant) =>
                    variant.node.selectedOptions.find(
                      (option) => option.name === "Color"
                    )
                  )
                  .map((variant) => {
                    const colorOption = variant.node.selectedOptions.find(
                      (option) => option.name === "Color"
                    );
                    return (
                      <div
                        key={variant.node.id}
                        className="color-dot"
                        style={{
                          backgroundColor: colorOption
                            ? mapColor(colorOption.value)
                            : "#ccc", // Color por defecto si no existe opción de "Color"
                        }}
                        onClick={() =>
                          handleVariantChange(product.id, variant.node.id)
                        }
                      />
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
