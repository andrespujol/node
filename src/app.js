import fs from "fs"

class ProductManager {
  constructor(filePath) {
    this.products = [];
    this.path = filePath;
    this.id = 1;
    if (!fs.existsSync(this.path)) return fs.writeFileSync(this.path, "[]");
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(data);
      if (this.products.length > 0) {
        const lastProduct = this.products[this.products.length - 1];
        this.id = lastProduct.id + 1;
      }
    } catch (err) {
      if (err.code === "ENOENT") {
        fs.writeFileSync(this.path, "[]");
      } else {
        throw err;
      }
    }
  }

  addProduct(product) {
    const data = JSON.parse(fs.readFileSync(this.path));
    if (
      !product.code ||
      !product.title ||
      !product.price ||
      !product.thumbnail ||
      !product.description
    ) {
      throw new Error("Todos los campos son obligatorios");
    }
    const existingProduct = this.products.find((p) => p.code === product.code);
    if (existingProduct) {
      throw new Error("Ya existe un producto con ese código");
    }
    const newProduct = {
      id: this.id++,
      ...product,
    };
    this.products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(this.products));
  }

  getProducts() {
    const products = JSON.parse(fs.readFileSync(this.path));
    return products;
  }

  updateProduct(id, newProductData) {
    // const products = JSON.parse(fs.readFileSync(this.path));

    const index = this.products.findIndex((p) => p.id === id);

    if (index !== -1) {
      const allowedUpdates = [
        "title",
        "description",
        "price",
        "thumbnail",
        "stock",
      ];
      const keys = Object.keys(newProductData);
      const isValidUpdate = keys.every((key) => allowedUpdates.includes(key));
      if (!isValidUpdate) {
        throw new Error(
          `Sólo se pueden actualizar las siguientes propiedades: title, description, price, thumbnail y stock`
        );
      }

      const updatedProduct = {
        ...products[index],
        ...newProductData,
        id: products[index].id,
      };
      products[index] = updatedProduct;

      fs.writeFileSync(this.path, JSON.stringify(products));
    } else {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }
  }

  deleteProduct(id) {
    // const products = JSON.parse(fs.readFileSync(this.path));
    const index = this.products.findIndex((p) => p.id === id);

    if (index !== -1) {
      const newProducts = this.products.filter((p) => p.id !== id);
      fs.writeFileSync(this.path, JSON.stringify(newProducts));
    } else {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }
  }

  getProductById(id) {
    // const products = JSON.parse(fs.readFileSync(this.path));
    const product = this.products.find((p) => p.id === parseInt(id));
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }
}

const productManager = new ProductManager("src/productos.json");

productManager.addProduct({
  title: "Bluza",
  description: "Bluza",
  price: 6999.99,
  thumbnail: "https://i.ibb.co/6bddLrh/20201206-191301.jpg",
  code: "P006",
  stock: 10,
});
// productManager.deleteProduct(3);
// productManager.updateProduct(1, {tutor: "hola"} )

const products = productManager.getProducts();
console.log(products);
