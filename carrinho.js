import promptSync from "prompt-sync";
import {
  getProducts,
  getCartProducts,
  createProduct,
  saveProduct,
  removeCartProduct,
  addCartProducts,
  showCartProducts,
  showProducts,
  setCartProducts,
  totalValueCartProducts
} from "./products.js";

const prompt = promptSync();
let rodando = true;
let produtoComprado = 0;
let nomeProduto;
let valorProduto = 0;
let produtoEscolhido = 0;

while (rodando) {
  console.log("\n======== LOJINHA ========");
  console.log("===== 1. Ver Produtos");
  console.log("===== 2. Ver Carrinho");
  console.log("===== 3. Cadastrar Produto");
  console.log("===== 4. Remover Produto");
  console.log("===== 5. Reiniciar");
  console.log("===== 6. Sair");
  console.log("=========================");

  console.log("");
  let escolha = Number(prompt("Digite o número da opção que deseja escolher "));

  switch (escolha) {
    //VER PRODUTOS
    case 1:
      console.log("\n===== Produtos Disponíveis: ");
      showProducts();
      console.log("=========================");

      produtoComprado = Number(
        prompt("\nDigite o número do produto que Deseja comprar "),
      );
      if(produtoComprado >= 1 && produtoComprado <= getProducts().length){
        addCartProducts(produtoComprado);
      } else {
        console.log("Número do produto inválido")
      }

      escolha = Number(prompt("\nDeseja continuar? 1-Sim 2-Não "));
      if (escolha != 1) {
        rodando = false;
      }
      break;
    //VER CARRINHO
    case 2:
      showCartProducts();
      totalValueCartProducts()
      escolha = Number(prompt("\nDeseja continuar? 1-Sim 2-Não "));
      if (escolha != 1) {
        rodando = false;
      }
      break;
    // CADASTRAR PRODUTOS
    case 3:
      nomeProduto = prompt("Digite o nome do produto: ");
      valorProduto = Number(prompt("Digite o valor do produto: "));

      saveProduct(createProduct(nomeProduto, valorProduto));
      console.log("\nAdicionando produto...");
      console.log("Produto Adiconado com sucesso!");
      break;

    // DELETAR PRODUTOS
    case 4:
      if(showCartProducts()){
        produtoEscolhido = Number(
          prompt("Digite o número do produto que deseja deletar: "),
        );
        removeCartProduct(produtoEscolhido);
      } else {
        console.log("Não é verdadeiro")
      }

      break;
    // REINICIAR PROGRAMA
    case 5:
      console.log("\nReiniciando...");
      console.log("");
      break;
    // SAIR PROGRAMA
    case 6:
      rodando = false;
      console.log("\nFim do Programa");
      break;
    default:
      console.log("\nOpção inválida");
  }
}
