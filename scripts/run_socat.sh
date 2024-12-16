#!/bin/bash

# Configuration
REMOTE_HOST="192.168.1.10"
REMOTE_USER="vikas"
REMOTE_PORT="22"
OLLAMA_PORT="11434"
LOCAL_PORT="11435"

# Create logs directory if it doesn't exist
mkdir -p logs

# Get timestamp for log file
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="logs/socat_$TIMESTAMP.log"

# Cleanup function
cleanup() {
    echo "Cleaning up..."
    # Kill SSH tunnel and socat processes
    if [ -f ".tunnel.pid" ]; then
        kill $(cat .tunnel.pid) 2>/dev/null
        rm .tunnel.pid
    fi
    # Compress log file
    if [ -f "$LOG_FILE" ]; then
        gzip "$LOG_FILE"
        echo "Logs compressed to ${LOG_FILE}.gz"
    fi
    exit 0
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

# Check SSH connection
echo "Testing SSH connection..."
if ! ssh -q -o BatchMode=yes -o ConnectTimeout=5 ${REMOTE_USER}@${REMOTE_HOST} "exit"; then
    echo "SSH connection failed. Please ensure you can connect to ${REMOTE_USER}@${REMOTE_HOST}"
    exit 1
fi

# Start SSH tunnel
echo "Establishing SSH tunnel..."
ssh -f -N -L ${LOCAL_PORT}:localhost:${OLLAMA_PORT} ${REMOTE_USER}@${REMOTE_HOST} -p ${REMOTE_PORT}
echo $! > .tunnel.pid

echo "SSH tunnel established. Forwarding localhost:${LOCAL_PORT} to ${REMOTE_HOST}:${OLLAMA_PORT}"
echo "Logging to $LOG_FILE"
echo "Press Ctrl+C to stop and cleanup"

# Keep script running until interrupted
while true; do
    if ! kill -0 $(cat .tunnel.pid) 2>/dev/null; then
        echo "SSH tunnel died. Cleaning up..."
        cleanup
        break
    fi
    sleep 1
done
