import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Eater API",
      version: "1.0.0",
    },
    servers: [
      { url: "http://localhost:3000/" },
      { url: "https://eater-api.herokuapp.com/" },
    ],
  },
  apis: ["../**/*.routes.js"],
};

export const specs = swaggerJsDoc(options);
