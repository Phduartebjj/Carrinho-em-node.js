//Verifica se a entrada é igual vazia se for termina a função. Verifica se o tipo é string, se não for termina a função. E por último checa se sobra alguma coisa se tirar os espaços, se não fecha a função.
import promptSync from "prompt-sync";
const prompt = promptSync()
function thereIsInput(input) {
  if (input === null) return false;
  if (typeof input !== "string") return false;
  return input.trim() !== "";
}

//Verifica se o número é finito, e se ele é maior que 0
function numIsValid(num) {
  return Number.isFinite(num) && num > 0;
}

export { thereIsInput, numIsValid };