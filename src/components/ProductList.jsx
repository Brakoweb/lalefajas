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
      console.log(data);

      const newProducts = data.products.edges.map((edge) => ({
        ...edge.node,
        selectedVariant: edge.node.variants.edges[0]?.node || null, // Seleccionar la primera variante por defecto si existe
      }));

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

  // Función para mapear colores específicos
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

          // Crear un conjunto para almacenar colores únicos
          const uniqueColors = new Set();

          return (
            <div key={productId} className="product-card">
              <Link to={`/product/${productId}`} className="product-link">
                <img
                  src={
                    product.selectedVariant?.image.src ||
                    product.images.edges[0].node.src
                  } // Usa la imagen de la variante seleccionada o la imagen principal
                  alt={product.title}
                  className="product-image"
                />
                <h3 className="product-title">{product.title}</h3>
              </Link>
              <div className="color-variants">
                {product.variants.edges
                  .filter((variant) => {
                    const colorOption = variant.node.selectedOptions.find(
                      (option) => option.name.toLowerCase() === "color"
                    );
                    if (
                      colorOption &&
                      !uniqueColors.has(colorOption.value.toLowerCase())
                    ) {
                      uniqueColors.add(colorOption.value.toLowerCase());
                      return true;
                    }
                    return false;
                  })
                  .map((variant) => {
                    const colorOption = variant.node.selectedOptions.find(
                      (option) => option.name.toLowerCase() === "color"
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
                        onClick={() => {
                          handleVariantChange(product.id, variant.node.id);
                        }}
                      />
                    );
                  })}
              </div>
            </div>
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
