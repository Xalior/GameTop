import { World } from './primatives/World';

export class GameTop {
    canvas: HTMLCanvasElement;
    engine: BABYLON.Engine;
    scene;

    world: World;

    createScene() {
        // create a basic BJS Scene object
        var scene = new BABYLON.Scene(this.engine);

        // create a FreeCamera, and set its position to (x, y, z)
        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(20, 10,-20), scene);

        // target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // attach the camera to the canvas
        camera.attachControl(this.canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

        // create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
        var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 1, scene);

        // move the sphere upward 1/2 of its height
        sphere.position.y = 8;

        console.log('start floor');
        for(let x = 0; x < this.world.width; x++) {
            for(let y = 0; y < this.world.length; y++) {
                var tile = BABYLON.Mesh.CreateGround('ground1', 1, 1, 1, scene);
                tile.position.x = this.world.grid[x][y].x-(this.world.width/2);
                tile.position.y = this.world.grid[x][y].height*Math.random()/5;
                tile.position.z = this.world.grid[x][y].y-(this.world.length/2);
            }
        }
        // return the created scene
        return scene;
    }

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('renderCanvas');
        this.engine = new BABYLON.Engine(this.canvas, true);

        this.world = new World(100,100,4);
        // call the createScene function
        this.scene = this.createScene();

        // run the render loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
}