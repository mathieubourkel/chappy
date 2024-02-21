/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACK_HOST: string
    readonly VITE_BACK_PORT: string
    readonly VITE_PROTOCOL: string
    readonly VITE_WEB_SOCKET_PORT: string
    readonly VITE_WEB_SOCKET_HOST: string
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}
