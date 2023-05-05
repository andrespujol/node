const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.products = [];
    this.nextId = 1;
    this.path = filePath;
  }

  addProduct(product) {
    const products = JSON.parse(fs.readFileSync(this.path));
  
    if (
      !product.code ||
      !product.title ||
      !product.price ||
      !product.description
    ) {
      throw new Error("Todos los campos son obligatorios");
    }
    const existingProduct = products.find((p) => p.code === product.code);
    if (existingProduct) {
      throw new Error("Ya existe un producto con ese código");
    }
    const newProduct = {
      id: this.nextId++,
      ...product,
    };
    products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(products));
  }
  

  getProducts() {
    const products = JSON.parse(fs.readFileSync(this.path));
    return products;
  }

  updateProduct(id, newProductData) {
    const products = JSON.parse(fs.readFileSync(this.path));
  
    const index = products.findIndex((p) => p.id === id);
  
    if (index !== -1) {
      products[index] = {
        ...products[index],
        ...newProductData
      };
  
      fs.writeFileSync(this.path, JSON.stringify(products));
    }
  }

  deleteProduct(id) {
    const products = JSON.parse(fs.readFileSync(this.path));
  
    const newProducts = products.filter((p) => p.id !== id);
  
    fs.writeFileSync(this.path, JSON.stringify(newProducts));
  }

  getProductById(id) {
    const products = JSON.parse(fs.readFileSync(this.path));
    const product = products.find((p) => p.id === parseInt(id));
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }
}

const productManager = new ProductManager('productos.json');

productManager.addProduct({
  "title": "Remera",
  "description": "Remera de algodón",
  "price": 2999.99,
  "thumbnail": "https://i.ibb.co/6bddLrh/20201206-191301.jpg",
  "code": "PA001",
  "stock": 10
});
// productManager.deleteProduct(2)
const products = productManager.getProducts();
console.log(products);
