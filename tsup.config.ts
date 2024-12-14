import { defineConfig } from "tsup";

export default defineConfig(() => {
  return {
    splitting: false,
    entry: ["src/**/*.{ts,tsx}"],
    external: ["react", "react-dom", "react-router-dom"],
    format: ["esm", "cjs"],
    target: "esnext",
    outDir: "dist",
    minify: false,
    skipNodeModulesBundle: false,
    dts: {
      entry: ["src/index.ts", "src/components/index.ts"],
    },
    bundle: true,
    treeshake: false,
    sourcemap: false,
    clean: true, // clean up the dist folder before building
    platform: "browser",
  };
});
