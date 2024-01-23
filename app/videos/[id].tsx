import React, { useState, useCallback } from "react"
import { Stack, useLocalSearchParams } from "expo-router"
import { Text, View, StyleSheet } from "react-native"
import YoutubePlayer from "react-native-youtube-iframe"
import demoVideos from "../../DemoData/demo-videos.json"
import { COLORS, FONT, SIZES } from "../../constants"

export default function VideoDetails() {
    const [playing, setPlaying] = useState(false)

    const { id } = useLocalSearchParams<{ id: string }>()
    const video = demoVideos.items.find((item) => item.id.videoId === id)

    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            setPlaying(false)
        }
    }, [])


    if (!video || !video.snippet) {
        return (
            <View>
                <Text>Error: Video not found</Text>
            </View>
        )
    }
    
    const headerTitle = video.snippet.title.substring(0, SIZES.xLarge)

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: headerTitle.length === SIZES.xLarge ? headerTitle + "..." : headerTitle,
                }}
            />
            <View>
                <YoutubePlayer
                    height={230}
                    play={playing}
                    videoId={id}
                    onChangeState={onStateChange}
                />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{video.snippet.title}</Text>
                <Text style={styles.description}>{video.snippet.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },
    detailsContainer: {
        paddingHorizontal: SIZES.large,
    },
    title: {
        fontSize: SIZES.large,
        fontWeight: "bold",
        marginBottom: SIZES.xSmall,
    },
    description: {
        fontSize: SIZES.medium,
        color: COLORS.gray,
    },
});