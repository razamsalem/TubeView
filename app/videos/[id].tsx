import React, { useState, useCallback } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import FontAwesome from '@expo/vector-icons/FontAwesome'
import moment from "moment";

import { COLORS, SIZES } from "../../constants";
import { VideoItem } from "../../types/VideoItem";

export default function VideoDetails() {
    const [playing, setPlaying] = useState(false)
    const { id, videoDetails } = useLocalSearchParams<{
        id: string
        videoDetails: string
    }>()

    const video: VideoItem = videoDetails ? JSON.parse(videoDetails) : null

    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            setPlaying(false)
        }
    }, [])

    if (!video || !video.snippet) {
        return (
            <View style={styles.errorContainer}>
                <Text>Video not found</Text>
            </View>
        )
    }

    const headerTitle = video.snippet.title.substring(0, SIZES.xLarge)
    const formattedTime = moment(video.snippet.publishTime).fromNow()

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: headerTitle.length === SIZES.xLarge ? headerTitle + "..." : headerTitle,
                    headerTitleStyle: { color: "black" },
                    headerTintColor: COLORS.primary
                }}
            />

            <YoutubePlayer
                height={230}
                play={playing}
                videoId={id}
                onChangeState={onStateChange}
            />

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{video.snippet.title}</Text>
                <View style={styles.infoContainer} >
                    <View style={styles.iconContainer}>
                        <FontAwesome name="user" size={16} color={COLORS.primary} />
                        <Text style={styles.channel}>{video.snippet.channelTitle}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <FontAwesome name="calendar" size={16} color={COLORS.primary} />
                        <Text style={styles.publishTime}>{formattedTime}</Text>
                    </View>
                </View>
                <Text style={styles.description}>{video.snippet.description}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },
    errorContainer: {
        flex: 1,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    detailsContainer: {
        paddingHorizontal: SIZES.large,
        paddingBottom: SIZES.large,
    },
    title: {
        fontSize: SIZES.large,
        fontWeight: "bold",
        marginBottom: SIZES.xSmall,
    },
    channel: {
        marginLeft: 6,
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SIZES.small,
    },
    publishTime: {
        marginLeft: 6,
        color: COLORS.gray,
    },
    description: {
        fontSize: SIZES.medium,
        color: COLORS.gray,
    },
})
