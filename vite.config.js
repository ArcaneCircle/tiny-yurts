import kontra from "rollup-plugin-kontra";
import { webxdcViteConfig } from "@webxdc/vite-plugins";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(
  webxdcViteConfig({
    plugins: [
      kontra({
        gameObject: {
          group: true,
          ttl: true, // TODO: Figure out exactly what this is needed for
          velocity: true,
        },
        vector: {
          angle: true,
          distance: true,
          normalize: true,
          scale: true,
          subtract: true,
        },
      }),
    ],
  }),
);
