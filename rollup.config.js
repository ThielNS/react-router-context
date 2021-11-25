import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

// Array of extensions to be handled by babel
const EXTENSIONS = ['.ts', '.tsx'];

// Excluded dependencies
const EXTERNAL = Object.keys(pkg.peerDependencies);

export default {
  input: 'src/index.tsx',
  output: {
    file: pkg.main,
    format: 'cjs',
    sourcemap: true,
  },
  external: EXTERNAL,
  plugins: [
    babel({
      exclude: 'node_modules/**',
      extensions: EXTENSIONS,
      babelHelpers: 'bundled',
      include: EXTENSIONS.map((ext) => `src/**/*${ext}`),
    }),
    resolve(),
    commonjs(),
    typescript(),
  ],
};
