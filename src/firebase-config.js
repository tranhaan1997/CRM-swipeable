import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAW3t_MK-bIxtkuogWWxe5Irj-9mPIIP_E",
  authDomain: "act-ai-app.firebaseapp.com",
  projectId: "act-ai-app",
  storageBucket: "act-ai-app.firebasestorage.app",
  messagingSenderId: "28557304093",
  appId: "1:28557304093:web:832e676c96dce798e801f4",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function requestFCMToken() {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BA9eC9u07iyhOY_FOl_yTw8A4_GR1DbiIZSsQysluZ8e7rfQzCB5Gu6ol2xmVova2tyuGEQIOdHY5OUkdfOCcMo",
    });
    //  console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("Không lấy được FCM token:", error);
    return null;
  }
}

export function onMessageListener(callback) {
  onMessage(messaging, (payload) => callback(payload));
}

export default app;
