import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: env.VITE_PUBLIC_BASE || "/",
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "firebase-core": ["firebase/app"],
            "firebase-auth": ["firebase/auth"],
            "firebase-db": ["firebase/firestore"],
            "firebase-storage": ["firebase/storage"],
            charts: ["recharts"],
            motion: ["framer-motion"],
            forms: ["react-hook-form", "sweetalert2"],
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});
