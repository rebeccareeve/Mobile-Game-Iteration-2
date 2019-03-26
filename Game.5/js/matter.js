class SpriteScene extends Phaser.Scene {
  constructor() {
    super('SpriteScene')
    this.id = 'SpriteScene';
    this.switchAnimationRunning = false;
  }

  preload() {

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
    this.load.image('laserBlue', 'assets/blueLaser.png');
    this.load.image('laserRed', 'assets/redLaser.png');
    this.load.image('laserBlueMedium', 'assets/blueLaserMed.png');
    this.load.image('laserRedMedium', 'assets/redLaserMed.png');
    this.load.image('laserRedLarge', 'assets/redLaserLarge.png');

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

    // this.load.spritesheet("endText", "assets/endText.png", {
    //   frameWidth: 188,
    //   frameHeight: 18
    // });
  }

  create() {
    window.addEventListener('resize', resize, false);
    this.matter.world.setBounds(0, 0, 2272, 1265);
    this.player = new Player(this, 2000, 680); //(this, 20, 1240); //300, 900
    // this.enemies = [this.slime1.sprite, this.slime2.sprite, this.slime3.sprite];
    this.player.sensors();
    this.slime1 = new enemy(this, 1500, 1240);
    this.slime2 = new enemy(this, 290, 1080);
    this.slime3 = new enemy(this, 1300, 900);
    this.slime4 = new enemy(this, 1700, 720);
    this.setSlimeVelocityX = 2;
    this.slime1.sensors();
    this.slime2.sensors();
    this.slime3.sensors();
    this.slime4.sensors();
    this.createAnimations()
    this.createLights()
    this.portal = new portal(this, 1300, 530);
    this.blueLaser1 = new laserBlue(this, 2100, 655);
    this.blueLaser2 = new laserBlue(this, 1850, 655);
    this.blueLaser3 = new laserBlueMedium(this, 1600, 655);
    this.blueLaser4 = new laserBlueMedium(this, 900, 715);
    this.blueLaser5 = new laserBlue(this, 350, 655);
    this.redLaser1 = new laserRedLarge(this, 1175, 640);
    this.redLaser2 = new laserRed(this, 1950, 655);
    this.redLaser3 = new laserRedMedium(this, 1600, 655);
    this.redLaser4 = new laserRedMedium(this, 900, 715);
    // this.endText = new text(this, 1300, 530);
    // //cat 0x0016
    // //mask 0x0064

    this.input.addPointer();
    this.input.addPointer();

    var mouseSpring = this.matter.add.mouseSpring();

    mouseSpring.constraint.collisionFilter.category = 0x0064 //TODO Write up about it (catagories and masks)
    mouseSpring.constraint.collisionFilter.mask = 0x0016 //TODO Write up about it (catagories and masks)

    this.leftWall = this.matter.add.rectangle(195, 850, 30, 700, {
      isStatic: true,
    });
    this.rightWall = this.matter.add.rectangle(2265, 910, 15, 705, {
      isStatic: true,
    });

    this.firstFloor = this.matter.add.rectangle(1193, 1095, 1965, 16, {
      isStatic: true,
    });

    for (var i = 0; i < 3; i++) {
      this.floor(1230, (920 - 175 * i), 2050, 16)
    };


    // MATTER OBJECTS FOR SCENES
    {
    this.cupboardStackSecondFloor = new cupboardStack(this, 993, 1040);
    this.stairsThirdFloorLightScene1 = new stairs(this, 1135, 895);
    this.stairsThirdFloorLightScene2 = new stairs(this, 1225, 895);
    this.stairsx2ThirdFloorLightScene = new stairsx2(this, 1180, 880);
    this.stairsThirdFloorDarkScene = new stairs(this, 0, 0); //1895, 895
    this.stairsx2ThirdFloorDarkScene = new stairsx2(this, 0, 0); // 1850, 880
    this.platform1 = new platform(this, 0, 0); // 2035, 1240
    this.platform2 = new platform(this, 0, 0); // 2095, 1207
    this.platform3 = new platform(this, 0, 0); // 2160, 1178
    this.platform4 = new platform(this, 0, 0); // 2222, 1146
    this.barrierFirstFloorLightScene = new barrier(this, 2200, 1185);
    this.barrierSecondFloorDarkScene = new barrier(this, 970, 1010);
    this.barrierThirdFloorDarkScene = new barrier(this, 1190, 835);
    this.barrierThirdFloorLightScene = new barrier(this, 1800, 835);
    // this.locker = new locker(this, 0, 0); //1850, 720
    this.desk = new desk(this, 0, 0);
    this.chair = new chair(this, 0, 0);
    this.platform5 = new platform(this, 1080, 1010);
  }

    //PICKUP OBJECTS
    {
    this.keyCardSecondFloor = new keyCard(this, 770, 1050);
    this.keyCardThirdFloor = new keyCard(this, 1175, 838);
    this.keyCardFourthFloor = new keyCard(this, 1900, 680);
}
    // this.pickUpKeyCards();

    this.cameras.main.setBounds(0, 0, 2272, 1280);
    this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);
    this.cameras.main.zoom = 1; //7                                                                     CAMERA

    this.player.sprite.on('animationcomplete', this.switchAnimComplete, this);


    this.liftSecondFloor = new lift(this, 230, 1047);
    this.liftThirdFloor = new lift(this, 2233, 873);
    this.liftFourthFloor = new lift(this, 230, 695);
    this.portalSensor = new lift(this, 1310, 530);

    // CHECK FOR COLLISION MESSY CODE
    {
      this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.down],
        callback: function() {
          this.player.allowJump = true
        },
        context: this
      });

      this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right],
        objectB: this.portalSensor.sprite,
        callback: this.enterPortal,
        context: this
      });

      this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right],
        objectB: [this.redLaser1.sprite, this.redLaser2.sprite, this.redLaser3.sprite, this.redLaser4.sprite, this.blueLaser1.sprite, this.blueLaser2.sprite, this.blueLaser3.sprite, this.blueLaser4.sprite, this.blueLaser5.sprite],
        callback: this.damagePlayer,
        context: this
      });

      this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right],
        objectB: this.liftSecondFloor.sprite,
        callback: this.lifts1,
        context: this
      });

      this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right],
        objectB: this.liftThirdFloor.sprite,
        callback: this.lifts2,
        context: this
      });

      this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right],
        objectB: this.liftFourthFloor.sprite,
        callback: this.lifts3,
        context: this
      });

      this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right, this.player.sensors.down],
        objectB: this.keyCardSecondFloor.sprite,
        callback: this.pickUpCard1,
        context: this
      });


      this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right, this.player.sensors.down],
        objectB: this.keyCardThirdFloor.sprite,
        callback: this.pickUpCard2,
        context: this
      });


      this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right, this.player.sensors.down],
        objectB: this.keyCardFourthFloor.sprite,
        callback: this.pickUpCard3,
        context: this
      });

      this.matterCollision.addOnCollideStart({
        objectA: [this.slime3.sensors.left],
        callback: this.pathways,
        context: this
      });

      this.matterCollision.addOnCollideStart({
        objectA: [this.slime3.sensors.right],
        callback: this.pathwaysReverse,
        context: this
      });
    }
  }

  //CREATE FLOOR
  floor(x, y, width, height) {
    this.matter.add.rectangle(x, y, width, height, {
      isStatic: true,
    });
  }

  //LIFTS
  liftLeft(x, y, width, height) {
    this.matter.add.rectangle(x, y, width, height, {
      isStatic: true,
    });
  }

  liftRight(x, y, width, height) {
    this.matter.add.rectangle(x, y, width, height, {
      isStatic: true,
    });
  }

  //PICK UP THE KEY CARDS MESSY CODE
  pickUpCard1(playersprite, keycard) {
    this.keyCardSecondFloor.sprite.setVisible(false).setPosition(0, 0);
  }

  pickUpCard2(playersprite, keycard) {
    this.keyCardThirdFloor.sprite.setVisible(false).setPosition(0, 0);
  }

  pickUpCard3(playersprite, keycard) {
    this.keyCardFourthFloor.sprite.setVisible(false).setPosition(0, 0);
  }

  //LIFTS MOVEMENT
  lifts1(playersprite, lift) {
    this.player.sprite.y = 900;
  }

  lifts2(playersprite, lift) {
    this.player.sprite.y = 715;
  }

  lifts3(playersprite, lift) {
    this.player.sprite.y = 535;
  }

  pathways() {
    this.setSlimeVelocityX = 2;
    this.slime1.sprite.flipX = true;
    this.slime2.sprite.flipX = true;
    this.slime3.sprite.flipX = true;
    this.slime4.sprite.flipX = true;
  }
  pathwaysReverse() {
    this.setSlimeVelocityX = -2;
    this.slime1.sprite.flipX = false;
    this.slime2.sprite.flipX = false;
    this.slime3.sprite.flipX = false;
    this.slime4.sprite.flipX = false;
  }

  enterPortal() {
    this.matter.scene.scene.pause('SpriteScene');
    this.matter.scene.scene.setVisible(false, 'UIScene');
    this.matter.scene.scene.setVisible(false, 'SpriteScene');
    // this.endText.sprite.setVisible(true);
    // this.endText.sprite.anims.play('endText', true);
  }

  // PLAYER JUMP ALLOWED CHECK

  playerJump() {
    if (!this.switchAnimationRunning) {
      if (this.player.movement.jump) {
        console.log(this.player.allowJump);
        this.player.movement.jump = false;
        this.player.allowJump = false
        this.player.sprite.setVelocityY(-6);
      } else {
        //this.player.sprite.setVelocityY(0)
      }
    }
  }


  update() {
    this.checkPlayerMovement();
    this.playObjectAnimations();
    this.playerJump();
    this.laserRotations();
    this.playerDeath();
    // this.enemyPathways();
    // this.checkPlayerLifts();
    this.slime1.sprite.setVelocityX(this.setSlimeVelocityX);
    this.slime2.sprite.setVelocityX(this.setSlimeVelocityX);
    this.slime3.sprite.setVelocityX(this.setSlimeVelocityX);
    this.slime4.sprite.setVelocityX(this.setSlimeVelocityX);

  }

  // PLAYER MOVEMENT AND ANIMATION CHECK

  checkPlayerMovement() {

    if (this.player.movement.switch && this.switchAnimationRunning == false) {
      this.player.sprite.anims.stop();
      this.switchAnimationRunning = true;
    }

    if (this.switchAnimationRunning) {
      this.player.sprite.play("characterSwitch", true);
    } else {
      if (this.player.movement.left) {
        this.player.sprite.setVelocityX(-4);
        this.player.sprite.flipX = true;
        this.player.sprite.anims.play("characterWalk", true);
      } else if (this.player.movement.right) {
        this.player.sprite.setVelocityX(4);
        this.player.sprite.flipX = false;
        this.player.sprite.anims.play("characterWalk", true);
      } else {
        this.player.sprite.setVelocityX(0)
        if (!this.switchAnimationRunning) {}
        this.player.sprite.anims.play("characterIdle", true);
      }
    }
    // if (!this.switchAnimationRunning) {
    //   if (jumpUp) {
    //     this.player.sprite.setVelocityY(-3);
    //     jumpUp = false;
    //     console.log('hi');
    //   } else {
    //     this.player.sprite.setVelocityY(0)
    //   }
    // }
  }


  //SWITCHING SCENES

  switchAnimComplete(animation, frame) {
    if (animation.key === "characterSwitch") {
      if (this.scene.isVisible('DarkScene')) {
        this.scene.get('LightScene').scene.setVisible(true);
        this.scene.get('DarkScene').scene.setVisible(false);
        this.lightScene();
      } else {
        this.scene.get('LightScene').scene.setVisible(false);
        this.scene.get('DarkScene').scene.setVisible(true);
        this.darkScene();
      }
      this.switchAnimationRunning = false;
      this.player.movement.switch = false;
    }
  }

  laserRotations() {
    this.blueLaser3.sprite.setRotation(Phaser.Math.DegToRad(68));
    this.blueLaser4.sprite.setRotation(Phaser.Math.DegToRad(90));
    this.redLaser1.sprite.setRotation(Phaser.Math.DegToRad(90));
    this.redLaser3.sprite.setRotation(Phaser.Math.DegToRad(291));
    this.redLaser4.sprite.setRotation(Phaser.Math.DegToRad(90));
  }

  damagePlayer() {
  this.player.health --;
  console.log(this.player.health);
  }

  playerDeath() {
    if(this.player.health == 0){
      this.matter.scene.scene.pause('SpriteScene');
      console.log('dead');
    }

  }

  // IF FUNCTIONS FOR OBJECTS IN SCENES

  lightScene() {
    if (this.scene.get('LightScene').scene.isVisible()) {
      this.stairsThirdFloorLightScene1.sprite.setVisible(true).setPosition(1135, 895);
      this.stairsThirdFloorLightScene2.sprite.setVisible(true).setPosition(1225, 895);
      this.stairsx2ThirdFloorLightScene.sprite.setVisible(true).setPosition(1180, 880);
      this.stairsThirdFloorDarkScene.sprite.setVisible(false).setPosition(0, 0);
      this.stairsx2ThirdFloorDarkScene.sprite.setVisible(false).setPosition(0, 0);
      this.platform1.sprite.setVisible(false).setPosition(0, 0);
      this.platform2.sprite.setVisible(false).setPosition(0, 0);
      this.platform3.sprite.setVisible(false).setPosition(0, 0);
      this.platform4.sprite.setVisible(false).setPosition(0, 0);
      this.barrierFirstFloorLightScene.sprite.setVisible(true).setPosition(2200, 1185);
      this.barrierSecondFloorDarkScene.sprite.setVisible(false).setPosition(0, 0);
      this.barrierThirdFloorDarkScene.sprite.setVisible(false).setPosition(0, 0);
      this.barrierThirdFloorLightScene.sprite.setVisible(true).setPosition(1800, 835);
      this.keyCardSecondFloor.sprite.setVisible(true).setPosition(770, 1050);
      this.keyCardThirdFloor.sprite.setVisible(true).setPosition(1175, 838);
      this.keyCardFourthFloor.sprite.setVisible(false).setPosition(0, 0);
      // this.locker.sprite.setVisible(false).setPosition(0, 0).setStatic(true);
      this.slime1.sprite.setPosition(this.slime1.sprite.x, this.slime1.sprite.y);
      this.slime2.sprite.setPosition(this.slime2.sprite.x, this.slime2.sprite.y);
      this.slime3.sprite.setPosition(this.slime3.sprite.x, this.slime3.sprite.y);
      this.slime4.sprite.setPosition(this.slime4.sprite.x, this.slime4.sprite.y);
      this.desk.sprite.setVisible(false).setPosition(0, 0).setStatic(true);
      this.chair.sprite.setVisible(false).setPosition(0, 0).setStatic(true);
      this.platform5.sprite.setVisible(false).setPosition(0, 0);
      this.liftSecondFloor.sprite.setPosition(230, 1047);
      this.liftThirdFloor.sprite.setPosition(2233, 873);
      this.liftFourthFloor.sprite.setPosition(230, 695);
      this.blueLaser1.sprite.setVisible(false).setPosition(0, 0);
      this.blueLaser2.sprite.setVisible(false).setPosition(0, 0);
      this.blueLaser3.sprite.setVisible(false).setPosition(0, 0);
      this.blueLaser4.sprite.setVisible(false).setPosition(0, 0);
      this.blueLaser5.sprite.setVisible(false).setPosition(0, 0);
      this.redLaser1.sprite.setVisible(true).setPosition(1175, 640);
      this.redLaser2.sprite.setVisible(true).setPosition(1950, 655);
      this.redLaser3.sprite.setVisible(true).setPosition(1600, 655);
      this.redLaser4.sprite.setVisible(true).setPosition(900, 715);
    }
  }

  darkScene() {
    if (this.scene.get('DarkScene').scene.isVisible()) {
      this.stairsThirdFloorLightScene1.sprite.setVisible(false).setPosition(0, 0);
      this.stairsThirdFloorLightScene2.sprite.setVisible(false).setPosition(0, 0);
      this.stairsx2ThirdFloorLightScene.sprite.setVisible(false).setPosition(0, 0);
      this.stairsThirdFloorDarkScene.sprite.setVisible(true).setPosition(1895, 895);
      this.stairsx2ThirdFloorDarkScene.sprite.setVisible(true).setPosition(1850, 880);
      this.platform1.sprite.setVisible(true).setPosition(2035, 1240);
      this.platform2.sprite.setVisible(true).setPosition(2095, 1207);
      this.platform3.sprite.setVisible(true).setPosition(2160, 1178);
      this.platform4.sprite.setVisible(true).setPosition(2222, 1146);
      this.barrierFirstFloorLightScene.sprite.setVisible(false).setPosition(0, 0);
      this.barrierSecondFloorDarkScene.sprite.setVisible(true).setPosition(970, 1010);
      this.barrierThirdFloorDarkScene.sprite.setVisible(true).setPosition(1190, 835);
      this.barrierThirdFloorLightScene.sprite.setVisible(false).setPosition(0, 0);
      this.keyCardSecondFloor.sprite.setVisible(false).setPosition(0, 0);
      this.keyCardThirdFloor.sprite.setVisible(false).setPosition(0, 0);
      this.keyCardFourthFloor.sprite.setVisible(true).setPosition(1900, 680);
      // this.locker.sprite.setVisible(true).setPosition(1850, 720).setStatic(false);
      this.slime1.sprite.setPosition(this.slime1.sprite.x, this.slime1.sprite.y);
      this.slime2.sprite.setPosition(this.slime2.sprite.x, this.slime2.sprite.y);
      this.slime3.sprite.setPosition(this.slime3.sprite.x, this.slime3.sprite.y);
      this.slime4.sprite.setPosition(this.slime4.sprite.x, this.slime4.sprite.y);
      this.desk.sprite.setVisible(true).setPosition(1300, 1080).setStatic(false);
      this.chair.sprite.setVisible(true).setPosition(1280, 1080).setStatic(false);
      this.platform5.sprite.setVisible(true).setPosition(1080, 1010);
      this.liftSecondFloor.sprite.setPosition(0, 0);
      this.liftThirdFloor.sprite.setPosition(0, 0);
      this.liftFourthFloor.sprite.setPosition(0, 0);
      this.blueLaser1.sprite.setVisible(true).setPosition(2100, 655);
      this.blueLaser2.sprite.setVisible(true).setPosition(1850, 655);
      this.blueLaser3.sprite.setVisible(true).setPosition(1600, 655);
      this.blueLaser4.sprite.setVisible(true).setPosition(900, 715);
      this.blueLaser5.sprite.setVisible(true).setPosition(350, 655);
      this.redLaser1.sprite.setVisible(false).setPosition(0, 0);
      this.redLaser2.sprite.setVisible(false).setPosition(0, 0);
      this.redLaser3.sprite.setVisible(false).setPosition(0, 0);
      this.redLaser4.sprite.setVisible(false).setPosition(0, 0);
    }
  }

  // PLAY ANIMATIONS FOR KEYCARDS + ENEMIES
  playObjectAnimations() {
    this.keyCardSecondFloor.sprite.anims.play("keyCardFlash", true);
    this.keyCardThirdFloor.sprite.anims.play("keyCardFlash", true);
    this.keyCardFourthFloor.sprite.anims.play("keyCardFlash", true);
    // this.slime1.sprite.anims.play('enemy', true);
    this.slime2.sprite.anims.play('enemy', true);
    this.slime3.sprite.anims.play('enemy', true);
    this.slime4.sprite.anims.play('enemy', true);
    this.portal.sprite.anims.play('portal', true);
  }

  // PLAYER ANIMATIONS - IDLE, WALK AND SWITCH & KEYCARD ANIMATION

  createAnimations() {
    this.anims.create({
      key: "characterIdle",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 4
      }),
      repeat: -1,
      frameRate: 15
    });

    this.anims.create({
      key: "characterWalk",
      frames: this.anims.generateFrameNumbers("walk", {
        start: 0,
        end: 5
      }),
      repeat: -1,
      frameRate: 15
    });

    this.anims.create({
      key: "characterSwitch",
      frames: this.anims.generateFrameNumbers("switch", {
        start: 0,
        end: 8
      }),
      repeat: 0,
      frameRate: 10
    });

    this.anims.create({
      key: 'keyCardFlash',
      frames: this.anims.generateFrameNumbers('keyCardSprite', {
        start: 0,
        end: 11
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'enemy',
      frames: this.anims.generateFrameNumbers('slime', {
        start: 0,
        end: 2
      }),
      frameRate: 4,
      repeat: -1,
    });
    this.anims.create({
      key: 'portal',
      frames: this.anims.generateFrameNumbers('portal', {
        start: 3,
        end: 12
      }),
      frameRate: 8,
      repeat: -1,
    });
    // this.anims.create({
    //   key: 'endText',
    //   frames: this.anims.generateFrameNumbers('endText', {
    //     start: 0,
    //     end: 17
    //   }),
    //   frameRate: 3,
    //   repeat: -1,
    // });
  }

  // CREATE LIGHTS (VERY MESSY)

  createLights() {
    var lightA = this.matter.add.image(1270, 780, 'light', null, {
      shape: 'rectangle'

    }).setScale(1);

    this.matter.add.worldConstraint(lightA, 80, 0.1, {
      //   render: {
      //     visible: true,
      //     lineWidth: 2,
      //     strokeStyle: '#666'
      // },
      pointA: {
        x: 1220,
        y: 750
      },
      pointB: {
        x: -20,
        y: 0
      },
    });


    this.matter.add.worldConstraint(lightA, 80, 0.1, {
      pointA: {
        x: 1300,
        y: 750
      },
      pointB: {
        x: 20,
        y: 0
      }
    });

    var lightB = this.matter.add.image(1370, 780, 'light', null, {
      shape: 'rectangle'
    }).setScale(1);

    this.matter.add.worldConstraint(lightB, 80, 0.1, {
      pointA: {
        x: 1320,
        y: 750
      },
      pointB: {
        x: -20,
        y: 0
      }
    });

    this.matter.add.worldConstraint(lightB, 80, 0.1, {
      pointA: {
        x: 1400,
        y: 750
      },
      pointB: {
        x: 20,
        y: 0
      }
    });

    var lightC = this.matter.add.image(1470, 780, 'light', null, {
      shape: 'rectangle'
    }).setScale(1);

    this.matter.add.worldConstraint(lightC, 80, 0.1, {
      pointA: {
        x: 1420,
        y: 750
      },
      pointB: {
        x: -20,
        y: 0
      }
    });

    this.matter.add.worldConstraint(lightC, 80, 0.1, {
      pointA: {
        x: 1500,
        y: 750
      },
      pointB: {
        x: 20,
        y: 0
      }
    });

    var lightD = this.matter.add.image(1570, 780, 'light', null, {
      shape: 'rectangle'
    }).setScale(1);

    this.matter.add.worldConstraint(lightD, 80, 0.1, {
      pointA: {
        x: 1520,
        y: 750
      },
      pointB: {
        x: -20,
        y: 0
      }
    });

    this.matter.add.worldConstraint(lightD, 80, 0.1, {
      pointA: {
        x: 1600,
        y: 750
      },
      pointB: {
        x: 20,
        y: 0
      }
    });

    var lightE = this.matter.add.image(1670, 780, 'light', null, {
      shape: 'rectangle'
    }).setScale(1);

    this.matter.add.worldConstraint(lightE, 80, 0.1, {
      pointA: {
        x: 1620,
        y: 750
      },
      pointB: {
        x: -20,
        y: 0
      }
    });

    this.matter.add.worldConstraint(lightE, 80, 0.1, {
      pointA: {
        x: 1700,
        y: 750
      },
      pointB: {
        x: 20,
        y: 0
      }
    });

    var lightF = this.matter.add.image(1770, 780, 'light', null, {
      shape: 'rectangle'
    }).setScale(1);

    this.matter.add.worldConstraint(lightF, 80, 0.1, {
      pointA: {
        x: 1720,
        y: 750
      },
      pointB: {
        x: -20,
        y: 0
      }
    });

    this.matter.add.worldConstraint(lightF, 80, 0.1, {
      pointA: {
        x: 1800,
        y: 750
      },
      pointB: {
        x: 20,
        y: 0
      }
    });
  }

}
