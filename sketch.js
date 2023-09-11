//variáveis

var jogador, solo;

var inimigo, fundo;

var restart, checkpoint;

//imagem de variáveis

var jogadorIMG, soloIMG;

var inimigoIMG, fundoIMG;

var restartIMG, checkpointSOM;

//estados e pontos

var pontos = 0;

var play = 1;

var end = 0;

var estadoDoJogo = play

function SpawnarObstaculo() {
  if (frameCount % 80 === 0) {
    Obstaculo = createSprite(width, height - 85, 20, 30);
    Obstaculo.velocityX = -(3 + pontos / 300);
    rand = Math.round(random(1, 6));

    switch (rand) {
      case 1: Obstaculo.addImage(Obstaculo1);
        break;
      case 2: Obstaculo.addImage(Obstaculo2);
        break;
      case 3: Obstaculo.addImage(Obstaculo3);
        break;
      case 4: Obstaculo.addImage(Obstaculo4);
        break;
      case 5: Obstaculo.addImage(Obstaculo5);
        break;
      case 6: Obstaculo.addImage(Obstaculo6);
        break;
      default: break;
    }
    Obstaculo.scale = 0.4;

    ObstaculosGP.add(Obstaculo)
    Obstaculo.lifetime = 450;
  }



}
function preload() {
  jogadorIMG = loadImage("prota.gif");
  soloIMG = loadImage("ground2.png");
  inimigoIMG = loadImage("bixo.gif");
  restartIMG = loadImage("restart.gif");
  checkpointSOM = loadSound("checkpoint.mp3");
  fundoIMG =loadImage("3.jpg");
  Obstaculo1 = loadImage("obstacle1.png");
  Obstaculo2 = loadImage("obstacle2.png");
  Obstaculo3 = loadImage("obstacle3.png");
  Obstaculo4 = loadImage("obstacle4.png");
  Obstaculo5 = loadImage("obstacle5.png");
  Obstaculo6 = loadImage("obstacle6.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  jogador = createSprite(50, height - 100, 20, 50);
  jogador.addImage(jogadorIMG);
  jogador.scale = 0.5;
  jogador.setCollider("circle", 0, 0, 40);
  jogador.debug = false;
  solo = createSprite(width / 2, height - 50, width, 2);
  solo.addImage(soloIMG);
  PisoInvisivel = createSprite(width / 2, height - 40, width, 125);
  PisoInvisivel.visible = false;
  inimigo = createSprite(1300, height - 180, 4);
  inimigo.addImage(inimigoIMG);
  inimigo.scale = 0.5
  inimigo.debug = false;
  restart = createSprite(width / 2, height / 2);
  restart.addImage(restartIMG);
  ObstaculosGP = new Group();

}

function draw() {
  background(fundoIMG);
  textSize(20)
  text("Pontos:" + pontos, 1190, 50);
  if (estadoDoJogo === play) {
    solo.velocityX = -(4 + 3 * pontos / 250);
    pontos = pontos + Math.round(getFrameRate() / 60);
    if (pontos > 0 && pontos % 500 === 0) {
      checkpointSOM.play();
    }
    if (solo.x < 0) {

      solo.x = solo.width / 2;


    }

    if (keyDown("Space") && jogador.y >= height - 200) {
      jogador.velocityY = -10;
     

    }
    jogador.velocityY = jogador.velocityY + 0.5;
    jogador.collide(PisoInvisivel);
    SpawnarObstaculo();

    if (ObstaculosGP.isTouching(jogador)) {
      estadoDoJogo = end;
  
    }

  }else{
    solo.velocityX = 0;
    ObstaculosGP.setVelocityXEach(0);
    jogador.velocityY = 0;
    
    ObstaculosGP.setLifetimeEach(-1);
   





  }
  drawSprites();
}


