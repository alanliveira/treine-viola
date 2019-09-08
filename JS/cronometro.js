var segundo = 0+"0";

function tempo() {
    if (segundo < 30) {
        segundo++;
        if(segundo < 10) {segundo = "0"+segundo}
    } else {
        segundo = 0+"0";
    }
    if(segundo == 0) {
        mudarImagem();
    }
    form.cronometro.value = "00:"+segundo;
}

function mudarImagem() {
    num = Math.floor(Math.random() * 7) + 1;
    alert(num);
    document.getElementById("imagem-acorde").src = "IMG/Violao-Acordes-Maiores-"+num+".png";
}

function iniciar() {
    mudarImagem();
    setInterval("tempo()", 1000);
}