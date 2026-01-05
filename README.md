# Battlefield Intervention - Twitch Interactive Fighting Game using DarefightingICE

Twitch viewers control a fighting game through chat commands in real-time.

## Requirements

- Node.js (v14+)
- Python (v3.7+)
- Java (25+)
- Twitch account

## Installation

### Prerequisites

Before running, install:

1. **Node.js** 
2. **Python 3**
3. **Java 25+** 

### Step 1: Clone the Repository

```bash
git clone https://github.com/amanRfz/twitch-plays-darefightingice.git
cd twitch-plays-darefightingice
```


### Step 2: Install Backend Dependencies

```bash
cd dfi-backend
npm install
cd ..
```


### Step 3: Install Chat Bot Dependencies

```bash
cd twitch-chatbot
npm install
cd ..
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

Copy `data` folder from `twitch-plays-darefightingice/DareFightingICE` to `twitch-plays-darefightingice/DareFightingICE/DareFightingICE-7.0/`

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
Open the following link on your browser
```
http://localhost:3000
```


## Commands

### Item Spawning

| Command | Effect |
| :-- | :-- |
| `!heal` | Spawn HP recovery item (+80 HP) |
| `!damage` | Spawn damage item (-60 HP) |
| `!energy` | Spawn energy boost item (+75) |
| `!drain` | Spawn energy drain item (-50) |
| `!autospawn` | Auto-spawn random items every 3s |
| `!stopspawn` | Stop auto-spawning |

### Direct Player Actions

| Command | Effect |
| :-- | :-- |
| `!p1hit` | Damage Player 1 (-50 HP) |
| `!p2hit` | Damage Player 2 (-50 HP) |
| `!p1boost` | Boost Player 1 energy (+100) |
| `!p2boost` | Boost Player 2 energy (+100) |

*Cooldown: 10 seconds per user*
