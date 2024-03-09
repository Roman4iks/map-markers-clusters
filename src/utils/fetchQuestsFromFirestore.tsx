import { collection, getDocs } from "firebase/firestore";
import db from "../firebaseConfig";
export async function fetchQuestsFromFirestore() {
  try {
    const questsCollection = collection(db, "quests");
    const questsSnapshot = await getDocs(questsCollection);
    const questsData: Quest[] = [];
    questsSnapshot.forEach((doc) => {
      const questData = doc.data() as Quest;
      questsData.push(questData);
    });
    return questsData;
  } catch (error) {
    console.error("Error fetching quests:", error);
    throw error;
  }
}
