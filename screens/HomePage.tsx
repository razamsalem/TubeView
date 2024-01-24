import React, { useEffect, useState } from "react"
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { router } from "expo-router"

import { VideoItem } from "../types/VideoItem"
import { YT_API_KEY } from '@env'
import { COLORS, icons, images, SIZES } from "../constants"
import SearchBar from "../components/SearchBar"


export default function HomePage() {
    const [videos, setVideos] = useState<VideoItem[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    
    useEffect(() => {
        fetchData()
    
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await require("../DemoData/demo-videos.json")
            // const res = await axios.get(BASE_URL)
            setVideos(res.items)
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
    )


    const handleVideoPress = (videoId: string) => {
        router.push({
            pathname: 'videos/[id]',
            params: { id: videoId },
        })
    }

    const onSearchResult = (results: VideoItem[]) => {
        setVideos(results)
        setLoading(false)
    }
    
    if (loading) {
        return <ActivityIndicator style={styles.loadingIndicator} size={"large"} />
    }

    return (
        <View style={styles.container}>
            <SearchBar onSearchResult={onSearchResult}/>
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