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
    }
  }
`;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const variables = { id: `gid://shopify/Product/${id}` }; // Reconstruir el ID completo
        const data = await graphQLClient.request(query, variables);
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

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.priceRange.minVariantPrice.amount,
      currency: product.priceRange.minVariantPrice.currencyCode,
      image: product.images.edges[0]?.node.src,
    });
  };

  return (
    <div className="product">
      <h1>{product.title}</h1>

      <div className="product-carousel">
        <Carousel showArrows={true} showThumbs={true} infiniteLoop={true}>
          {product.images.edges.map((image, index) => (
            <div key={index}>
              <img src={image.node.src} alt={product.title} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="product-description">
        <p>{product.description}</p>
        <p>
          Price: {product.priceRange.minVariantPrice.amount}{" "}
          {product.priceRange.minVariantPrice.currencyCode}
        </p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
