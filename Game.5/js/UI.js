class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene')
  }
  preload() {
    this.load.spritesheet('leftButton', 'assets/left.png', {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet('rightButton', 'assets/right.png', {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet('upButton', 'assets/up.png', {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet('switchButton', 'assets/switch.png', {
      frameWidth: 80,
      frameHeight: 80,
    });
  }
  create() {
    console.log(this);
    this.buttons = {
      left: new Button(this, 150, 1145, 'leftButton').sprite.setInteractive().on('pointerdown', function() {this.scene.manager.getScene('SpriteScene').player.movement.left = true}, this),
      right: new Button(this, 500, 1145, 'rightButton').sprite.setInteractive().on('pointerdown', function() {this.scene.manager.getScene('SpriteScene').player.movement.right = true}, this),
      jump: new Button(this, 2145, 1145, 'upButton').sprite.setInteractive().on('pointerdown', function() {
        if (this.scene.manager.getScene('SpriteScene').player.allowJump) {
          this.scene.manager.getScene('SpriteScene').player.movement.jump = true

        }
      }, this),
      switch: new Button(this, 2145, 130, 'switchButton').sprite.setInteractive().on('pointerdown', function() {this.scene.manager.getScene('SpriteScene').player.movement.switch = true}, this),
    }
    this.buttons.left.on('pointerup', function() {this.scene.manager.getScene('SpriteScene').player.movement.left = false}, this);
    this.buttons.left.on('pointerout', function() {this.scene.manager.getScene('SpriteScene').player.movement.left = false}, this);
    this.buttons.right.on('pointerup', function() {this.scene.manager.getScene('SpriteScene').player.movement.right = false}, this);
    this.buttons.right.on('pointerout', function() {this.scene.manager.getScene('SpriteScene').player.movement.right = false}, this);
    //this.buttons.jump.on('pointerup', function() {this.scene.manager.getScene('SpriteScene').player.movement.jump = false}, this);
    //this.buttons.switch.on('pointerup', function() {this.scene.manager.getScene('SpriteScene').player.movement.switch = false}, this);
  }
}
