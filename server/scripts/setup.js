const { spawnSync } = require('child_process');
const fs = require('fs');

function run(cmd) {
  console.log(`> ${cmd}`);
  const r = spawnSync(cmd, { stdio: 'inherit', shell: true });
  if (r.status !== 0) {
    console.error(`Command failed: ${cmd}`);
    process.exit(r.status);
  }
}

try {
  console.log('1) Creating Vite React client (if not exists)...');
  if (!fs.existsSync('client')) {
    run('npx create-vite@latest client -- --template react');
  } else {
    console.log('client directory already exists — skipping create-vite');
  }

  console.log('2) Installing server dependencies...');
  run('npm install');

  console.log('3) Installing client dependencies...');
  run('cd client && npm install');

  if (!fs.existsSync('.env') && fs.existsSync('.env.example')) {
    try {
      fs.copyFileSync('.env.example', '.env');
      console.log('Copied .env.example -> .env');
    } catch (e) {
      console.warn('Could not copy .env.example:', e.message);
    }
  }

  console.log('\nSetup complete. To run:');
  console.log(' - Server (dev): npm run dev');
  console.log(' - Client (dev): cd client && npm run dev');
} catch (err) {
  console.error('Setup failed:', err);
  process.exit(1);
}
