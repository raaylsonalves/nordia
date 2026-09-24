import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    // Vendored / non-source trees. Linting these produced ~470 findings that
    // are not ours to fix — bundled gsap and skill fixtures.
    ".agents/**",
    ".claude/**",
    "brand-video/**",
  ]),
]);

export default eslintConfig;
