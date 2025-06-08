const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve frontend static files
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const MAX_FREE_REQUESTS = 5;
let userLimits = {};

const licenses = JSON.parse(fs.readFileSync(path.join(__dirname, '../licenses.json')));

function isPremium(key) {
  return licenses.includes(key);
}

app.post('/api/send', (req, res) => {
  const { videoUrl, service, licenseKey } = req.body;
  const ip = req.ip;

  if (!isPremium(licenseKey)) {
    userLimits[ip] = (userLimits[ip] || 0) + 1;
    if (userLimits[ip] > MAX_FREE_REQUESTS) {
      return res.json({
        success: false,
        message: '⚠️ You are using the FREE version with limited accumulations.\n💳 Buy license at https://bit.ly/bottok-premium'
      });
    }
  }

  const command = `python3 ${path.join(__dirname, '../bot/main.py')} "${videoUrl}" "${service}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.json({ success: false, message: '❌ Bot error: ' + stderr });
    }
    return res.json({ success: true, message: stdout });
  });
});

app.listen(3000, () => console.log('✅ Server running at http://localhost:3000'));
