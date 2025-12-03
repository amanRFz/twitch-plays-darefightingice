const tmi = require('tmi.js');
const axios = require('axios');

// ===== CONFIGURATION =====
const TWITCH_CHANNEL = 'f0cusfz';  // CHANGE THIS!
const BACKEND_URL = 'http://localhost:3000/command';
const COOLDOWN_SECONDS = 10;

// Command mapping: what viewers type → what game receives
const COMMANDS = {
    '!spawn': 'spawn',
    '!autospawn': 'autospawn',
    '!stopspawn': 'stopspawn',
    '!p1hit': 'p1 hp -100',
    '!p2hit': 'p2 hp -100',
    '!p1boost': 'p1 energy 100',
    '!p2boost': 'p2 energy 100'
};

// ===== COOLDOWN TRACKING =====
const cooldowns = new Map();

function isOnCooldown(userId) {
    if (!cooldowns.has(userId)) return false;
    
    const lastUse = cooldowns.get(userId);
    const now = Date.now();
    return (now - lastUse) < (COOLDOWN_SECONDS * 1000);
}

function setCooldown(userId) {
    cooldowns.set(userId, Date.now());
}

// ===== BOT SETUP =====
const client = new tmi.Client({
    channels: [TWITCH_CHANNEL]
});

client.connect().then(() => {
    console.log('╔════════════════════════════════════════╗');
    console.log('║   TWITCH CHAT BOT CONNECTED!          ║');
    console.log('╚════════════════════════════════════════╝');
    console.log(`Channel: #${TWITCH_CHANNEL}`);
    console.log(`Cooldown: ${COOLDOWN_SECONDS}s per user`);
    console.log('\nAvailable Commands:');
    Object.keys(COMMANDS).forEach(cmd => {
        console.log(`  ${cmd} → ${COMMANDS[cmd]}`);
    });
    console.log('\nWaiting for chat messages...\n');
}).catch(err => {
    console.error('Failed to connect:', err);
});

// ===== MESSAGE HANDLER =====
client.on('message', (channel, tags, message, self) => {
    if (self) return; // Ignore bot's own messages

    const username = tags['display-name'] || tags['username'];
    const userId = tags['user-id'];
    const command = message.trim().toLowerCase();

    // Check if it's a valid command
    if (COMMANDS[command]) {
        
        // Check cooldown
        if (isOnCooldown(userId)) {
            console.log(`[COOLDOWN] ${username} tried ${command} (blocked)`);
            return;
        }

        const gameCommand = COMMANDS[command];
        
        console.log(`[${username}] ${command} → Sending: "${gameCommand}"`);
        
        // Send to backend
        axios.post(BACKEND_URL, {
            command: gameCommand
        })
        .then(() => {
            console.log(`   Queued successfully`);
            setCooldown(userId);
        })
        .catch(err => {
            console.error(` Failed:`, err.message);
        });
    }
});

// Handle errors gracefully
client.on('error', (err) => {
    console.error('Chat bot error:', err);
});
