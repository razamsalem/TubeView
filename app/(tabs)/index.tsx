import React from "react"
import { SafeAreaView, ScrollView } from "react-native"

import { COLORS, icons, images, SIZES } from "../../constants"
import HomePage from "../../screens/HomePage"
import { Stack } from "expo-router"


export default function Home() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen options={{ headerTitleStyle: { color: COLORS.primary } }} />
            <HomePage />
        </SafeAreaView>
    )
}