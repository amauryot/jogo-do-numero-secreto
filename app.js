let listaDeNumerosSorteados = [];
let numeroLimte = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

exibirMensagemInicial();

/**
 * Função para gerar um número aleatório.
 * Verifica se o número já foi gerado previamente e gera novo número.
 * @returns número aleatório.
 */
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimte + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimte)
        listaDeNumerosSorteados = [];
    if (listaDeNumerosSorteados.includes(numeroEscolhido))
        return gerarNumeroAleatorio();
    else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

/**
 * Função para exibir um texto na tela.
 * @param {*} tag 
 * @param {*} texto 
 */
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    // Código para ativar leitura por voz (code.responsivevoice.org).
    // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});

    // Código para ativar leitura por voz (nativo do chrome).
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else
        console.log("Web Speech API não suportada neste navegador.");
}

/**
 * Função que exibe a mensagem inicial do app.
 */
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

/**
 * Função que limpa o campo 'input' da tela.
 */
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

/**
 * Função que verifica se o valor informado pelo usuário é
 * maior, menor ou igual ao número aleatório.
 */
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        let palavraTentativa = (tentativas > 1) ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;

        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto)
            exibirTextoNaTela('p', 'O número secreto é menor');
        else
            exibirTextoNaTela('p', 'O número secreto é maior');
        tentativas++;
        limparCampo();
    }
}

/**
 * Função para reiniciar o jogo.
 */
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}