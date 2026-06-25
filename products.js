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
  const produto = getProducts()[produtoComprado];
  const produtoEscolhido = getCartProducts().find((p) => p.id === produto.id);
  if (produtoEscolhido) {
    produtoEscolhido.quantidade += 1;
  } else {
    let produtoCarrinho = {
      nome: produto.nome,
      valor: produto.valor,
      id: produto.id,
      quantidade: 1
    };
    getCartProducts().push(produtoCarrinho);
  }
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
}

function removeCartProduct(index) {
  setCartProducts(getCartProducts().filter((p, i) => i != index));
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
    console.log(`${i + 1}.Nome: ${p.nome}\n Valor: R$${p.valor}\n Quantidade: ${p.quantidade}`);
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
  quantidade: 1,
};

let product2 = {
  nome: "Iphone 13",
  valor: 4000,
  id: 2,
  quantidade: 1,
};

let product3 = {
  nome: "Computador",
  valor: 6000,
  id: 3,
  quantidade: 1,
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
  totalValueCartProducts,
};
