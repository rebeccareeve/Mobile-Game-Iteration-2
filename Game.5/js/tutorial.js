class Tutorial extends Phaser.Scene {
    constructor(id) {
      super(id);
      this.id = id;
    }

    preload() {
      this.load.image('backgroundScreen', 'assets/backgroundScreen.png');
      this.load.image('left', 'assets/left.png');
      this.load.image('right', 'assets/right.png');
      this.load.image('up', 'assets/up.png');
      this.load.image('switchbtn', 'assets/switch.png');
      this.load.image('movement', 'assets/movement.png');
      this.load.image('jump', 'assets/jump.png');
      this.load.image('switchRealities', 'assets/switchRealities.png');
      this.load.spritesheet('start', 'assets/start.png', {
        frameWidth: 90,
        frameHeight: 30,
      });

      this.load.image('light', 'assets/light.png');
      this.load.image('chair1', 'assets/chair1.png');
      this.load.image('chair2', 'assets/chair2.png');
      this.load.image('printer', 'assets/printer.png');
      this.load.image('cupboard', 'assets/cupboard.png');
      this.load.image('stairs', 'assets/stairs.png');
      this.load.image('stairsx2', 'assets/stairsx2.png');
      this.load.image('desk', 'assets/desk.png');
      this.load.image('locker', 'assets/locker.png');
      this.load.image('platform', 'assets/platform.png');
      this.load.image('barrier', 'assets/barrier.png');
      // this.load.image('laserBlue', 'assets/blueLaser.png');
      // this.load.image('laserRed', 'assets/redLaser.png');
      this.load.image('laserBlueMedium', 'assets/blueLaserMed.png');
      this.load.image('laserRedMedium', 'assets/redLaserMed.png');
      this.load.image('laserRedLarge', 'assets/redLaserLarge.png');
      this.load.image('brick', 'assets/brick.png');

      this.load.audio('backgroundMusic', 'assets/backgroundMusic.mp3');

      this.load.spritesheet("player", 'assets/SpriteSheetIdle.png', {
        frameWidth: 21,
        frameHeight: 50,
      });
      this.load.spritesheet("walk", "assets/SpriteSheetWalk.png", {
        frameWidth: 23,
        frameHeight: 50
      });
      this.load.spritesheet("switch", "assets/SpriteSheetAction.png", {
        frameWidth: 34,
        frameHeight: 50
      });

      this.load.spritesheet("keyCardSprite", "assets/keyCardSpriteSheetNB.png", {
        frameWidth: 160,
        frameHeight: 160
      });

      this.load.spritesheet("cupboardStack", "assets/cupboardStack.png", {
        frameWidth: 23,
        frameHeight: 160
      });

      this.load.spritesheet("slime", "assets/Slime.png", {
        frameWidth: 62,
        frameHeight: 42
      });

      this.load.spritesheet("portal", "assets/portal.png", {
        frameWidth: 182,
        frameHeight: 206
      });

      this.load.spritesheet("laserRed", 'assets/redLaserSS.png', {
        frameWidth: 9,
        frameHeight: 205,
      });

      this.load.spritesheet("laserBlue", 'assets/blueLaserSS.png', {
        frameWidth: 9,
        frameHeight: 207,
      });

    }

    create() {
      this.add.image(200, 300, 'backgroundScreen').setScale(12);
      this.add.image(400, 700, 'left').setScale(3);
      this.add.image(700, 700, 'right').setScale(3);
      this.add.image(1150, 700, 'up').setScale(3);
      this.add.image(1750, 700, 'switchbtn').setScale(3);
      this.add.image(550, 500, 'movement').setScale(3);
      this.add.image(1150, 500, 'jump').setScale(3);
      this.add.image(1780, 500, 'switchRealities').setScale(3);
      // this.start = this.add.sprite(1130, 1070, 'start').setScale(5);
      new Button(this, 1130, 1070, 'start').sprite.setInteractive().on('pointerdown', this.startGame, this);

    }
    update(time, delta) {

    }

    startGame() {
      this.scene.start('LightScene');
    }
  }
