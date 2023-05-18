import express from "express";
import colors from "colors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const port = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "./productos.json");
const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
const app = express();

app.get("/products", async (req, res) => {
    try {
        let limit = req.query.limit;
    
        // Si no se recibe el parámetro de consulta 'limit' o no es un número válido, devolver todos los productos
        if (!limit || isNaN(limit)) {
          res.json(jsonData);
          return;
        }
    
        // Convertir el límite a un número entero
        limit = parseInt(limit,10);
    
        // Aplicar el límite de resultados
        const limitedProducts = jsonData.slice(0, limit);
    
        // Simulamos un retardo de 1 segundo para probar el manejo async/await
        await new Promise((resolve) => setTimeout(resolve, 1000));
    
        res.json(limitedProducts);
      } catch (error) {
        console.error("Error al obtener el JSON:", error);
        res
          .status(500)
          .json({ error: "Ocurrió un error al obtener el JSON" });
      }
});

app.get("/products/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        console.log(productId)
        const product = jsonData.find((p) => p.id === parseInt(productId));
        console.log(colors.red(product))
        // Simulamos un retardo de 1 segundo para probar el manejo async/await
        await new Promise((resolve) => setTimeout(resolve, 1000));
    
        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ error: "Producto no encontrado" });
        }
      } catch (error) {
        console.error("Error al obtener el JSON:", error);
        res
          .status(500)
          .json({ error: "Ocurrió un error al obtener el JSON" });
      }
  })


app.listen(port, () => {
    console.log(colors.rainbow(`Servidor funcionando en el puerto ${port}`))
  })