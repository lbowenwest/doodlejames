<a href="http://phaser.io" target="_blank"><img src="http://phaser.io/images/img.png" style="width:150px;" alt="Phaser Logo"></a>
    
## Features
    
* Fast development. 
* Module loading. Thanks Browserify for existing.
* Livereload. Watch code changes instantly.
* Production build.     
    
## Quick start

Install dependencies
    
```bash
$ npm install
```

Start default task which starts the game
     
```bash
$ npm run gulp
```

## Documentation
   
    |-- src
        |-- assets
            |-- fonts
            |-- images
            |-- sounds
        |-- js
            |-- configurations
                |-- assets.js
                |-- game.js
            |-- states
                |-- Boot.js
                |-- Menu.js
                |-- Play.js
                |-- Preload.js
            |-- main.js
        |-- index.html
    |-- .gitignore
    |-- Gulpfile.js
    |-- LICENSE
    |-- package.json
    |-- README.md
    
The above project structure has a source folder where is included all the files of the game. Assets, scripts, whatever you need.    
At same level it has .gitignore file, the runner tasks file, Gulpfile, license file, dependencies file and finally the readme file.    

In the assets folder inside of src directory we should put the assets files according with their type, fonts, images or sounds. 
At same level of assets folder there is a scripts folder named js. Inside are a configurations files folder, Phaser states folder and the game entry main javascript file.

The assets configuration file must have the assets definitions to load them in the Preload Phaser state file.
The game configuration file is a file where we should define game parameters like canvas id, game witdh, game height, default language and so on.
 
The main entry game file named main.js has the Phaser Game instance, the loading of all game states and being the entry point, it has the start of Phaser Boot state which launchs the game.
    
```js
    var game = new Phaser.Game(gameConfig.width, gameConfig.height, Phaser.AUTO, '');

    game.state.add('boot', require('./states/Boot'));
    game.state.add('menu', require('./states/Menu'));
    game.state.add('play', require('./states/Play'));
    game.state.add('preload', require('./states/Preload'));

    game.state.start('boot');
```


Gulpfile has a default task used to develop the games and 'dist' task to create a build with proposal production code. The production task has the particularity of uglify the code.

To run default task
```bash
$ npm run gulp
```

To run dist task
```bash
$ npm run gulp dist
```
    
If you do not know about Browserify does, do not worry, it is simple to understand. Browserify allow us to split our code in all the files/module that we need and call them inside this files using the node-style require(). 
According with npm browserify definition, he will recursively analyze all the require() calls in your app in order to build a bundle you can serve up to the browser in a single script tag. 
In this case the single script tag will be main.js which is built in the browserify gulp task.
    
## License

[MIT](LICENSE)