// Import the dotenv module to load environment variables from .env file
require('dotenv').config();

const exec = require('child_process').exec;

function startShutdownTimer() {
    const shutdownTimeMinutes = process.env.SHUTDOWN_TIME || 10;

    // Validate input
    if (isNaN(shutdownTimeMinutes) || shutdownTimeMinutes <= 0) {
        console.error('Please set a valid positive number for SHUTDOWN_TIME in the .env file.');
        return;
    }

    // Convert minutes to seconds
    const shutdownTimeSeconds = shutdownTimeMinutes * 60;

    // Start the timer
    setTimeout(() => {
        // Shutdown code goes here
        console.log('System will shut down now.');
        // Note: The actual shutdown code will depend on the platform (e.g., Windows, Linux, Mac)
        shutdownSystem();
    }, shutdownTimeSeconds * 1000);
}

function shutdownSystem() {
    // Execute shutdown command based on the platform
    const command = process.platform === 'win32' ? 'shutdown /s /t 1' : 'shutdown now';

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error shutting down: ${error.message}`);
            return;
        }

        console.log(`Shutdown command executed successfully: ${stdout}`);
    });
}

startShutdownTimer();
