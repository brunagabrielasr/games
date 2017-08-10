
var player, monster, cursors, txtScore, score;

var game= new Phaser.Game(
	'100%', //tamanho da tela em x
	'100%', //tamanho da tela em y
	Phaser.CANVAS, //atribiu o canvas dentro do body-html
	'Game Demo', //nome do jogo
	{	preload: preload, 
		create: create, 
		update:update
	}
);

function preload(){
	game.load.spritesheet('player', 'img/player.jpg', 32,48); //carrega as imagens do player de acordo com o tamanho e largura de cada quadro.
	game.load.image('monster', 'img/monster.jpg'); //carrega a imagem
	game.load.image('background', 'img/bg.jpg'); //carrega o background

	game.load.audio('music', 'music/music1.mp3');
	game.load.audio('ping', 'sound/ping.mp3');
}

function create(){
	var music = game.sound.play('music');
	music.volume = 0.5;
	music.loopFull;

	game.world.resize(2000, 2000);//define o tamanho do mundo de acordo com o tamanho da imagem

	game.add.sprite(0,0,'background');//preenche o background na posição x e y 0.

	player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');//para o player aparecer sempre no centro do mapa.
	game.camera.follow(player);
	game.physics.enable(player, Phaser.Physics.ARCADE);//tipo da física utilizada

	//atribui os quadros referentes a ação
	player.animations.add('walkDown', [0,1,2,3]); 
	player.animations.add('walkLeft', [4,5,6,7]);
	player.animations.add('walkRight',[8,9,10,11]);
	player.animations.add('walkUp',   [12,13,14,15]);

	
	monster = game.add.group();// se não adicionar o group não da para fazer o for???
	for (var i = 0; i<10; i++) {
		var randomX = game.world.randomX;
		var randomY = game.world.randomY;
		theMonster = monster.create( randomX, randomY, 'monster');// apresenta o monster em qualquer lugar dentro do mundo
		var styleName = {font: '25px Arial', fill:'#fff'};
		var text = game.add.text(randomX, randomY, (i+1).toString(), styleName);
		theMonster.theName = text;
	};
	game.physics.enable(monster, Phaser.Physics.ARCADE);

	score = 0;
	var style = {font: '25px Arial', fill: '#bddb28'};
	txtScore = game.add.text(10,10, score.toString(), style);
	txtScore.fixedToCamera = true;//o score fica fixo na camera

	cursors = game.input.keyboard.createCursorKeys();//pega os botões pressionados
}

function update(){
	/*Para cada tecla uma animação será atribuida
	Parametros: o nome da acão, qtas vezes os quadros se repetem, looping*/
	if(cursors.left.isDown){
		player.animations.play('walkLeft',5, false)
		player.x -= 2;
	}else if(cursors.right.isDown){
		player.animations.play('walkRight',5, true)
		player.x += 2;
	}else if(cursors.up.isDown){
		player.animations.play('walkUp',5, true)
		player.y -= 2;
	}else if(cursors.down.isDown){
		player.animations.play('walkDown',5, true)
		player.y += 2;
	}else{
		player.animations.stop();
	}

	game.physics.arcade.overlap(player, monster, monsterHitHandler);
	if(!cursors.down.isDown && !cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown){
		player.animations.stop();
	}
}

function monsterHitHandler(playerObject, monsterObject){
	monsterObject.x = game.world.randomX;
	monsterObject.y = game.world.randomY;
	game.sound.play('ping');
	score++;
	txtScore.setText(score.toString());

	if(monsterObject[0] == 1){
		monster.remove(monsterObject);
		monsterObject.theName.destroy();
		console.log(monsterObject);
	}

	// count = 1;
	// while(count < 11){
	// 	if(count == parseInt(monsterObject.theName.text)){
	// 		monster.remove(monsterObject);
	// 		monsterObject.theName.destroy();
	// 		console.log(monsterObject);
	// 		count++;
	// 	}
	// }
	// for (var i = 1; i<11; i++) {
	// 	if(i == monsterObject.theName.text){
	// 		monster.remove(monsterObject);
	// 		monsterObject.theName.destroy();
	// 		console.log(monsterObject);
	// 	}
	// }
		

	// monster.remove(monsterObject);
	// monsterObject.theName.destroy();
	// console.log(monsterObject.theName);

}