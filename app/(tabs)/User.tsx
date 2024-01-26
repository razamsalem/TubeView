    import { SafeAreaView, StyleSheet } from "react-native";
    import UserScreen from "../../screens/UserScreen";
    import { useEffect } from "react";
import { COLORS } from "../../constants";

    export default function User() {
        return (
            <SafeAreaView style={styles.container}>
                <UserScreen />
            </SafeAreaView>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.lightWhite
        }
    })