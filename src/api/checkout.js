import { graphQLClient } from "../api";

export const createCheckout = async (cartItems) => {
  const lineItems = cartItems.map((item) => ({
    variantId: item.id,
    quantity: item.quantity,
  }));

  const query = `
    mutation($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lineItems,
    },
  };

  try {
    const data = await graphQLClient.request(query, variables);
    const { checkout, checkoutUserErrors } = data.checkoutCreate;

    if (checkoutUserErrors.length > 0) {
      console.error("Checkout errors:", checkoutUserErrors);
      return null;
    }

    return checkout.webUrl;
  } catch (error) {
    console.error("Error creating checkout:", error);
    return null;
  }
};
