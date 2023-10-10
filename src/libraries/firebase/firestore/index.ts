import admin, { FirebaseError } from "firebase-admin";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY,
        projectId: process.env.PROJECT_ID
      })
    });
  } catch (error) {
    console.error("Firebase admin initialization error", (error as FirebaseError).stack);
  }
}
export default admin.firestore();

export const storage = admin.storage();
