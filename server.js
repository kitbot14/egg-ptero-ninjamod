const express = require('express');
const path = require('path');
const os = require('os');

const app = express();

// Récupère le port à partir de la variable d'environnement, sinon utilise le port 3000
const port = process.env.PORT;

// Fonction pour récupérer l'IP du VPS
function getIP() {
    const networkInterfaces = os.networkInterfaces();
    for (let iface in networkInterfaces) {
        for (let details of networkInterfaces[iface]) {
            // Si l'interface est non interne et IPv4
            if (details.family === 'IPv4' && !details.internal) {
                return details.address;
            }
        }
    }
    return 'localhost'; // Valeur par défaut si aucune IP non interne n'est trouvée
}

// Récupère l'IP automatiquement
const ipAddress = getIP();

// Affiche l'IP et le port sur lequel le serveur écoute
console.log(`Le serveur sera accessible via : http://${ipAddress}:${port}`);

// Sert les fichiers statiques depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarre le serveur et écoute sur l'adresse IP et le port spécifiés
app.listen(port, ipAddress, () => {
    console.log(`Le serveur est en cours d'exécution sur http://${ipAddress}:${port}`);
});
