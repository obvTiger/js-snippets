const WebSocket = require('ws');
const readline = require('readline');
const axios = require('axios');

const ws = new WebSocket('wss://api.wireway.ch/ai/chat?mode=raw');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let currentMessage = '';
let messageBuffer = [];

ws.on('open', () => {
    console.log('Connected to WebSocket server');
    readInput();
});

ws.on('message', (data) => {
    const parsed = JSON.parse(data.toString());
    
    if (parsed.chunk) {
        currentMessage += parsed.chunk;
        
        if (currentMessage.includes('![')) {
            const startIndex = currentMessage.indexOf('![');
            const endIndex = currentMessage.indexOf(']', startIndex);
            
            if (endIndex !== -1) {
                const imagePrompt = currentMessage.substring(startIndex + 2, endIndex);
                const imageUrl = `https://api.wireway.ch/ai/img?prompt=${encodeURIComponent(imagePrompt)}`;
                currentMessage = currentMessage.substring(0, startIndex) + currentMessage.substring(endIndex + 1);
                
                process.stdout.write('\r' + currentMessage);
                
                console.log('\nGenerating image...');
                
                axios.get(imageUrl)
                    .then(response => {
                        const finalUrl = response.request.res.responseUrl;
                        const { exec } = require('child_process');
                        const command = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
                        exec(`${command} ${finalUrl}`);
                        console.log('Opening image in browser...');
                    })
                    .catch(err => {
                        console.error('Error generating image:', err);
                    });
                return;
            }
        }
        
        process.stdout.write('\r' + currentMessage);
    }
    
    if (parsed.done) {
        console.log('\n');
        messageBuffer.push(currentMessage);
        if (messageBuffer.length > 2) {
            messageBuffer.shift();
        }
        currentMessage = '';
        readInput();
    }
    
    if (parsed.ping) {
        return;
    }
});

ws.on('error', (error) => {
    console.log('WebSocket error:', error);
});

ws.on('close', () => {
    console.log('Disconnected from WebSocket server');
    rl.close();
});

function readInput() {
    rl.question('> ', (input) => {
        if (input.toLowerCase() === 'exit') {
            ws.close();
            return;
        }
        
        ws.send(JSON.stringify({ prompt: input }));
    });
}
