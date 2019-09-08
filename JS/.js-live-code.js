//Vetor para representar as notas musicais
var nota;

//variavel para controlar o tempo
var segundo;

//variavel para o limite de tempo
var limiteTempo;

//variavel que será responsavel para o controle do ccronometro
var tempo;

//variavel para repetir o ciclo
var etapa;

//variavel para verificar o ciclo atual
var etapaAtual;

//variavel que ira definir qual acorde será tocado
var tipoAcorde;

//variavel que ira referenciar um elemnto do html para mostrar a quantidade e etapa e quanto falta para terminar
var mostrarEtapa;
console.log(mostrarEtapa)

//variavel para manipular a imagem do acorde no html
var imagemAcorde;

//variavel responsavel pelo controle do som dos acordes
var somAcorde;

//Variavel para controlar o preparo para iniciar o cronometro
var preparar;

//variavel para a contagem regressiva
var tempoPreparo;

//função para mostrar o cronometro
var duracao;

//função que vai controlar a seção violão
var violao;

//função que ira controlar a tela de treinamento
var treinamento;

//variavel para controlar as configurações
var configurar;

//função para mostrar as caixas de dialogo
var caixaDialogo;

//função para limpar todas as variaveis
function valorDefault() {
    nota = [false, false, false, false, false, false, false];
    segundo = 0+"0";
    limiteTempo = 10;
    tempo = "";
    etapa = 14;
    etapaAtual = 0;
    tipoAcorde = "";
    tempoPreparo = 4;
    
    mostrarEtapa = document.getElementById("etapa");
    imagemAcorde = document.getElementById("imagem-acorde");
    somAcorde = document.getElementById("audio-acorde");
    preparar = document.getElementById("preparo");
    duracao = document.getElementById("cronometro");
    violao = document.getElementById("violao");
    treinamento = document.getElementById("treinamento");
    configurar = document.getElementById("configurar");
    caixaDialogo = document.getElementById("dialogo");
}

//função para mostrar as configurações
function configuracoes() {
    if(window.innerWidth < 800) {
        violao.style.display ="none";
    }
    dialogo.style.display = "flex";
    configurar.style.display = "block";

}

//função para salvar as configurações
function salvarConfiguracoes() {
    if(window.innerWidth < 800) {
        violao.style.display ="flex";
    }
    configurar.style.display = "none";
    dialogo.style.display = "none";
    configurarTempo();

}

//função para a configuração do tempo
function configurarTempo() {
    etapa = 7 * parseInt(document.getElementById("conf-ciclo").value);

    limiteTempo = parseInt(document.getElementById("conf-tempo").value);

}

//Funçao que escolhe a primeira imagem e inicia o cronometro
function iniciar(acorde) {

    valorDefault();
    tipoAcorde = acorde;
    violao.style.display = "none";
    treinamento.style.display = "flex";
    preparar.style.display = "flex";
    configurarTempo();
    controlarTempo("contagemRegresiva()", true);
}

//função para iniciar o cronometro
function contagemRegresiva() {
    tempoPreparo--;
    preparar.innerHTML = (tempoPreparo-1);
    if(tempoPreparo == 1) {
        preparar.innerHTML = "Começar";
    }
    if(tempoPreparo == 0) {
        controlarTempo("contagemRegresiva()", false);
        preparar.style.display = "none";
        document.getElementById("painel").style.display = "flex";
        controlarTempo("cronometro()", true);
        finalizarEtapa();
        mudarImagem(numAleatorio());
        preparar.innerHTML = 3;
    }
}

//Função que ira ser o cronometro para o tempo
function cronometro() {
    if (segundo < limiteTempo) {
        segundo++;
        if (segundo < 10) {
            segundo = "0"+segundo;
        }
    } else {
        segundo = 0+"0";
        //verifica se é preciso finalizar o cronometro ou coloca a imagem default
        if(finalizarEtapa() == false) {
            mudarImagem(numAleatorio());
        } else {
            imagemAcorde.src = "IMG/VA0.png";
            document.getElementById("painel").style.display = "none";
            treinamento.style.display = "none";
            violao.style.display = "flex";
        }
    }
    
    //mostrar o tempo na tela
    duracao.innerHTML = "00:"+segundo;
}

//função para ter um controle mais preciso do tempo
function controlarTempo(funcao, estado) {
    if(estado == true) {
        temp = setInterval(funcao, 1000);

    } else {
        clearInterval(temp);

    }
}

//função que gera um número aleatório
function numAleatorio() {
    return Math.floor(Math.random() * 7);
}

//Função que altera a imagem e não deixa repetir se todos os vetores tiver o valor true
function mudarImagem(numero) {
    finalizado = true; //variavel que vai finalizar o loop
    ciclo = false; //variavel responsavel para repetir o ciclo de notas

    do {
        for(i = 0; i < nota.length; i++) {
            if(nota[i] == true){
                ciclo = true;
            } else {
                ciclo = false;
                break;

            }
        }

        for(i = 0; i < nota.length; i++) {
            if(numero == i) {
                if(nota[i] == false) {
                    nota[i] = true;
                    console.info("nota achada: " + i);
                    finalizado = true;
                    audioAcorde(i+1);
                    imagemAcorde.src ="IMG/"+ tipoAcorde+"/"+tipoAcorde+""+(i+1)+".png";
                } else {

                    numero = numAleatorio();
                    finalizado = false;
                }
            }
        }

        if(ciclo == true) {
            for(i = 0; i < nota.length; i++) {
                nota[i] = false;
            }

        }
    }while (finalizado == false);
}

//função para o controle do audio do acorde
function audioAcorde(numero) {
    if(document.getElementById("controle-som").checked == true) {
        console.warn("Som habilitado");
        somAcorde.innerHTML = "";
        somAcorde.innerHTML += '<source src="Sounds/'+tipoAcorde+'/'+tipoAcorde+""+numero+'.mp3" type="audio/mpeg"/>';
        somAcorde.innerHTML += '<source src="Sounds/'+tipoAcorde+'/'+tipoAcorde+""+numero+'.ogg" type="audio/ogg"/>';
        somAcorde.innerHTML += '<source src="Sounds/'+tipoAcorde+'/'+tipoAcorde+""+numero+'.wav" type="audio/wav"/>';
        somAcorde.load();
        somAcorde.play();

    } else {
        console.warn("Som desabilitado");
    }
    
}
    
//função que verifica a etapa para finalizar o cronometro
function finalizarEtapa(){
    if (etapaAtual < etapa) {
        etapaAtual++;
        mostrarEtapa.innerHTML = etapaAtual + "/" + etapa;

        return false;
    }

    somAcorde.innerHTML = "";
    mostrarEtapa.innerHTML = "0/0";
    controlarTempo("cronometro()", false);
    return true;
}

//Função que ira definir o tamanho da janela {
window.addEventListener('resize', function(){
    
});