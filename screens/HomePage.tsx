import React, { useEffect, useState } from "react"
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { router } from "expo-router"

import { VideoItem } from "../types/VideoItem"
import { YT_API_KEY } from '@env'
import { COLORS, icons, images, SIZES } from "../constants"
import SearchBar from "../components/SearchBar"
import VideoList from "../components/VideoList"

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

    if (loading) {
        return <ActivityIndicator style={styles.loadingIndicator} size={"large"} />
    }

    return (
        <View style={styles.container}>
            <VideoList videos={videos} />
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
})