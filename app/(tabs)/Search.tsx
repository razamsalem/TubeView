import { View } from "react-native";
import SearchPage from "../../screens/SearchPage";
import { Stack } from "expo-router";

export default function Search() {

    return (
        <View>
            <Stack.Screen options={{ headerShadowVisible: false }} />

            <SearchPage />
        </View>
    )
}