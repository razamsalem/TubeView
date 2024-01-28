import React from "react"
import { SafeAreaView, StyleSheet } from "react-native"

import { COLORS } from "../../constants"
import HomeScreen from "../../screens/HomeScreen"
import { Stack } from "expo-router"


export default function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerTitleStyle: { color: COLORS.primary } }} />
            <HomeScreen />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite
    }
})