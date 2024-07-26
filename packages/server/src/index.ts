import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";
import serveStatic from "serve-static";

const app = express();
const port = 3000;

async function startServer() {
  app.use(cors());

  // Add your API routes first
  app.get("/api/hello", (req, res) => {
    res.send({ response: "Hello World!" });
  });

  // Create Vite server in middleware mode.
  const vite = await createViteServer({
    server: { middlewareMode: true }, // Use true for middlewareMode
    root: path.join(__dirname, "../../client"),
  });

  // Use Vite's middleware to handle requests for static files
  app.use(vite.middlewares);

  // Serve the static files from the client build directory
  app.use(serveStatic(path.join(__dirname, "../../client/dist")));

  // Fallback to index.html for SPA
  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer();
