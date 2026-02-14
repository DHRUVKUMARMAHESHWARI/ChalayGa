import SuggestionScreen from "../src/screens/SuggestionScreen";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Suggestion() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  return <SuggestionScreen navigation={router} route={{ params }} />;
}
