import React, { useState, useCallback, useRef } from "react"
import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"
import YoutubePlayer from "react-native-youtube-iframe"
import demoVideos from "../../DemoData/demo-videos.json"

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

    return (
        <View>
            <View>
                <YoutubePlayer
                    height={230}
                    play={playing}
                    videoId={id}
                    onChangeState={onStateChange}
                />
            </View>
            <View>
                <Text>{video.snippet.title}</Text>
                <Text>{video.snippet.description}</Text>
            </View>
        </View>
    )
}