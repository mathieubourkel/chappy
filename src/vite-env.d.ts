/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACK_HOST: string
    readonly VITE_BACK_PORT: string
    readonly VITE_PROTOCOL: string
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}
