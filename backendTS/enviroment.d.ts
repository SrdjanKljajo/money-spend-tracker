declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      PORT?: number
      MONGO_URI: string
      MONGO_URI_ATLAS: string
    }
  }
}

export {}
