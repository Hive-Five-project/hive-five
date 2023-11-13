export type AppConfigScheme = {
  readonly APP_CONTACT_EMAIL: string
  readonly APP_BASE_URL: string
  readonly API_HOST: string
}

export default {
  APP_BASE_URL: import.meta.env.VITE_APP_BASE_URL,
  APP_CONTACT_EMAIL: import.meta.env.VITE_APP_CONTACT_EMAIL,
  API_HOST: import.meta.env.VITE_API_HOST,
} satisfies AppConfigScheme;
