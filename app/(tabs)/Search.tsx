import { View } from "react-native";
import SearchPage from "../../screens/SearchPage";
import { Stack } from "expo-router";
import { COLORS } from "../../constants";

export default function Search() {

    return (
        <View>
            <Stack.Screen options={{ headerShadowVisible: false, headerTitleStyle: {color: COLORS.primary} }} />

            <SearchPage />
        </View>
    )
}