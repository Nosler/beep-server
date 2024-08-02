import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import { del } from '@kineticcafe/rollup-plugin-delete'

export default {
  input: 'build/src/index.js',
  output: {
    file: 'build/index.mjs',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    resolve(),
    commonjs(),
    json(),
    terser(),
    del({ targets: 'build/src', hook: 'writeBundle' })
  ]
};
