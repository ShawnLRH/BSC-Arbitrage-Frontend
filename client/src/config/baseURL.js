// Define baseURL
export const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_URL
    : process.env.REACT_APP_DEV_URL;
