// COLLIDES WITH LIFTS

this.matterCollision.addOnCollideStart({
  objectA: [this.player.sprite],
  objectB: [this.liftLeft, this.liftRight],
  callback: this.lifts,
  context: this
});


lifts() {
this.player.sprite.y -= 45;
}

// CHECK PLAYER JUMP

checkPlayerIsTouchingFloor() {
  this.matterCollision.addOnCollideStart({
    objectA: [this.player.sprite.sensors.down],
    callback: this.playerJump,
    context: this
  });
}


playerJump() {
  if (!this.switchAnimationRunning) {
    if (this.player.movement.jump) {
      this.player.sprite.setVelocityY(-3);
    } else {
      this.player.sprite.setVelocityY(0)
    }
}


  // PLAYER PICK UP OBJECTS

  pickUpKeyCards() {
    console.log(this);
    this.matterCollision.addOnCollideStart({
      objectA: [this.player.sprite],
      objectB: [this.keyCardSecondFloor],
      callback: this.pickupcard,
      context: this
    });
  }

  pickupcard(playersprite, keycard) {
    this.keyCardSecondFloor.sprite.setVisible(false).setPosition(0, 0);
  }

//ENEMY SENSORS

  sensors() {
    const Bodies = Phaser.Physics.Matter.Matter.Bodies;
    this.sensors = {
      left: Bodies.rectangle(this.sprite.x - 10 + 3, this.sprite.y, 4, 10, {
        isSensor: true
      }),
      right: Bodies.rectangle(this.sprite.x + 10 - 3, this.sprite.y, 4, 10, {
        isSensor: true
      }),
      down: Bodies.rectangle(this.sprite.x, this.sprite.y + 15, 10 , 2, {
        isSensor: true
      })
    };

    const mainBody = this.sprite.body;

    const compoundBody = Phaser.Physics.Matter.Matter.Body.create({
      parts: [mainBody, this.sensors.left, this.sensors.right, this.sensors.down],
      friction: 0.001,
    });

    this.sprite.setExistingBody(compoundBody);
  }

  // ENEMY PATHWAYS (OLD WAY)

  enemyPathways() {
    if (this.slime1.sprite.x < 2082) {
      this.slime1.sprite.setVelocityX(2)
    }
    if (this.slime1.sprite.x > 2230) {
      this.slime1.sprite.setVelocityX(-2)
    }
  }
