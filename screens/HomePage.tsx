import React, { useEffect, useState } from "react"
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { router } from "expo-router"
import axios from "axios"

import { YT_API_KEY } from '@env'
import { COLORS, icons, images, SIZES } from "../constants"

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
    const BASE_URL: string = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&videoEmbeddable=true&type=video&key=${YT_API_KEY}&q=React Native`

    useEffect(() => {
        setTimeout(() => {
            fetchData()
        }, 3000)
    }, [])

    const fetchData = async () => {
        try {
            const res = await require("../DemoData/demo-videos.json")
            // const res = await axios.get(BASE_URL)
            setVideos(res.data.items)
        } catch (err) {
            console.error("Error fetching data -> ", err)
            Alert.alert("Something went wrong...")
        } finally {
            setLoading(false)
        }
    }

    const renderVideoItem = ({ item, index }: { item: VideoItem; index: number }) => (
        <TouchableOpacity key={index} onPress={() => handleVideoPress(item.id.videoId)}>
            <View key={item.id.videoId} style={styles.videoItem}>
                <Image source={{ uri: item.snippet.thumbnails.medium.url }} style={styles.thumbnail} />
                <Text style={styles.title} numberOfLines={2}>{item.snippet.title}</Text>
            </View>
        </TouchableOpacity>
    );
    

    const handleVideoPress = (videoId: string) => {
        router.push({
            pathname: 'videos/[id]',
            params: { id: videoId },
        })
    }

    if (loading) {
        return <ActivityIndicator style={styles.loadingIndicator} size={"large"} />
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={videos}
                renderItem={renderVideoItem}
                keyExtractor={(item) => item.id.videoId}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoItem: {
        marginBottom: SIZES.large,
        alignItems: 'center',
    },
    thumbnail: {
        width: '100%',
        aspectRatio: 16 / 9,
        resizeMode: 'cover',
    },
    title: {
        marginTop: SIZES.xSmall,
        fontSize: SIZES.medium,
        fontWeight: 'bold',
    },
})