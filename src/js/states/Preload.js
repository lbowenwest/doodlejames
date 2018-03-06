var assetsConfig = require('../configurations/assets');

function Preload() {
}

Preload.prototype = {
    preload: function () {
        for (var assetType in assetsConfig) {
            if (assetsConfig.hasOwnProperty(assetType)) {
                assetsConfig[assetType].forEach(function (args) {
                    var loader = this.load[assetType];
                    loader && loader.apply(this.load, args);
                }, this);
            }
        }
    },

    create: function () {
        this.state.start('menu');
    },

    update: function () {
    }
};

module.exports = Preload;
