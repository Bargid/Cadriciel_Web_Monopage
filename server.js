const express = require('express');
const https = require('https');
const app = express();
const fs = require('fs');
const request = require('request');
const path = require('path');
const {PORT} = require('./config.js');
const {API_KEY} = require('./config.js');

// ========== FETCH L'INFO DE TOUS LES PERSONNAGES ==========

app.get('/', function (req, res) {
    const url = 'https://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json';

    request.get({
        url: url,
        json: true,
        headers: {
            'User-Agent': 'request',
        }
    }, (err, response, data) => {
        if (err) {
            console.log('Error:', err);
            res.status(500).send('Error retrieving champion data');
        } else if (response.statusCode !== 200) {
            console.log('Status:', response.statusCode);
            res.status(response.statusCode).send('Error retrieving champion data');
        } else {
            const champions = data.data;

            // Create a folder to save the champion images
            const imageFolder = path.join(__dirname, 'frontend', 'static', 'js', 'views', 'champion-images');
            fs.mkdirSync(imageFolder, { recursive: true });

            // Download and save each champion image
            Object.values(champions).forEach((champion) => {
                const imageUrl = `https://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${champion.image.full}`;
                const imagePath = path.join(imageFolder, champion.image.full);

                request(imageUrl)
                    .pipe(fs.createWriteStream(imagePath))
                    .on('close', () => {
                        console.log(`Downloaded: ${champion.image.full}`);
                    })
                    .on('error', (err) => {
                        console.log(`Error downloading ${champion.image.full}:`, err);
                    });
            });

            const newData = JSON.stringify(champions);
            const filePath = path.join(__dirname, 'frontend', 'static', 'js', 'views', 'champions.json');
            fs.writeFile(filePath, newData, (err) => {
                if (err) {
                    console.log('Error:', err);
                    res.status(500).send('Error saving champion data');
                } else {
                    console.log('Success!');
                    res.sendFile(path.resolve(__dirname,'frontend', 'index.html'))
                }
            });
        }
    });
});

// =========== ALLER CHERCHER L'INFORMATION DANS LE JSON ==========

app.get('/info-result=:id', function (req, res) {
    const info = req.params.id
    fs.readFile(__dirname + '/' + info + '.json', 'utf8', function (err, data) { // Chemin vers le fichier JSON
        res.send(JSON.parse(data));
    })
})

// ========== NÉCÉSSAIRE À L'UTILISATION DE SPA ==========

app.use("/static", express.static(path.resolve("frontend", "static"))) // Pour accéder au CSS

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname,'frontend', 'index.html')) // dossier frontend et file index.html
})

app.listen(PORT || 4001, ()=> { // si 8081 est utilise, utiliser 4001
    console.log('Server running on port :', PORT);
}) 