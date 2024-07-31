const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/task");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const winston = require("winston");
const expressWinston = require("express-winston");
const YAML = require("yamljs");

const app = express();
const swaggerDocument = YAML.load("./swagger.yml");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/task_management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// Middleware setup
app.use(bodyParser.json());

// Express-Winston middleware for request logging
app.use(
  expressWinston.logger({
    transports: logger.transports,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
  })
);

// Swagger documentation setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/", routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

module.exports = app;
