class DarkScene extends BaseScene {
  constructor() {
    super('DarkScene')
    this.tileDataKey = 'mapDark'
    this.tileDataSource = 'assets/MobileGameMapDark.json'
    // this.shader = 'Greyscale';
  }
  preload() {
    super.preload();
    this.load.image("screenFace", "assets/building/face.png");

  }

  create() {
    super.create();
    this.monitorTileset = this.map.addTilesetImage("monitor-face-4", "screenFace");
    this.facesLayer = this.map.createStaticLayer("Faces", this.monitorTileset, 0, 0).setDepth(3);
    this.scene.get('DarkScene').scene.setVisible(false);

    // this.pipeline = this.game.renderer.addPipeline(this.shader, new Greyscale(this.game));
    // this.pipeline.setFloat2('uResolution', game.config.width, game.config.height);
    //
    // this.input.on('pointerdown', function(){
    //   this.cameras.main.setRenderToTexture(this.shader);
    // }, this)

  }
}
