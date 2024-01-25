import React, { useState, useCallback } from "react"
import { Stack, useLocalSearchParams } from "expo-router"
import { Text, View, StyleSheet } from "react-native"
import YoutubePlayer from "react-native-youtube-iframe"

import { COLORS, SIZES } from "../../constants"
import { VideoItem } from "../../types/VideoItem"

export default function VideoDetails() {
    const [playing, setPlaying] = useState(false)
    const { id, videoDetails } = useLocalSearchParams<{ id: string; videoDetails: string }>()

    const video: VideoItem = videoDetails ? JSON.parse(videoDetails) : null

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
                    headerTitleStyle: {color: "black"},
                    headerTintColor: COLORS.primary
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
})