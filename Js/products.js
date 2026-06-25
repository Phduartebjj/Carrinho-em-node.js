import { saveCartInStorage, saveProductsInStorage } from "./storage.js";
import { randomUUID } from "node:crypto";

let cartProducts = [];
let products = [];

function getProducts() {
  return products;
}

function getCartProducts() {
  return cartProducts;
}

function setProducts(i) {
  products = i;
}
function setCartProducts(i) {
  cartProducts = i;
}

function addCartProducts(produtoComprado) {
  //Peguei o produto comprado da lista de produtos
  if (typeof produtoComprado !== "number" || produtoComprado <= 0) {
    console.log("Entrada inválida");
    return;
  }

  const produto = getProducts()[produtoComprado - 1];

  if (!produto) {
    console.log("Produto inválido");
    return;
  }
  //Achei ele no carrinho
  const produtoEscolhido = getCartProducts().find((p) => p.id === produto.id);
  //Vi se ele existe
  if (produtoEscolhido) {
    //Como ele existe adicionei mais uma quantidade
    produtoEscolhido.quantidade++;
  } else {
    //Caso não exista, eu crio um objeto baseado nele. Com a quantidade, para não acabar alterando a lista de produtos com o push
    let produtoCarrinho = {
      nome: produto.nome,
      valor: produto.valor,
      id: produto.id,
      quantidade: 1,
    };
    getCartProducts().push(produtoCarrinho);
  }
  saveCartInStorage();
}

function createProduct(nomeP, ValorP) {
  let product = {
    nome: nomeP,
    valor: Number(ValorP),
    id: randomUUID(),
  };

  return product;
}

function saveProduct(product) {
  getProducts().push(product);
  saveProductsInStorage();
}

function removeCartProduct(index) {
  //Acha o produto no carrinho
  const produtoSelecionado = getCartProducts()[index - 1];
  //Se o índice não for válido cancela a operação
  if (!produtoSelecionado) {
    console.log("Produto inválido");
    return;
  }
  //Se a quantidade for maior do que 1 diminui quantidade
  if (produtoSelecionado.quantidade > 1) {
    produtoSelecionado.quantidade--;
  } else {
    //Se for 1 ou abaixo, ele remove do array quando diminui

    setCartProducts(
      getCartProducts().filter((p) => p.id !== produtoSelecionado.id),
    );
    console.log("Produto Removido");
  }
  saveCartInStorage();
}

function totalValueCartProducts() {
  if (getCartProducts().length === 0) {
    console.log("Carrinho está vazio")
    return
  }

  console.log(
    `Valor Total: R$${getCartProducts().reduce((acc, p) => acc + p.valor * p.quantidade, 0)}`,
  );
}

function showCartProducts() {
  if (getCartProducts().length === 0) {
    console.log("\nCarrinho vazio");
    return false;
  }
  getCartProducts().forEach((p, i) => {
    console.log(
      `${i + 1}.Nome: ${p.nome}\n Valor Unitário: R$${p.valor}\n Quantidade: ${p.quantidade}`,
    );
  });
  return true;
}

function showProducts() {
  getProducts().forEach((p, i) => {
    console.log(`${i + 1}.Nome: ${p.nome}\n Valor: R$${p.valor}`);
  });
}

function cleanCart() {
  setCartProducts([]);
  saveCartInStorage();
}

export {
  getProducts,
  getCartProducts,
  createProduct,
  saveProduct,
  removeCartProduct,
  addCartProducts,
  showProducts,
  showCartProducts,
  setCartProducts,
  setProducts,
  totalValueCartProducts,
  cleanCart,
};
