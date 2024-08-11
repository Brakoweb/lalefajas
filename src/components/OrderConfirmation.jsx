import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { graphQLClient } from "../api";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get("order_id");

    const fetchOrderDetails = async () => {
      if (orderId) {
        // Realiza una consulta a Shopify para obtener los detalles del pedido
        const query = `
          query($id: ID!) {
            order(id: $id) {
              id
              name
              totalPrice {
                amount
                currencyCode
              }
              lineItems(first: 5) {
                edges {
                  node {
                    title
                    quantity
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        `;
        const variables = { id: `gid://shopify/Order/${orderId}` };
        try {
          const data = await graphQLClient.request(query, variables);
          setOrderDetails(data.order);
        } catch (error) {
          console.error("Error fetching order details:", error);
        }
      }
    };

    fetchOrderDetails();
  }, [location.search]);

  if (!orderDetails) {
    return <div>Loading order details...</div>;
  }

  return (
    <div>
      <h1>Thank You for Your Order!</h1>
      <h2>Order #{orderDetails.name}</h2>
      <p>
        Total: {orderDetails.totalPrice.amount}{" "}
        {orderDetails.totalPrice.currencyCode}
      </p>
      <h3>Items:</h3>
      <ul>
        {orderDetails.lineItems.edges.map((item) => (
          <li key={item.node.title}>
            {item.node.quantity} x {item.node.title} - {item.node.price.amount}{" "}
            {item.node.price.currencyCode}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderConfirmation;
