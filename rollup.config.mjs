import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import { del } from '@kineticcafe/rollup-plugin-delete'

export default {
  input: 'build/src/index.js',
  output: {
    file: 'build/index.js',
    format: 'esm', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: false
  },
  plugins: [
    resolve(), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    json(),
    terser(), // minify
    del({ targets: 'build/src', hook: 'writeBundle' })
  ]
};
