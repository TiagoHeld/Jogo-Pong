    var btnInicio=document.querySelector("#inicio");
    var btnReinicia=document.querySelector("#reinicia");
    btnInicio.addEventListener("click",inicio);
    btnReinicia.addEventListener("click",reinicia);
    btnReinicia.disabled=true;

    var tela = document.querySelector("canvas");
    var pincel = tela.getContext("2d");
    var inicioJogo;
    pincel.fillStyle = "black";
    pincel.fillRect(0, 0, 600, 400);
    
    var x = 20;
    var velocidadeXBolinha = 6;
    var velocidadeYBolinha = 6;

    var xBolinha = 20;
    var yBolinha = 30;
    var xRaquete = 5;
    var yRaquete = 150;
    var raqueteComprimento = 10;
    var raqueteAltura = 90;
    var xRaqueteOponente = 585;
    var yRaqueteOponente = 150;
    var velocidadeYOponente;
    var meusPontos = 0;
    var pontosOponente = 0;

    var esquerda = 37;
    var cima = 38;
    var direita = 39;
    var baixo = 40;

    pincel.fillStyle = "black";
    pincel.fillRect(0, 0, 600, 400);

    function desenhaCirculo(x, y, raio) {
        pincel.fillStyle = "white";
        pincel.beginPath();
        pincel.arc(x, y, raio, 0, 2 * Math.PI);
        pincel.fill();
    }

    function desenhaRaquete(x, y, raqueteComprimento, raqueteAltura) {
        pincel.fillStyle = "white";
        pincel.fillRect(x, y, raqueteComprimento, raqueteAltura);
    }

    function limpaTela() {
        pincel.clearRect(0, 0, 600, 400);
        pincel.fillStyle = "black";
        pincel.fillRect(0, 0, 600, 400);
        pincel.fillStyle = "white";
        pincel.fillRect(xRaquete, yRaquete, raqueteComprimento, raqueteAltura);
        movimentaBolinha();
        movimentaMinhaRaquete();
    }

    function setup() {
        limpaTela();
        desenhaCirculo(xBolinha, yBolinha, 10);
        movimentaBolinha();
        verificaColisao();
        desenhaRaquete(xRaquete, yRaquete, raqueteComprimento, raqueteAltura);
        setInterval(movimentaMinhaRaquete, 1);
        verificaColisaoRaquete();
        desenhaRaquete(
            xRaqueteOponente,
            yRaqueteOponente,
            raqueteComprimento,
            raqueteAltura
        );

        movimentaRaqueteOponente();
        verificaColisaoRaqueteOponente();
        mostraPlacar();
        marcaPonto();
    }
    function movimentaBolinha() {
        xBolinha += velocidadeXBolinha;
        yBolinha += velocidadeYBolinha;
    }
    function movimentaRaqueteOponente() {
        velocidadeYOponente =
        yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 50;
        yRaqueteOponente += velocidadeYOponente;
    }

    function movimentaMinhaRaquete() {
        document.onkeydown = function (evento) {
            if(evento.keyCode == cima) {
                yRaquete -= 100;
            } else if(evento.keyCode == baixo) {
                yRaquete += 100;
            }
        } 
    }

    function verificaColisao() {
        if (xBolinha >= 600 || xBolinha <= 0) {
            velocidadeXBolinha *= -1;
        }

        if(yBolinha >= 400 || yBolinha <= 0) {
            velocidadeYBolinha *= -1;
        }
    }

    function verificaColisaoRaquete() {
        if (
            xBolinha - 10 < xRaquete + raqueteComprimento &&
            yBolinha - 10 < yRaquete + raqueteAltura &&
            yBolinha + 10 > yRaquete
        ) {
            velocidadeXBolinha *= -1;
    }
    }

    function verificaColisaoRaqueteOponente() {
        if (
            xBolinha + 10 > xRaqueteOponente &&
            yBolinha + 10 > yRaqueteOponente &&
            xBolinha < xRaqueteOponente
        ) {
            velocidadeXBolinha *= -1;
        }
    }

    function mostraPlacar() {
        pincel.fillStyle = "orange";
        pincel.fillRect(200, 20, 35, 20);
        pincel.fillStyle = "white";
        pincel.font = "18px Arial";
        pincel.fillText(meusPontos.toString(), 212, 35);
        pincel.strokeStyle = "white";
        pincel.strokeRect(200, 20, 35, 20);
        pincel.fillStyle = "orange";
        pincel.fillRect(350, 20, 35, 20);
        pincel.fillStyle = "white";
        pincel.font = "18px Arial";
        pincel.fillText(pontosOponente.toString(), 360, 35);
        pincel.strokeStyle = "white";
        pincel.strokeRect(350, 20, 35, 20);
    }

    function marcaPonto() {
        if (xBolinha > 596) {
            meusPontos += 1;
    
        }
        if (xBolinha < 0) {
            pontosOponente += 1;
        }
    }
    
    function inicio() {
        btnInicio.disabled=true;
        btnReinicia.disabled=false;
        xBolinha = 20;
        yBolinha = 30;
        xRaquete = 5;
        yRaquete = 150;
        meusPontos =0;
        pontosOponente=0;
        inicioJogo=setInterval(setup, 18);
    }   

    function reinicia() {
        clearInterval(inicioJogo);  
    // btnInicio.disabled=false;
        inicio();   
    }