import Cors from "cors";
import initMiddleware from "./initMiddleware";

const cors = initMiddleware(
  Cors({
    origin: "*", // Allow all origins, you can specify a list of allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type"], // Allowed headers
  }),
);

export default cors;
