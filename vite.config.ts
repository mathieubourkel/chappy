import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    include: ["**/*.css","**/*.tsx", ]
  })],
  // server: {
  //   https: {
  //     key: './certs/private-key.pem',
  //     cert: './certs/certificate.pem',
  //   },
  // },
}
)
