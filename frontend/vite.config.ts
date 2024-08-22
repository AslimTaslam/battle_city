import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  console.log(mode);
  return defineConfig({
    plugins: [
      react(),
      tsconfigPaths(),
      svgr({
        include: '**/*.svg',
      }),
    ],
  });
};
