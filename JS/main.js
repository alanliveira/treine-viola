var cont;
var numAnterio;
var segundo;
var temp;
var contagemRegresiva;
var contagem;
var tipoAcorde="";

//função para zerar as contagens
function zerarContagem() {
    cont = 1;
    numAnterio = 0;
    segundo = 0+"0";
    temp = 0;
    contagemRegresiva = 4;
    contagem = 0;
}

//função q irá inciar a contagem e coloca a primeira imagem
function iniciar(acorde) {
    tipoAcorde = acorde;
    zerarContagem();
    document.getElementById("violao").style.display = "none";
    document.getElementById("treinamento").style.display = "flex"; document.getElementById("preparo").style.display = "flex";
    contagem = setInterval("prepararTempo()", 1000);
}

//funçao para preparar o treino
function prepararTempo() {
    contagemRegresiva--;
    document.getElementById("preparo").innerHTML = contagemRegresiva-1;
    if (contagemRegresiva == 1) {
        document.getElementById("preparo").innerHTML = "Já";
    }
    if(contagemRegresiva == 0) {
        document.getElementById("preparo").style.display = "none";
        document.getElementById("preparo").innerHTML = "3";
        clearInterval(contagem);
        cicloTempo(true);
        temp = setInterval("tempo()", 1000);
    }
}

function tempo() {
    //Verificar o tempo a ser estimado
    if (segundo < 10) {
        segundo++;
        if(segundo < 10) {segundo = "0"+segundo}
    } else {
        //zerar a contagem
        segundo = 0+"0";
        //mudar a imagem para trinar outro acorde
        //verificar o cilo de etapas a ser executado pela pessoa
        if (cont == 14){
            cicloTempo(false);
            pararContagem();
            zerarContagem();
            document.getElementById("treinamento").style.display = "none";
            document.getElementById("violao").style.display = "flex";
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
    if(numAnterio == num){
        num = sotearNum();
    }
    document.getElementById("imagem-acorde").src = "IMG/"+tipoAcorde+""+num+".png";
    /*console.log("II - var num: " + num + " var numAnterior: " + numAnterio);*/
    numAnterio = num;
}

//Função para parar o ciclo de treino
function pararContagem(){
    clearInterval(temp);
    console.log("contagem parada");
}

//Função que ira sortear um número aleatório
function sotearNum() {
    return Math.floor(Math.random() * 7) + 1;
}

//função para mostrar o ciclo do tempo a ser treinado
function cicloTempo(modoAutomatico) {
    mudarImagem();
    if(modoAutomatico == true) {
        document.getElementById("ciclo").innerHTML = cont+"/14";
    }  else {
        document.getElementById("ciclo").innerHTML = 0+"/14";
        document.getElementById("imagem-acorde").src = "IMG/"+tipoAcorde+"0.png";
    }
}