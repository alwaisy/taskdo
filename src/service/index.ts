import { firebaseConfig } from '@/config'
import { initializeApp } from 'firebase/app'
/* import { createNotifier, defineNotificationComponent, NotificationGroup } from 'notiwind'
import type { NotificationSchema } from './@types' */

export const withFirebase = () => {
  const firebaseApp = initializeApp(firebaseConfig)
  return firebaseApp
}

/* import {
    createNotifier,
    NotificationGroup,
    defineNotificationComponent,
    // eslint-disable-next-line import/no-relative-packages
  } from "../.."; */
// import { NotificationSchema } from './types'

/* const withNotiwind = () => {
  const notify = createNotifier<NotificationSchema>()
  const Notification = defineNotificationComponent<NotificationSchema>()

  return {
    notify,
    Notification,
    NotificationGroup
  }
} */
