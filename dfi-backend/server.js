const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let commandQueue = [];

// Allowed commands list
const ALLOWED_COMMANDS = [
  "p1 hp -100", "p2 hp -100",
  "p1 energy 100", "p2 energy 100",
  "spawn", "autospawn", "stopspawn"
];

// 1. Receive Command (Simulating Viewer/Twitch)
app.post('/command', (req, res) => {
    const { command } = req.body;
    if (!command || !ALLOWED_COMMANDS.includes(command)) {
        return res.status(400).json({ error: "Invalid command" });
    }
    commandQueue.push(command);
    console.log(`[Queued]: ${command}`);
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

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});