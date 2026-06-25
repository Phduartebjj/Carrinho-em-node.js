import {
  getCartProducts,
  getProducts,
  setCartProducts,
  setProducts,
} from "./products.js";
import fs from "node:fs";
//Converte os lê os dados do products.json e vem pra string, depois converte ele pra o array.
const loadProducts = JSON.parse(fs.readFileSync("products.json", "utf-8"));
const loadCart = JSON.parse(fs.readFileSync("carrinho.json", "utf-8"));

//Salva a nova lista no array
setProducts(loadProducts);
setCartProducts(loadCart);

function saveProductsInStorage() {
  //Pega o array, transforma em string, depois escreve ele no products.json
  fs.writeFileSync("products.json", JSON.stringify(getProducts(), null, 2));
}

function saveCartInStorage() {
  fs.writeFileSync("carrinho.json", JSON.stringify(getCartProducts(), null, 2));
}

export { saveProductsInStorage, saveCartInStorage };
