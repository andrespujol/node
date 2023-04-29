class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  addProduct(product) {
    if (
      !product.code ||
      !product.name ||
      !product.price ||
      !product.description
    ) {
      throw new Error("Todos los campos son obligatorios");
    }
    const existingProduct = this.products.find((p) => p.code === product.code);
    if (existingProduct) {
      throw new Error("Ya existe un producto con ese código");
    }
    const newProduct = {
      id: this.nextId++,
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }
}

const productManager = new ProductManager();

productManager.addProduct({
  code: "P001",
  name: "Producto de ejemplo",
  price: 10.99,
  description: "Descripción del producto de ejemplo",
});

const products = productManager.getProducts();
console.log(products);
