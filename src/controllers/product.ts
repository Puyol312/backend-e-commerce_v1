import { Product } from "../db/model";

async function createNewProduct({
	title,
	price,
	description,
	image,
	stock,
}: {
  title: string;
	price: number;
	description?: string;
	image?: string;
	stock: number;
  }) {
  const product = await Product.create({
    title,
    price,
    description,
    image,
    stock,
  });
  return {
    id: product.get("title"),
    title: product.get("title"),
    price: product.get("price"),
    description: product.get("description"),
    image: product.get("image"),
    stock: product.get("stock"),
  }
}
async function getProductById(id: number) { 
  const product = await Product.findByPk(id);
  if (!product) { 
    return null;
  }
  return {
    id: product.get("title"),
    title: product.get("title"),
    price: product.get("price"),
    description: product.get("description"),
    image: product.get("image"),
    stock: product.get("stock"),
  }
}
async function addStockToProduct(quantity: number, id: number) {
  const product = await Product.findByPk(id);

  if (product) {
    await product.increment("stock", { by: quantity });
    await product.reload();
    return product;
  }
}
async function removeStockFromProduct(quantity: number, id: number) {
  const product = await Product.findByPk(id);

  if ((product) && (product.stock >= quantity)) {
    await product.decrement("stock", { by: quantity });
    await product.reload();
    return product;
  }
}