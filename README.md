# Battlefield Intervention - Twitch Interactive Fighting Game using DarefightingICE

Twitch viewers control a fighting game through chat commands in real-time.

## Requirements

- Node.js (v14+)
- Python (v3.7+)
- Java (v8+)
- Twitch account

## Installation

### Prerequisites

Before running, install:

1. **Node.js** 
2. **Python 3**
3. **Java** 

### Step 1: Clone the Repository

```bash
git clone https://github.com/amanRfz/twitch-plays-darefightingice.git
cd twitch-plays-darefightingice
```


### Step 2: Install Backend Dependencies

```bash
cd dfi-backend
npm install
```


### Step 3: Install Chat Bot Dependencies

```bash
cd twitch-chatbot
npm install
```


### Step 4: Install Python Dependencies

```bash
pip install requests
```


### Step 5: Configure the Chat Bot

Open `twitch-chatbot/chatbot.js` and change this line:

```javascript
const TWITCH_CHANNEL = 'your_twitch_username';  // CHANGE THIS!
```
### Step 6: Add data folder to dir

Copy `data` folder from `twitch-plays-darefightingice/DareFightingICE` to `twitch-plays-darefightingice/DareFightingICE/DareFightingICE-7.0`

### Step 7: Run Everything (3 Terminals)

**Terminal 1 - Backend:**

```bash
cd dfi-backend
node server.js
```

**Terminal 2 - Chat Bot:**

```bash
cd twitch-chatbot
node chatbot.js
```

**Terminal 3 - Game Bridge:**

```bash
cd DareFightingICE/DareFightingICE-7.0
python game_bridge.py
```

**Browser - Overlay:**

```
http://localhost:3000
```


## Commands

| Command | Effect |
| :-- | :-- |
| `!spawn` | Spawn bouncing heal item (+10 HP) |
| `!autospawn` | Auto-spawn every 5s |
| `!stopspawn` | Stop auto-spawn |
| `!p1hit` | Damage Player 1 (-100 HP) |
| `!p2hit` | Damage Player 2 (-100 HP) |
| `!p1boost` | Energy boost P1 (+100) |
| `!p2boost` | Energy boost P2 (+100) |

*Cooldown: 10 seconds per user*
