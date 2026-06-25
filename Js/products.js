import { saveCartInStorage, saveProductsInStorage } from "./storage.js";
import { randomUUID } from "node:crypto";

let cartProducts = [];
let products = [];
//Retorna o array products
function getProducts() {
  return products;
}

//Retorna o array cartProducts
function getCartProducts() {
  return cartProducts;
}
//Transfere um valor ao array products
function setProducts(i) {
  products = i;
}
//Transfere um valor ao array cart products
function setCartProducts(i) {
  cartProducts = i;
}
//Adiciona um produto selecionado ao carrinho
function addCartProducts(produtoComprado) {
  //Verifica se o número digitado foi diferente de um número ou menor que zero, se for, entrada inválida
  if (typeof produtoComprado !== "number" || produtoComprado <= 0) {
    console.log("Entrada inválida");
    return;
  }
  //Produto é encontrado no array dos products através do índice
  const produto = getProducts()[produtoComprado - 1];
  //Se o produto não for encontrado, vai retornar produto inválido
  if (!produto) {
    console.log("Produto inválido");
    return;
  }
  //Procura se ele já existe no carrinho.
  const produtoEscolhido = getCartProducts().find((p) => p.id === produto.id);

  //Se ele existir, adiciona mais um na quantidade
  if (produtoEscolhido) {
    produtoEscolhido.quantidade++;
  } else {
    //Se não existir, eu crio um objeto baseado nele. Com a quantidade, para não acabar alterando o array products com o push, por que a referência vai ser a mesma.
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
//Cria um produto baseado no que o usuário escreveu.
function createProduct(nomeP, ValorP) {
  let product = {
    nome: nomeP,
    valor: Number(ValorP),
    id: randomUUID(),
  };

  return product;
}
//Salva o produto no array products, e salva no JSON para armazenar
function saveProduct(product) {
  getProducts().push(product);
  saveProductsInStorage();
}
//Remove do carrinho
function removeCartProduct(index) {
  //Acha o produto no carrinho pelo indíce
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
//Mostra o valor total do carrinho
function totalValueCartProducts() {
  //Verifica se o tamanho do array cartProducts é igual a 0, se for retorna vazio.
  if (getCartProducts().length === 0) {
    console.log("Valor Total: R$0");
    return;
  }
  //Mostra o valor total no console.log
  console.log(
    `Valor Total: R$${getCartProducts().reduce((acc, p) => acc + p.valor * p.quantidade, 0)}`,
  );
}
//Mostra os produtos do array cartProducts
function showCartProducts() {
  //Verifica se o array está vazio
  if (getCartProducts().length === 0) {
    console.log("\nCarrinho vazio");
    return false;
  }
  //Para cada produto do array, mostra o index+1 , nome, valor e quantidade
  getCartProducts().forEach((p, i) => {
    console.log(
      `\n${i + 1}.Nome: ${p.nome}\n Valor Unitário: R$${p.valor}\n Quantidade: ${p.quantidade}`,
    );
  });
  return true;
}
//Mostra os produtos do array products
function showProducts() {
  getProducts().forEach((p, i) => {
    console.log(`${i + 1}.Nome: ${p.nome}\n Valor: R$${p.valor}`);
  });
}
//Limpa o carrinho
function cleanCart() {
  //Define o array como [], e salva no storage
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
