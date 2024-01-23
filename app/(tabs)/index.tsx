import { SafeAreaView, Text, View } from "react-native"

import { COLORS, icons, images, SIZES } from "../../constants"

export default function index() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Text>Home Sweet Home</Text>
        </SafeAreaView>
    )
}