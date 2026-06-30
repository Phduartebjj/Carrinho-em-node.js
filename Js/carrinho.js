import promptSync from "prompt-sync";

import {
  getProducts,
  createProduct,
  saveProduct,
  removeCartProduct,
  addCartProducts,
  showCartProducts,
  showProducts,
  totalValueCartProducts,
  cleanCart,
  editProduct,
  removeProduct,
  searchProduct,
} from "./products.js";
import { checkout } from "./checkout.js";
import { loadStorage } from "./storage.js";
import { thereIsInput, numIsValid } from "./validation.js";

const prompt = promptSync();
loadStorage();
let input;
let rodando = true;
let produtoComprado = 0;
let nomeProduto;
let valorProduto = 0;
let produtoEscolhido = 0;
let produtoEditado = 0;
let nomeBuscado;
let produtoBuscado;
let estoqueProduto

while (rodando) {
  console.log("======== CATÁLOGO ========");
  console.log("===== 1. Ver Catálogo");
  console.log("===== 2. Cadastrar Produtos");
  console.log("===== 3. Editar Produtos");
  console.log("===== 4. Remover Produtos");
  console.log("===== 5. Buscar Produtos");
  console.log("======== CARRINHO ========");
  console.log("===== 6. Ver Carrinho");
  console.log("===== 7. Remover Produto do Carrinho");
  console.log("===== 8. Limpar Carrinho");
  console.log("===== 9. Sair");
  console.log("=========================");

  console.log("");
  let escolha = Number(
    prompt("Digite o número da opção que deseja escolher: "),
  );

  switch (escolha) {
    //VER PRODUTOS
    case 1:
      console.log("\n===== Produtos Disponíveis: ");
      showProducts();
      console.log("=========================");

      produtoComprado = Number(
        prompt("\nDigite o número do produto que Deseja comprar: "),
      );
      //Verifica se o produtoEscolhi está dentro do que é permitdo
      if (produtoComprado >= 1 && produtoComprado <= getProducts().length) {
        addCartProducts(produtoComprado);
      } else {
        console.log("\nNúmero do produto inválido");
      }

      escolha = Number(prompt("\nDeseja continuar? 1-Sim 2-Não "));
      if (escolha != 1) {
        rodando = false;
      }
      break;
    // CADASTRAR PRODUTOS
    case 2:
      nomeProduto = prompt("Digite o nome do produto: ");
      input = prompt("Digite o valor do produto: ");

      if (!thereIsInput(input)) {
        console.log("Entrada inválida");
        break;
      }

      valorProduto = Number(input);

      if (!numIsValid(valorProduto)) {
        console.log("Número inválido");
        break;
      }

      saveProduct(createProduct(nomeProduto, valorProduto));
      console.log("\nAdicionando produto...");
      console.log("Produto Adiconado com sucesso!");

      break;

    //EDITAR PRODUTO
    case 3:
      showProducts();
      produtoEditado = Number(
        prompt("Digite o número do produto que deseja editar: "),
      );
      if (!numIsValid(produtoEditado)) {
        console.log("Número inválido");
        break;
      }
      nomeProduto = prompt("Digite o nome do produto: ");
      input = prompt("Digite o valor do produto: ");

      if (!thereIsInput(input)) {
        console.log("Entrada inválida");
        break;
      }

      valorProduto = Number(input);
      if (!numIsValid(valorProduto)) {
        console.log("Número inválido");
        break;
      }

      input = prompt("Digite a quantidade do produto: ")
      if (!thereIsInput(input)) {
        console.log("Entrada inválida");
        break;
      }
      estoqueProduto = Number(input)

      editProduct(produtoEditado, nomeProduto, valorProduto, estoqueProduto);

      break;
    //REMOVER PRODUTO DO CATÁLOGO
    case 4:
      showProducts();
      input = prompt("Digite o número do produto que deseja deletar: ");
      if (!thereIsInput(input)) {
        console.log("Entrada inválida");
        break;
      }
      produtoEscolhido = Number(input);

      if (!numIsValid(produtoEscolhido)) {
        console.log("Número inválido");
        break;
      }
      removeProduct(produtoEscolhido);

      break;
    //BUSCAR PRODUTOS
    case 5:
      input = prompt("Digite o nome do produto que deseja bucar: ");
      if (!thereIsInput(input)) {
        console.log("Entrada inválida");
        break;
      }

      nomeBuscado = input;
      produtoBuscado = searchProduct(nomeBuscado);

      if (produtoBuscado.length === 0) {
        console.log("Nenhum produto encontrado");
        break;
      }

      produtoBuscado.forEach((p, i) => {
        console.log(`${i + 1}. ${p.nome} R$${p.valor}`);
      });

      escolha = Number(prompt("\nDeseja continuar o programa? 1-Sim 2-Não "));
      //Se escolha for diferente de 1 cancela o programa.
      if (escolha != 1) {
        rodando = false;
      }
      break;
    //VER CARRINHO
    case 6:
      checkout();
      escolha = Number(prompt("\nDeseja continuar o programa? 1-Sim 2-Não "));
      //Se escolha for diferente de 1 cancela o programa.
      if (escolha != 1) {
        rodando = false;
      }
      break;

    // DELETAR PRODUTOS
    case 7:
      if (showCartProducts()) {
        input = prompt("Digite o número do produto que deseja deletar: ");
        if (!thereIsInput(input)) {
          console.log("Entrada inválida");
          break;
        }

        produtoEscolhido = Number(input);

        if (!numIsValid(produtoEscolhido)) {
          console.log("Número inválido");
          break;
        }

        removeCartProduct(produtoEscolhido);
      } else {
        console.log("Não é verdadeiro");
      }

      break;
    // LIMPAR CARRINHO
    case 8:
      showCartProducts();
      input = prompt("\nDeseja mesmo Limpar o carrinho? 1-Sim 2-Não: ");
      if (!thereIsInput(input)) {
        console.log("Entrada inválida");
        break;
      }

      let escolhaLimpar = Number(input);

      if (escolhaLimpar !== 1 && escolhaLimpar !== 2) {
        console.log("Número inválido");
        break;
      }
      if (escolhaLimpar === 1) cleanCart();

      break;
    // SAIR PROGRAMA
    case 9:
      rodando = false;
      console.log("\nFim do Programa");
      break;
    default:
      console.log("\nOpção inválida");
  }
}
