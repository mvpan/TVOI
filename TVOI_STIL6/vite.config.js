// vite.config.ts
import { build } from "vite";
import Inspect from "vite-plugin-inspect";
import { resolve } from "path";

export default {
  plugins: [
    Inspect({
      build: true,
      outputDir: ".vite-inspect",
    }),
  ],
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: resolve(__dirname, "index.html"), //js файл без type module
  //       contact: resolve(__dirname, "contact/contacts.html"), //Основная точка входа
  //     },
  //   },
  // },
};
