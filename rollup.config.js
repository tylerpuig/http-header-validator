import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.cjs.js",
      format: "cjs",
    },
    plugins: [resolve(), commonjs(), typescript()],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.mjs",
      format: "es",
    },
    plugins: [resolve(), commonjs(), typescript()],
  },
  {
    input: "dist/index.d.ts",
    output: [
      { file: "dist/index.d.ts", format: "es" },
      { file: "dist/index.d.mts", format: "es" },
    ],
    plugins: [dts()],
  },
];
