var width= window.innerWidth;
var width= window.innerWidth;
var height= window.innerHeight;

var player, monster, cursors, txtScore, score;

var game= new Phaser.Game(
	width,
	height,
	Phaser.CANVAS,
	'Game Demo',
	{preload: preload, create: create, update:update}
);

function preload(){
	game.load.image('player', 'ig/player.jpg');
	game.load.image('monster', 'ig/monster.jpg');
	game.load.image('background', 'ig/bg.jpg');

}

function create(){
	game.add.sprite(0,0,'background');

	player = game.add.sprite(100, 100, 'player');
	player.anchor.setTo(0.5, 0);
	game.physics.enable(player, Phaser.Physics.ARCADE);

	var x = Math.random()* game.width;
	var y = Math.random()* game.height;

	monster = game.add.sprite(x, y, 'monster');
	game.physics.enable(monster, Phaser.Physics.ARCADE);

	score = 0;
	var style = { font: '25px Arial', fill: '#bddb28'};
	txtScore = game.add.text(10,10 score.toString(), style);

	cursors = game.input.keyboard.createCursorKeys();

}

function update(){

}