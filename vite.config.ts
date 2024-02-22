import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: +process.env.FRONT_PORT
  }
  //   https: {
  //     key: './certs/private-key.pem',
  //     cert: './certs/certificate.pem',
  //   },
}
)
