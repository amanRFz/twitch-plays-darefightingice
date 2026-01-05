const express = require('express');
const cors = require('cors');
const http = require('http'); // Add this
const { Server } = require('socket.io'); // Add this
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } }); 
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let commandQueue = [];

let stats = {
    totalCommands: 0,
    lastUser: "None",
    lastCommand: "None"
};

// Allowed commands list
const ALLOWED_COMMANDS = [
    "sphp+ phy", "sphp- phy", "spen+ phy", "spen- phy",
    "autospawn phy", "stopspawn",
    "p1 hp -50", "p2 hp -50",
    "p1 energy 100", "p2 energy 100"
];

// 1. Receive Command (Simulating Viewer/Twitch)
app.post('/command', (req, res) => {
    const { command, user } = req.body; // Accept 'user' now
    if (!command || !ALLOWED_COMMANDS.includes(command)) {
        return res.status(400).json({ error: "Invalid command" });
    }
    commandQueue.push(command);
    
    // Update Stats
    stats.totalCommands++;
    stats.lastUser = user || "Anonymous";
    stats.lastCommand = command;

    console.log(`[Queued]: ${command} by ${stats.lastUser}`);

    // EMIT TO OVERLAY
    io.emit('new_event', {
        user: stats.lastUser,
        command: command,
        stats: stats
    });

    res.json({ status: "success", queued: command });
});


// 2. Send Command to Game (Polling)
app.get('/next-command', (req, res) => {
    if (commandQueue.length > 0) {
        const nextCmd = commandQueue.shift();
        console.log(`[Sent to Game]: ${nextCmd}`);
        res.json({ command: nextCmd });
    } else {
        res.json({ command: null });
    }
});

server.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
