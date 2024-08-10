import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { graphQLClient } from "../api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Product.css";
import { CartContext } from "../context/CartContext";

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
      variants(first: 10) {
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

  const handleVariantChange = (optionName, value) => {
    const variant = product.variants.edges.find((variant) =>
      variant.node.selectedOptions.every(
        (option) =>
          (option.name === optionName && option.value === value) ||
          option.name !== optionName
      )
    );
    setSelectedVariant(variant.node);
  };

  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart({
        id: selectedVariant.id,
        title: `${product.title} (${selectedVariant.title})`,
        price: selectedVariant.price.amount,
        currency: selectedVariant.price.currencyCode,
        image: selectedVariant.image?.src || product.images.edges[0]?.node.src,
        quantity: 1,
      });
    }
  };

  if (!product || !selectedVariant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product">
      <h1>{product.title}</h1>

      <div className="product-carousel">
        <Carousel showArrows={true} showThumbs={true} infiniteLoop={true}>
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
        <p>{product.description}</p>
        <p>
          Price: {selectedVariant.price.amount}{" "}
          {selectedVariant.price.currencyCode}
        </p>
        <div className="product-variants">
          {product.variants.edges[0].node.selectedOptions.map((option) => (
            <div key={option.name}>
              <label>{option.name}:</label>
              <select
                value={
                  selectedVariant.selectedOptions.find(
                    (o) => o.name === option.name
                  ).value
                }
                onChange={(e) =>
                  handleVariantChange(option.name, e.target.value)
                }
              >
                {[
                  ...new Set(
                    product.variants.edges
                      .map(
                        (variant) =>
                          variant.node.selectedOptions.find(
                            (o) => o.name === option.name
                          )?.value
                      )
                      .filter((v) => v !== undefined)
                  ),
                ].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
