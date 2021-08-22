console.log('--------------------------------------')
console.log('     Projeto Carrinho de Compras     ')
console.log('             Jessica Marques         ')
console.log('--------------------------------------')


const database = require("./database");
const readLine = require("readline-sync");
const { table } = require("console");

//instanciar base de dados
const { produtos } = database;

//ordenar por preço
produtos.sort((a, b) => a.preco - b.preco);

//criar carrinho vazio para depois incluir itens
const carrinho = [];

//criar valor do cupom vazio para depois adicionar valor
let valorCupom = 0;

//encontrar por categoria
const verCategorias = readLine.question("Voce deseja encontrar os produtos por categoria? (S/N)");

if (verCategorias.toUpperCase() === "S") {
    console.log('--------------------------------------')
    console.log('Essas são as nossas categorias:')
    console.log('Alimento, Bebida, Casa, Higiene, Informática')
    console.log('--------------------------------------')

    const qualCategoria = readLine.question("Qual categoria voce gostaria de ver?");
    const categorias = produtos.filter(produto => produto.categoria === qualCategoria)
    console.table(categorias);
} else {
    (verCategorias.toUpperCase === "N")
    console.log("Esses são todos os produtos disponíveis");
    console.table(produtos);
}

//encontrar por id
const compras = () => {
    const encontrarId = parseInt(readLine.question("Digite o ID do Produto:"));
    for (i = 0; i <= 0; i++) {
        idEncontrado = produtos.find(produto => produto.id === encontrarId)
        if (idEncontrado) {
            break
        } else {
            console.log("Id não encontrado. Tente novamente");
            encontrarId = parseInt(readLine.question("Digite o ID do produto"));
        }
    }
    //quantidade desejada
    quantidadeProduto = parseInt(readLine.question("Quantas unidades voce deseja comprar desse produto"))

    //validando quantidade
    for (i = 0; i <= 1000; i++) {
        if (quantidadeProduto > 0) {
            break
        } else {
            console.log("Por favor, insira uma quantidade válida.");
            quantidadeProduto = parseInt(readLine.question("Quantas unidades voce deseja comprar desse produto?"))
        }
    }

    //juntandos os produtos e as quantidades deles
    const produtosAdicionados = {
        ...idEncontrado, quantidade: quantidadeProduto
    }

    //Adicionando produtos ao carrinho
    carrinho.push(produtosAdicionados)

    //Continuar a ação de compras
    const desejaContinuar = readLine.question("Deseja Continuar comprando? (S/N)");
    const desejaContinuarFormatada = desejaContinuar.toUpperCase();

    if (desejaContinuarFormatada === "S") {
        {
            (verCategorias.toUpperCase() === "S")
            console.log("Esses são os produtos disponíveis");
            console.table(produtos);
        }
        compras()

    } else {
        temCupom = readLine.question("Voce tem algum cupom de desconto? (S/N)").toUpperCase()
        {
            if (temCupom === "S") {
                valorCupom = parseInt(readLine.question("Qual é o valor do cupom?"));
            }
        }

    }

    //validando cupom
    for (i = 0; i <= 1000; i++) {
        if (valorCupom > 15 || valorCupom < 0) {
            console.log("Valor inválido. Digite novamente");
            valorCupom = parseInt(readLine.question("Qual é o valor do cupom?"));
        } else {
            break
        }
    }
}

compras()

//criando modelinho
class Pedido {
    constructor(carrinho) {
        this.produtoAdicionado = carrinho,
            this.subtotal = 0
    }
    calculoSubtotal() {
        this.subtotal = this.produtoAdicionado.reduce((accumulator, produto) => accumulator + (produto.preco * produto.quantidade), 0)
    }
}

//instanciando nosso modelo (pedido)
const pedido = new Pedido(carrinho)
console.table(pedido.produtoAdicionado)


pedido.calculoSubtotal()
console.log(`O valor do pedido foi R$ ${pedido.subtotal.toFixed(2)}`)

const desconto = pedido.subtotal * (valorCupom / 100)
console.log(`O valor do desconto foi R$ ${desconto.toFixed(2)}`);

const valorFinal = pedido.subtotal - desconto
console.log(`O valor final do seu pedido é de R$ ${valorFinal.toFixed(2)}`);



