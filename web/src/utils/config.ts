require("dotenv").config();

const apiUrl = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return process.env.REACT_APP_PRODUCTION_API_URL;
    case "development":
      return process.env.REACT_APP_DEVELOPMENT_API_URL;
  }
};

export const API_URL = apiUrl();
export const GRAPHQL_URL = `${API_URL}/graphql`;

export default {
  API_URL,
  GRAPHQL_URL
};
