#!/bin/bash

# Configuration
REMOTE_HOST="192.168.1.10"
REMOTE_USER="vikas"
REMOTE_PORT="22"
OLLAMA_PORT="11434"
LOCAL_PORT="11435"
LOG_DIR="/Users/vikasavnish/Library/Logs/OllamaTunnel"

# Create logs directory if it doesn't exist
mkdir -p "$LOG_DIR"

# Get timestamp for log file
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="$LOG_DIR/tunnel_$TIMESTAMP.log"

# Cleanup function
cleanup() {
    echo "Cleaning up..." >> "$LOG_FILE"
    # Kill SSH tunnel
    if [ -f "$LOG_DIR/.tunnel.pid" ]; then
        kill $(cat "$LOG_DIR/.tunnel.pid") 2>/dev/null
        rm "$LOG_DIR/.tunnel.pid"
    fi
    # Compress log file
    if [ -f "$LOG_FILE" ]; then
        gzip "$LOG_FILE"
        echo "Logs compressed to ${LOG_FILE}.gz" >> "$LOG_FILE"
    fi
    exit 0
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

# Rotate old logs (keep last 5 days)
find "$LOG_DIR" -name "tunnel_*.log.gz" -mtime +5 -delete

# Check SSH connection
echo "Testing SSH connection..." >> "$LOG_FILE"
if ! ssh -q -o BatchMode=yes -o ConnectTimeout=5 ${REMOTE_USER}@${REMOTE_HOST} "exit"; then
    echo "SSH connection failed. Please ensure you can connect to ${REMOTE_USER}@${REMOTE_HOST}" >> "$LOG_FILE"
    exit 1
fi

# Start SSH tunnel
echo "Establishing SSH tunnel..." >> "$LOG_FILE"
ssh -f -N -L ${LOCAL_PORT}:localhost:${OLLAMA_PORT} ${REMOTE_USER}@${REMOTE_HOST} -p ${REMOTE_PORT}
echo $! > "$LOG_DIR/.tunnel.pid"

echo "SSH tunnel established. Forwarding localhost:${LOCAL_PORT} to ${REMOTE_HOST}:${OLLAMA_PORT}" >> "$LOG_FILE"
echo "Logging to $LOG_FILE" >> "$LOG_FILE"

# Keep script running until interrupted
while true; do
    if ! kill -0 $(cat "$LOG_DIR/.tunnel.pid") 2>/dev/null; then
        echo "SSH tunnel died. Cleaning up..." >> "$LOG_FILE"
        cleanup
        break
    fi
    sleep 60  # Check every minute instead of every second
done
