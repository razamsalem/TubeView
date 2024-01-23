import React from "react"
import {SafeAreaView, ScrollView} from "react-native"

import { COLORS, icons, images, SIZES } from "../../constants"
import HomePage from "../../screens/HomePage"


export default function Home() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
                <HomePage />
        </SafeAreaView>
    )
}