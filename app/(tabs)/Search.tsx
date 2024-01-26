import { SafeAreaView } from "react-native";
import SearchScreen from "../../screens/SearchScreen";
import { Stack } from "expo-router";
import { COLORS } from "../../constants";

export default function Search() {

    return (
        <SafeAreaView>
            <Stack.Screen options={{ headerShadowVisible: false, headerTitleStyle: {color: COLORS.primary} }} />
            <SearchScreen />
        </SafeAreaView>
    )
}