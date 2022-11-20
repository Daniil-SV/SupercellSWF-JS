const { existsSync, mkdir, createWriteStream } = require('fs');
const path = require('path');
const https = require('https');

// 46.168.1
const vesrionSHA = 'eb11f3bc5684d1deeefb99bd23b245ba07c37463'
const assetServer_BS = 'https://game-assets.brawlstarsgame.com'

function saveFileFromURL(path, url) {
    const file = createWriteStream(path);
    return new Promise((resolse, reject) => {
        https.get(url, function (response) {
            response.pipe(file);

            file.on("finish", () => {
                file.close();
                resolse(true);
            });
        });
    }) 
}

async function getAsset(filepath) {
    if(existsSync(filepath)){
        return;
    }
    await mkdir(path.parse(filepath).dir, { recursive: true }, function (err) {
        if (err) { throw err };
    });
    return saveFileFromURL(filepath, `${assetServer_BS}/${vesrionSHA}/${filepath}`);

}

module.exports = { getAsset, saveFileFromURL };