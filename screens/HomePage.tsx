import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import axios from "axios"

import { COLORS, icons, images, SIZES } from "../constants"
import { router } from "expo-router"

interface VideoItem {
    id: {
        videoId: string
    }
    snippet: {
        thumbnails: {
            medium: {
                url: string
            }
        }
        title: string
    }
}

export default function HomePage() {
    const [videos, setVideos] = useState<VideoItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            fetchData()

        }, 3000)
    }, [])

    useEffect(() => {
        console.log('Videos fetched', videos)
    }, [videos])

    const fetchData = async () => {
        try {
            const res = await require("../DemoData/demo-videos.json")
            setVideos(res.items)
        } catch (err) {
            console.error("Error fetching data -> ", err)
        } finally {
            setLoading(false)
        }
    }

    const renderVideoItem = ({ item }: { item: VideoItem }) => (
        <TouchableOpacity onPress={() => handleVideoPress(item.id.videoId)}>
            <View key={item.id.videoId} style={{ marginBottom: 20, alignItems: "center" }}>
                <Image source={{ uri: item.snippet.thumbnails.medium.url }} style={{ width: 320, height: 180 }} />
                <Text numberOfLines={2}>{item.snippet.title}</Text>
            </View>
        </TouchableOpacity>
    )

    const handleVideoPress = (videoId: string) => {
        router.push({
            pathname: 'videos/[id]',
            params: { id: videoId },
        })
    }

    if (loading) {
        return <ActivityIndicator size={"large"} />
    }

    return (
            <FlatList
                data={videos}
                renderItem={renderVideoItem}
                keyExtractor={(item) => item.id.videoId}
            />
    )
}