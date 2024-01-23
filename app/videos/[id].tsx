import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

export default function VideoDetails() {
    const {id} = useLocalSearchParams()

    return (
            <View>
                <Text>Video Page = {id}</Text>
            </View>
    )
}