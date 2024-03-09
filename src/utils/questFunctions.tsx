import { collection, addDoc, deleteDoc, doc, query, where, getDocs, updateDoc } from "firebase/firestore";
import db from "../firebaseConfig";

export async function addQuestToFirestore(quest: Quest) {
  try {
    const questsCollection = collection(db, "quests");
    await addDoc(questsCollection, quest);
  } catch (error) {
    console.error("Error adding quest:", error);
  }
}

export async function updateMarkerPositionInFirestore(id: number, newLocation: { lat: number, long: number }) {
  try {
    const documentId = await findDocumentIdByIdValue(id);
    if (documentId) {
      await updateDoc(doc(db, "quests", documentId), {
        location: newLocation
      });
    } else {
      console.log("Document ID not found.");
    }
  } catch (error) {
    console.error("Error updating marker position in Firestore:", error);
  }
}

export async function deleteQuestFromFirestore(id:number) {
  findDocumentIdByIdValue(id)
  .then((documentId) => {
    if (documentId) {
      deleteDoc(doc(db, "quests", documentId));
    } else {
      console.log("Document ID not found.");
    }
  })
  .catch((error) => {
    console.error("Error finding document ID:", error);
  });
}

async function findDocumentIdByIdValue(id:number) {
  const collectionRef = collection(db, "quests");
  const q = query(collectionRef, where("id", "==", id));
  const querySnapshot = await getDocs(q);

  let documentId = null;

  querySnapshot.forEach((doc) => {
    documentId = doc.id;
  });

  return documentId;
}
