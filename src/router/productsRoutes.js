import { Router } from "express";
import fs from "fs";
import path from "path";


const filePath = path.join(__dirname, '../productos.json');
const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
    try {
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  
      // Simulamos un retardo de 1 segundo para probar el manejo async/await
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      res.json(jsonData);
    } catch (error) {
      console.error('Error al obtener el JSON:', error);
      res.status(500).json({ error: 'Ocurrió un error al obtener el JSON' });
    }
});

productsRouter.get("/:id", (req, res) => {
    return res.send(`Traer el producto con el ID ${req.params.id}`);
  });


export default productsRouter;