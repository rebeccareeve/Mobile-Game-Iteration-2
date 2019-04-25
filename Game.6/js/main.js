var config = {
  type: Phaser.WEBGL, //Phaser.AUTO
  width: 2272,
  height: 1280,
  backgroundColor: '#000000',
  parent: 'phaser-example',
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        y: 1
      },
      debug: false,
      debugBodyColor: 0xffffff
    }
  },
  scene: [Tutorial, LightScene, DarkScene, SpriteScene, UIScene, Restart, GameOver],
  callbacks: {
    postBoot: function() {
      // resize();
      // window.addEventListener("resize", resize, false);
    }
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin, // The plugin class
        key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
        mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
      }
    ]
  },
  scale:{
    mode: Phaser.Scale.FIT
  }
};

var game = new Phaser.Game(config);

// function resize() {
//   var canvas = document.querySelector("canvas");
//   var windowWidth = window.innerWidth;
//   var windowHeight = window.innerHeight;
//   var windowRatio = windowWidth / windowHeight;
//   var gameRatio = game.config.width / game.config.height;
//
//   if (windowRatio < gameRatio) {
//     canvas.style.width = windowWidth + "px";
//     canvas.style.height = (windowWidth / gameRatio) + "px";
//   } else {
//     canvas.style.width = (windowHeight * gameRatio) + "px";
//     canvas.style.height = windowHeight + "px";
//   }
// }

function trackEvent(action, label, value) {
    var str = "Mobile Game local event tracking: action = " + action + ", label = " + label + ", value = " + value;
    console.log(str)
    gtag('event', action, {
        'event_catagory': 'Mobile Game',
        'event_label': label,
        'value': value
    });
  }
