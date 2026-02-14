import MeetupRoomScreen from "../src/screens/MeetupRoomScreen";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Room() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  return <MeetupRoomScreen navigation={router} route={{ params }} />;
}
