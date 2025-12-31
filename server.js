const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 3005;

// Store the current tournament state
let currentState = null;

// Serve static files
app.use(express.static(__dirname));

// WebSocket connection handling
wss.on('connection', (ws, req) => {
    const clientIp = req.socket.remoteAddress;
    console.log(`✅ New client connected from ${clientIp}`);
    console.log(`   Total clients: ${wss.clients.size}`);

    // Send current state to newly connected client
    if (currentState) {
        console.log('📤 Sending current state to new client');
        ws.send(JSON.stringify({
            type: 'state',
            data: currentState
        }));
    }

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === 'state-update') {
                console.log('📥 Received state update from client');
                // Update the server's state
                currentState = data.data;

                // Broadcast to all connected clients except sender
                let broadcastCount = 0;
                wss.clients.forEach((client) => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'state',
                            data: currentState
                        }));
                        broadcastCount++;
                    }
                });
                console.log(`📡 Broadcasted to ${broadcastCount} clients`);
            }
        } catch (e) {
            console.error('❌ Error parsing message:', e);
        }
    });

    ws.on('close', () => {
        console.log(`❌ Client disconnected from ${clientIp}`);
        console.log(`   Remaining clients: ${wss.clients.size}`);
    });

    ws.on('error', (error) => {
        console.error('❌ WebSocket error:', error.message);
    });
});

server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════╗
║   PHYSICAL: TECH Tournament Server Running!       ║
╚════════════════════════════════════════════════════╝

🌐 Local Access:
   http://localhost:${PORT}
   http://172.20.8.206:${PORT}

📱 Scoreboard:
   http://localhost:${PORT}/scoreboard.html
   http://172.20.8.206:${PORT}/scoreboard.html

🎮 Admin Control:
   http://localhost:${PORT}/scoreboard.html

🔗 To access from other computers:
   1. Run Cloudflare tunnel:
      C:\\cloudflared\\cloudflared.exe tunnel --url http://localhost:${PORT}

   2. Use the generated URL on any device

💡 WebSocket server ready for real-time sync!
    `);
});
