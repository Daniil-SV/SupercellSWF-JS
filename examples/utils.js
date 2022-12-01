const { existsSync, mkdir, createWriteStream, mkdirSync } = require('fs');
const path = require('path');
const https = require('https');
const deasync = require('deasync');

// 46.168.1
const vesrionSHA = 'eb11f3bc5684d1deeefb99bd23b245ba07c37463';
const assetServer_BS = 'https://game-assets.brawlstarsgame.com';

function saveFileFromURL(path, url) {
    isLoaded = false;
    const file = createWriteStream(path);
    https.get(url, function (response) {
        response.pipe(file);

        file.on('finish', () => {
            file.close();
            isLoaded = true;
        });
    });

    while (!isLoaded) {
        deasync.runLoopOnce();
    }
}

function getAsset(filepath) {
    if (!existsSync(filepath)) {
        mkdirSync(path.parse(filepath).dir, { recursive: true });
        saveFileFromURL(filepath, `${assetServer_BS}/${vesrionSHA}/${filepath}`);
    }
}

module.exports = { getAsset, saveFileFromURL };