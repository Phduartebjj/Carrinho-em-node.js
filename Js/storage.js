import {
  getCartProducts,
  getProducts,
  setCartProducts,
  setProducts,
} from "./products.js";
import fs from "node:fs";

function saveProductsInStorage() {
  //Pega o array, transforma em string, depois escreve ele no products.json
  fs.writeFileSync(
    "./storage/products.json",
    JSON.stringify(getProducts(), null, 2),
  );
}

function saveCartInStorage() {
  //Pega o carrinho(array), transforma em string, depois escreve ele no carrinho.json
  fs.writeFileSync(
    "./storage/carrinho.json",
    JSON.stringify(getCartProducts(), null, 2),
  );
}

//Salva os arquivos no Json no array, o ifError já vem definido como [], mas pode ser sobrescrito dependendo do elemento, podendo ser passado como {}
function saveReadJson(file, ifError = []) {
  //Transforma a string do .json para o elemento que ela deve ser, nesse caso o array com os produtos dentro. Funciona apenas se ele já tiver algum elemento.
  try {
    //Lê os dados do products.json quee vem em string, depois converte ele pra o array.
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    //Caso o array retorne vazio, no caso não tenha nada para ler. Ele retorna o array vazio
    return ifError;
  }
}
//Armazena a função de salvar a leitura
const loadProducts = saveReadJson("./storage/products.json", []);
const loadCart = saveReadJson("./storage/carrinho.json", []);

//Usa o que está salvo nos arrays
function loadStorage() {
  setProducts(loadProducts);
  setCartProducts(loadCart);
}
export { saveProductsInStorage, saveCartInStorage, loadStorage };
