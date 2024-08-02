module.exports = {
  apps: [
    {
      name: 'beep',
      script: './build/src/index.js', // Replace with the path to your main file
      instances: 1, // Or a specific number of instances
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
      }
    }
  ]
};
