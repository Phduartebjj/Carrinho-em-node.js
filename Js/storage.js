import {
  getCartProducts,
  getProducts,
  setCartProducts,
  setProducts,
} from "./products.js";
import fs from "node:fs";
//Salva a nova lista no array

function saveProductsInStorage() {
  //Pega o array, transforma em string, depois escreve ele no products.json
  fs.writeFileSync(
    "./storage/products.json",
    JSON.stringify(getProducts(), null, 2),
  );
}

function saveCartInStorage() {
  fs.writeFileSync(
    "./storage/carrinho.json",
    JSON.stringify(getCartProducts(), null, 2),
  );
}

function saveReadJson(file, ifError = []) {
  try {
    //Converte os lê os dados do products.json e vem pra string, depois converte ele pra o array.
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return ifError;
  }
}

const loadProducts = saveReadJson("./storage/products.json", []);
const loadCart = saveReadJson("./storage/carrinho.json", []);
function loadStorage() {
  setProducts(loadProducts);
  setCartProducts(loadCart);
}
export { saveProductsInStorage, saveCartInStorage, loadStorage };
