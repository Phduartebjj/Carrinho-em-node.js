import {
  totalValueCartProducts,
  showCartProducts,
  cleanCart,
} from "./products.js";
import promptSync from "prompt-sync";

const prompt = promptSync();

function checkout() {
  if (!showCartProducts()) {
    return;
  }
  totalValueCartProducts();

  const confirm = Number(prompt("Deseja Efetuar a compra? (1-Sim 2-Não): "));
  if (confirm !== 1 && confirm !== 2) {
    console.log("Opção inválida");
    return;
  }

  if (confirm === 2) {
    console.log("Boas compras!");
    return;
  }
  console.log("Compra finalizada com sucesso!");
  cleanCart();
}

export { checkout };
