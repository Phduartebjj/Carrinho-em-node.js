import { saveCartInStorage, saveProductsInStorage } from "./storage";

let cartProducts = [];

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
  const produto = getProducts()[produtoComprado - 1];
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
  saveCartInStorage()
}

function createProduct(nomeP, ValorP) {
  let product = {
    nome: nomeP,
    valor: ValorP,
    id: crypto.randomUUID(),
  };

  return product;
}

function saveProduct(product) {
  products.push(product);
  saveProductsInStorage()
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
    setCartProducts(getCartProducts().filter((p, i) => i != index - 1));
    console.log("Produto Removido");
  }
  saveCartInStorage()
}

function totalValueCartProducts() {
  console.log(
    `Valor Total: ${getCartProducts().reduce((acc, p) => acc + p.valor * p.quantidade, 0)}`,
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

let product1 = {
  nome: "Notebook",
  valor: 4800,
  id: 1,
};

let product2 = {
  nome: "Iphone 13",
  valor: 4000,
  id: 2,
};

let product3 = {
  nome: "Computador",
  valor: 6000,
  id: 3,
};

let products = [product1, product2, product3];

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
};
