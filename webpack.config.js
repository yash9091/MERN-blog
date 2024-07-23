const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__mern-blog, 'dist'),
        build: {
            chunkSizeWarningLimit: 2000 // Set your desired limit in bytes
          }
    },
    // Add loaders, plugins, and other configuration as needed
};
