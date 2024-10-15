import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Allows access from other devices on the network
    port: 5173, // Default Vite port
},
  // server: {
  //       proxy: {
  //           '/api': {
  //               target: 'http://127.0.0.1:3000', // Your API server
  //               changeOrigin: true,
  //               secure: false,
  //               // Rewrite path if needed, e.g., '/api' -> '/'
  //               // rewrite: (path) => path.replace(/^\/api/, ''),
  //           },
  //       },
  //   },
})
