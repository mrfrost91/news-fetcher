/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_NEWSAPI_API_KEY: string;
  readonly VITE_NEWSAPI_BASE_URL: string;
  readonly VITE_GUARDIAN_API_KEY: string;
  readonly VITE_GUARDIAN_BASE_URL: string;
  readonly VITE_NY_TIMES_API_KEY: string;
  readonly VITE_NY_TIMES_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
