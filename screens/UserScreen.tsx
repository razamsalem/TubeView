import { StyleSheet, Text, View } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { SIZES } from "../constants"

export default function UserScreen() {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome size={24} name="search" />
                <Text style={styles.title}>Recent searches</Text>
            </View>
            
            <View style={styles.header}>
                <FontAwesome size={24} name="history" />
                <Text style={styles.title}>Your History</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: SIZES.medium,
    },
    title: {
        fontSize: SIZES.xLarge,
        fontWeight: 'bold',
    },
})