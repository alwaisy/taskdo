const firebaseConfig = {
  apiKey: import.meta.env.APP_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.APP_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.APP_FIREBASE_PROJECT_ID as string,
  appId: import.meta.env.APP_FIREBASE_APP_ID as string
}

export { firebaseConfig }
