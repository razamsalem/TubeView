import { Image, StyleSheet, Text, View } from "react-native"
import { COLORS, SIZES } from "../constants"

interface NoHistoryMsgProps {
    type: string
}

export default function NoHistoryMsg({ type }: NoHistoryMsgProps) {

    return (
        <View style={styles.msgContainer}>
            {type === 'video' &&
                <View>
                    <Image
                        source={require("../assets/video.png")}
                        style={styles.noRecentHistoryImg}
                    />
                    <Text style={styles.noRecentHistoryMsg}>
                        Your video history will appear here
                    </Text>
                </View>
            }

            {type === 'search' &&
                <View>
                    <Image
                        source={require("../assets/search-head.png")}
                        style={styles.noRecentHistoryImg}
                    />
                    <Text style={styles.noRecentHistoryMsg}>
                        Your recent searches will appear here
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
    noRecentHistoryImg: {
        width: 200,
        height: 200,
        alignSelf: "center",
        marginBottom: 6
    },
    noRecentHistoryMsg: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: SIZES.medium,
        color: COLORS.primary,
    },

})