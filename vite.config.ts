import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/integrador/api/estoqueveiculos': {
        target: 'https://www.adset.com.br',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/integrador\/api\/estoqueveiculos/, '/integrador/api/estoqueveiculos'),
      },
    },
  },
});
