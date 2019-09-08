var cont;
var numAnterio;
var segundo;
var temp;

//função q irá inciar a contagem e coloca a primeira imagem
function iniciar() {
    zerarContagem();
    mudarImagem();
    cicloTempo(true);
    temp = setInterval("tempo()", 1000);
    document.getElementById("inicio").style.display = "none";
    document.getElementById("treinamento").style.display = "flex";
}

//função para zerar as contagens
function zerarContagem() {
    cont = 1;
    numAnterio = 0;
    segundo = 0+"0";
    temp = 0;
}

function tempo() {
    //Verificar o tempo a ser estimado
    if (segundo < 5) {
        segundo++;
        if(segundo < 10) {segundo = "0"+segundo}
    } else {
        //zerar a contagem
        segundo = 0+"0";
        //mudar a imagem para trinar outro acorde
        if(segundo == 0) {
            mudarImagem();

        }
        //verificar o cilo de etapas a ser executado pela pessoa
        if (cont == 10){
            cicloTempo(false);
            pararContagem();
            zerarContagem();
            document.getElementById("treinamento").style.display = "none";
            document.getElementById("inicio").style.display = "flex";
        } else {
            cont++;
            cicloTempo(true);
        }
        /*console.log("Contagem: " + cont)*/
    }
    
    //mostrar o tempo na tela
    form.cronometro.value = "00:"+segundo;
    ;
}

//função para mudar a imagem na tela
function mudarImagem() {
    num = sotearNum();
    /*console.log("I - var num: " + num + " var numAnterior: " + numAnterio);*/
    if(numAnterio == num){num = sotearNum()}
    document.getElementById("imagem-acorde").src = "IMG/Violao-Acordes-Maiores-"+num+".png";
    /*console.log("II - var num: " + num + " var numAnterior: " + numAnterio);
    numAnterio = num;*/
    if(cont == 10) {
        document.getElementById("imagem-acorde").src = "IMG/Violao-Acordes-Maiores-0.png";
    }
}

//Função para parar o ciclo de treino
function pararContagem(){
    clearInterval(temp);
}

//Função que ira sortear um número aleatório
function sotearNum() {
    return num = Math.floor(Math.random() * 7) + 1;
}

//função para mostrar o ciclo do tempo a ser treinado
function cicloTempo(modoAutomatico) {
    if(modoAutomatico == true) {
        document.getElementById("ciclo").innerHTML = cont;
    }  else {
        document.getElementById("ciclo").innerHTML = 0;
    }
}

