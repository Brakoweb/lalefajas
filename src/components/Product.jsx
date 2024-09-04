import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { graphQLClient } from "../api";
import { Carousel } from "react-responsive-carousel";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Product.css";
import { CartContext } from "../context/CartContext";
import GirdleApp from "./calc/GirdleApp";
import ChinGirdleApp from "./calc/ChinGirdleApp";
import BraSizeCalculator from "./calc/BraSizeCalculator";

const query = `
  query ($id: ID!) {
    product(id: $id) {
      id
      title
      description
      images(first: 50) {
        edges {
          node {
            src
          }
        }
      }
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
            image {
              src
            }
          }
        }
      }
    }
  }
`;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [showMessage, setShowMessage] = useState(false); // Estado para mostrar el mensaje
  const [isAdding, setIsAdding] = useState(false); // Estado para deshabilitar el botón

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const variables = { id: `gid://shopify/Product/${id}` }; // Reconstruir el ID completo
        const data = await graphQLClient.request(query, variables);
        setProduct(data.product);
        if (data.product.variants.edges.length > 0) {
          setSelectedVariant(data.product.variants.edges[0].node);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const calculadoraTag = product.tags.find((tag) =>
    ["calculadora 1", "calculadora 2", "calculadora 3"].includes(tag)
  );

  const handleVariantChange = (optionName, value) => {
    if (!product) return;

    const selectedOptions = selectedVariant.selectedOptions.map((option) => {
      if (option.name === optionName) {
        return { ...option, value };
      }
      return option;
    });

    const variant = product.variants.edges.find((variant) =>
      variant.node.selectedOptions.every(
        (option) =>
          selectedOptions.find((selected) => selected.name === option.name)
            ?.value === option.value
      )
    );

    if (variant) {
      setSelectedVariant(variant.node);
    }
  };

  const handleAddToCart = () => {
    if (selectedVariant) {
      setIsAdding(true); // Deshabilitar el botón
      setShowMessage(true); // Mostrar el mensaje

      addToCart({
        id: selectedVariant.id,
        title: `${product.title} (${selectedVariant.title})`,
        price: selectedVariant.price.amount,
        currency: selectedVariant.price.currencyCode,
        image: selectedVariant.image?.src || product.images.edges[0]?.node.src,
        quantity: 1,
      });

      setTimeout(() => {
        setShowMessage(false); // Ocultar el mensaje después de 3 segundos
        setIsAdding(false); // Habilitar el botón
      }, 2000);
    }
  };

  const mapColor = (color) => {
    switch (color.toLowerCase()) {
      case "brown":
        return "sienna";
      case "blue":
        return "cyan";
      case "negro":
        return "black";
      case "blanco":
        return "white";
      case "moka":
        return "#6D3B07";
      case "biege":
        return "beige";
      default:
        return color.toLowerCase();
    }
  };

  if (!product || !selectedVariant) {
    return <div>Loading...</div>;
  }

  const sizes = [
    ...new Set(
      product.variants.edges
        .map(
          (variant) =>
            variant.node.selectedOptions.find((o) => o.name === "Size")?.value
        )
        .filter((v) => v !== undefined)
    ),
  ];

  const colors = [
    ...new Set(
      product.variants.edges
        .map(
          (variant) =>
            variant.node.selectedOptions.find((o) => o.name === "Color")?.value
        )
        .filter((v) => v !== undefined)
    ),
  ];

  return (
    <div className="product">
      <h1 className="product-title">{product.title}</h1>

      {showMessage && (
        <div className="added-to-cart-message">Agregando al carrito...</div>
      )}

      <div className="product-carousel">
        <Carousel showArrows={true} showThumbs={false} infiniteLoop={true}>
          {selectedVariant.image ? (
            <img src={selectedVariant.image.src} alt={product.title} />
          ) : (
            product.images.edges.map((image, index) => (
              <div key={index}>
                <img src={image.node.src} alt={product.title} />
              </div>
            ))
          )}
        </Carousel>
      </div>
      <div className="product-description">
        <div className="product-price">
          {selectedVariant.price.currencyCode} {selectedVariant.price.amount}
        </div>

        <div className="product-variants">
          <div className="variant-section">
            <label>Size:</label>
            <div className="variant-options">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`variant-button ${
                    selectedVariant.selectedOptions.find(
                      (o) => o.name === "Size"
                    ).value === size
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleVariantChange("Size", size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="variant-section">
            <label>Color:</label>
            <div className="variant-options">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`color-dot ${
                    selectedVariant.selectedOptions.find(
                      (o) => o.name === "Color"
                    ).value === color
                      ? "active"
                      : ""
                  }`}
                  style={{
                    backgroundColor: mapColor(color),
                  }}
                  onClick={() => handleVariantChange("Color", color)}
                />
              ))}
            </div>
          </div>
        </div>
        {calculadoraTag &&
          (calculadoraTag === "calculadora 1" ||
            calculadoraTag === "calculadora 2" ||
            calculadoraTag === "calculadora 3") && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h3>
                  Calcula tu Talla{" "}
                  <img
                    src="/size-icon.png"
                    alt="size-icon"
                    className="size-icon"
                  />
                </h3>
              </AccordionSummary>
              <AccordionDetails>
                {calculadoraTag === "calculadora 1" && <GirdleApp />}
                {calculadoraTag === "calculadora 2" && <ChinGirdleApp />}
                {calculadoraTag === "calculadora 3" && <BraSizeCalculator />}
              </AccordionDetails>
            </Accordion>
          )}
        {!selectedVariant.availableForSale ? (
          <p className="out-of-stock">Agotado</p>
        ) : (
          <button
            className="add-to-cart"
            onClick={handleAddToCart}
            disabled={isAdding} // Deshabilitar el botón mientras se muestra el mensaje
          >
            {isAdding ? "Agregando..." : "Agregar al carrito"}
          </button>
        )}
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default Product;
