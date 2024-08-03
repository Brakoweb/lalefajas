import { GraphQLClient } from "graphql-request";

const endpoint = import.meta.env.VITE_SHOPIFY_STORE_URL;
const accessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": accessToken,
  },
});
