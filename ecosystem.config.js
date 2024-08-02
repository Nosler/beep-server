module.exports = {
  apps: [
    {
      name: 'Beep Server',
      script: './build/index.js', // Replace with the path to your main file
      instances: 1, // Or a specific number of instances
      exec_mode: 'cluster', // For load balancing between instances
      env: {
        NODE_ENV: 'production',
      }
    }
  ]
};
