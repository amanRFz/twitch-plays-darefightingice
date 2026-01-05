import subprocess
import requests
import time

BACKEND_URL = "http://localhost:3000/next-command"
CHECK_INTERVAL = 0.2

def start_game_with_bridge():
    print("Starting DareFightingICE with Twitch Bridge...")
    print("Backend URL:", BACKEND_URL)
    print("-" * 50)
    
    game_process = subprocess.Popen(
        [
            "java",
            "-cp",
            "FightingICE.jar;./lib/*;./lib/lwjgl/*;./lib/lwjgl/natives/windows/amd64/*;./lib/grpc/*;",
            "Main",
            "--limithp", "400", "400",
        ],
        stdin=subprocess.PIPE,
        text=True,
        bufsize=1
    )
    
    print("Game started. Listening for Twitch commands...\n")
    
    try:
        while game_process.poll() is None:
            try:
                response = requests.get(BACKEND_URL, timeout=0.1)
                if response.status_code == 200:
                    data = response.json()
                    cmd = data.get("command")
                    
                    if cmd:
                        print(f"[TWITCH] Sending: {cmd}")
                        game_process.stdin.write(cmd + "\n")
                        game_process.stdin.flush()
                        
            except requests.exceptions.RequestException:
                pass
            except BrokenPipeError:
                print("Game closed.")
                break
            
            time.sleep(CHECK_INTERVAL)
            
    except KeyboardInterrupt:
        print("\nShutting down...")
    finally:
        if game_process.poll() is None:
            game_process.terminate()
        print("Bridge stopped.")

if __name__ == "__main__":
    start_game_with_bridge()
