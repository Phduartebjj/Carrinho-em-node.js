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
  getCartProducts().push(getProducts()[produtoComprado - 1]);
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
    `Valor Total: ${getCartProducts().reduce((acc, p) => acc + p.valor, 0)}`,
  );
}

function showCartProducts() {
  if (getCartProducts().length === 0) {
    console.log("\nCarrinho vazio");
    return false;
  }
  getCartProducts().forEach((p, i) => {
    console.log(`${i + 1}.Nome: ${p.nome}\n Valor: R$${p.valor}`);

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
  totalValueCartProducts,
};
