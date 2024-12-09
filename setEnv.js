const fs = require('fs');
const path = require('path');

const envFilePath = path.resolve(__dirname, '.env');

// Проверяем, существует ли файл .env
if (fs.existsSync(envFilePath)) {
    let envFileContent = fs.readFileSync(envFilePath, 'utf8');

    // Заменяем VITE_TAURI_ENV в зависимости от текущего состояния
    if (process.argv[2] === 'tauri') {
        envFileContent = envFileContent.replace(/VITE_TAURI_ENV=.*$/, 'VITE_TAURI_ENV=true');
    } else {
        envFileContent = envFileContent.replace(/VITE_TAURI_ENV=.*$/, 'VITE_TAURI_ENV=false');
    }

    // Перезаписываем .env файл
    fs.writeFileSync(envFilePath, envFileContent, 'utf8');
    console.log('Updated .env file with VITE_TAURI_ENV value:', process.argv[2] === 'tauri' ? 'true' : 'false');
} else {
    console.error('.env file not found!');
}