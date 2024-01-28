import { Image, StyleSheet, Text, View } from "react-native"
import { COLORS, SIZES } from "../constants"

interface NoContentAlertProps {
    type: string
}

export default function NoContentAlert({ type }: NoContentAlertProps) {

    return (
        <View style={styles.msgContainer}>
            {type === 'video' &&
                <View>
                    <Image
                        source={require("../assets/video.png")}
                        style={styles.AlertImg}
                    />
                    <Text style={styles.AlertMsg}>
                        Your video history will appear here
                    </Text>
                </View>
            }

            {type === 'search' &&
                <View>
                    <Image
                        source={require("../assets/search-head.png")}
                        style={styles.AlertImg}
                    />
                    <Text style={styles.AlertMsg}>
                        Your recent searches will appear here
                    </Text>
                </View>
            }

            {type === 'error' &&
                <View>
                    <Image
                        source={require("../assets/not-found.png")}
                        style={styles.AlertImg}
                    />
                    <Text style={styles.AlertMsg}>
                        Video not found
                    </Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    msgContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: SIZES.xSmall
    },
    AlertImg: {
        width: 200,
        height: 200,
        alignSelf: "center",
        marginBottom: 6
    },
    AlertMsg: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: SIZES.medium,
        color: COLORS.primary,
    },
})