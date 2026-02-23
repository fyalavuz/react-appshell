import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/motion-framer.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "framer-motion"],
  treeshake: true,
  minify: true,
});
