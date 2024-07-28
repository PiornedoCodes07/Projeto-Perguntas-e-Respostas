// Elementos do DOM
const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");
const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");

// Variáveis de controle
let atual = 0;
let perguntaAtual;
let historiaFinal = "";

// Nomes aleatórios
const nomes = ["Ana", "Bruno", "Carla", "Daniel", "Eva", "Felipe", "Gabriela"];

function aleatorio(lista) {
    const posicao = Math.floor(Math.random() * lista.length);
    return lista[posicao];
}

const nome = aleatorio(nomes);

// Perguntas do jogo
const perguntas = [
    {
        enunciado: "Você encontra uma misteriosa caixa no meio da floresta. O que você faz?",
        alternativas: [
            {
                texto: "Abre a caixa sem hesitar.",
                afirmacao: [
                    "Dentro da caixa, você encontra um mapa antigo.",
                    "O mapa parece levar a um tesouro escondido."
                ],
                proxima: 1,
            },
            {
                texto: "Deixa a caixa onde está.",
                afirmacao: [
                    "Você decide não se arriscar com algo desconhecido.",
                    "Continua sua caminhada pela floresta, mas sente que perdeu uma grande oportunidade."
                ],
                proxima: 2,
            },
        ]
    },
    {
        enunciado: "O mapa leva a uma caverna escondida. Você decide entrar?",
        alternativas: [
            {
                texto: "Sim, você entra na caverna.",
                afirmacao: [
                    "Dentro da caverna, você encontra pistas de um antigo tesouro.",
                    "As paredes estão cobertas de inscrições antigas."
                ],
                proxima: 3,
            },
            {
                texto: "Não, você volta para casa.",
                afirmacao: [
                    "Decide que é melhor não arriscar sua segurança.",
                    "Conta a história da caixa misteriosa para seus amigos."
                ],
                proxima: 4,
            },
        ]
    },
    {
        enunciado: "Enquanto caminha pela floresta, você encontra um viajante perdido. O que você faz?",
        alternativas: [
            {
                texto: "Oferece ajuda ao viajante.",
                afirmacao: [
                    "O viajante agradece e lhe dá um amuleto como presente.",
                    "Vocês continuam a jornada juntos, em busca de aventuras."
                ],
                proxima: 5,
            },
            {
                texto: "Ignora o viajante e continua sua caminhada.",
                afirmacao: [
                    "Você decide que é melhor seguir sozinho.",
                    "A solidão da floresta começa a pesar em seus ombros."
                ],
                proxima: 6,
            },
        ]
    },
    {
        enunciado: "As inscrições na caverna mencionam um guardião do tesouro. O que você faz?",
        alternativas: [
            {
                texto: "Procura pelo guardião.",
                afirmacao: [
                    "Você encontra o guardião e ele desafia você a um enigma.",
                    "Se conseguir resolver o enigma, o tesouro será seu."
                ],
                proxima: 7,
            },
            {
                texto: "Decide que é melhor não mexer com o guardião.",
                afirmacao: [
                    "Sai da caverna sem o tesouro, mas em segurança.",
                    "A história da caverna fica como uma lenda para contar."
                ],
                proxima: 7,
            },
        ]
    },
    {
        enunciado: "Você decide explorar mais a floresta em busca de novas aventuras. O que você espera encontrar?",
        alternativas: [
            {
                texto: "Novos desafios e mistérios.",
                afirmacao: [
                    "Você sente que cada dia é uma nova aventura.",
                    "A floresta guarda muitos segredos esperando para serem descobertos."
                ],
            },
            {
                texto: "Um caminho de volta para casa.",
                afirmacao: [
                    "Após tantas aventuras, você sente falta do conforto de casa.",
                    "Decide que está na hora de voltar e contar suas histórias."
                ],
            },
        ]
    }
];

// Funções do jogo
function iniciaJogo() {
    atual = 0;
    historiaFinal = "";
    telaInicial.style.display = 'none';
    caixaPrincipal.style.display = 'flex';
    mostraPergunta();
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = aleatorio(opcaoSelecionada.afirmacao);
    historiaFinal += afirmacoes + " ";
    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima;
    } else {
        mostraResultado();
        return;
    }
    mostraPergunta();
}

function mostraResultado() {
    caixaPrincipal.style.display = 'none';
    caixaResultado.classList.add("mostrar");
    textoResultado.textContent = historiaFinal;
    botaoJogarNovamente.addEventListener("click", jogaNovamente);
}

function jogaNovamente() {
    atual = 0;
    historiaFinal = "";
    caixaResultado.classList.remove("mostrar");
    caixaPrincipal.style.display = 'flex';
    mostraPergunta();
}

// Inicialização do jogo
botaoIniciar.addEventListener('click', iniciaJogo);
