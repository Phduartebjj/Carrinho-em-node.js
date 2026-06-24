import promptSync from "prompt-sync";

let rodando = true;
let continuar;
let produto1 = {
  nome: "Brinquedo",
  valor: 20,
};

let produto2 = {
  nome: "Celular",
  valor: 1900,
};

let produto3 = {
  nome: "Notebook",
  valor: 4800,
};
let produtos = [produto1, produto2, produto3];
let Carrinho = [];

const prompt = promptSync();
let escolha;

function continuarPrograma(e) {
  if (e != 1) {
    console.log("Fim do programa");
    return false;
  } else {
    return true;
  }
}

function estadoAdicionado(escolha) {
  console.log("===========================================================");
  if (escolha <= produtos.length) {
    Carrinho.push(produtos[escolha]);
    console.log("item adicionado com sucesso");
  } else {
    console.log("item adicionado não existe");
  }
}

function espaco() {
  console.log("");
  console.log("===========================================================");
  console.log("");
}

while (rodando) {
  console.log("============== Bem-vindo ao Carrinho de compras ==============");
  console.log("           As seguintes opções estão disponíveis              ");
  console.log("           1.Ver produtos");
  console.log("           2.Ver carrinho");
  console.log("           3.Reiniciar");
  console.log("           4.Sair");
  console.log("===========================================================");

  escolha = Number(prompt("Qual você Escolhe? "));

  console.log("===========================================================");
  switch (escolha) {
    case 1:
      produtos.forEach((p, i) => {
        console.log(`${i}. ${p.nome} R$${p.valor}`);
      });

      escolha = Number(prompt("Qual item você quer adicionar ao carrinho? "));
      estadoAdicionado(escolha);
      espaco();
      escolha = Number(prompt("Deseja continuar? "));
      continuar = continuarPrograma(escolha);
      if (continuar) {
      } else {
        rodando = false;
      }
      break;

    // ================ CARRINHO
    case 2:
      espaco();
      console.log("\n============== Carrinho ==============");
      if (Carrinho.length > 0) {
        console.log(Carrinho);
        console.log(
          "Total Carrinho: ",
          Carrinho.reduce((acc, p) => acc + p.valor, 0),
        );
      } else {
        console.log("Carrinho vazio");
      }
      escolha = Number(prompt("Deseja continuar? "));
      continuar = continuarPrograma(escolha);
      if (continuar) {
      } else {
        rodando = false;
      }
      espaco();
      break;
    case 3:
      espaco();
      break;
    case 4:
      rodando = false;
      console.log("Fim do programa");
      break;
    default:
      console.log("Opção não disponível");
  }
}
