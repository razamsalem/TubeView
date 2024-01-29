import React, { useEffect, useState } from "react"
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native"

import { VideoItem } from "../types/VideoItem"
import { COLORS, SIZES } from "../constants"
import VideoList from "../components/VideoList"
import SubjectPills from "../components/SubjectPills"
import { cacheData, getCachedData } from "../services/cacheUtils"
import { fetchVideoData } from "../services/videoUtils"


export default function HomeScreen() {
    const [videos, setVideos] = useState<VideoItem[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedSubject, setSelectedSubject] = useState<string>("React Native")

    const subjects = ["React Native", "Coding", "Sports", "Music", "News", "Gaming", "History"]

    useEffect(() => {
        fetchData()
    }, [selectedSubject])

    const fetchData = async () => {
        try {
            setLoading(true)

            if (selectedSubject === "React Native") {
                const res = await require("../data/videos.json")
                setVideos(res.items)
            } else {
                const cacheKey = `cachedVideos_${selectedSubject}`
                const cachedData = await getCachedData(cacheKey)

                if (cachedData) {
                    setVideos(cachedData.items)
                    return
                }

                const res = await fetchVideoData(selectedSubject)
                setVideos(res.items)
                cacheData(cacheKey, res.items)
            }
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
            <View style={styles.subjectsContainer}>
                <SubjectPills
                    subjects={subjects}
                    selectedSubject={selectedSubject}
                    setSelectedSubject={setSelectedSubject}
                />
            </View>
            <VideoList videos={videos} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },
    subjectsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: SIZES.xSmall,
        backgroundColor: COLORS.cleanestWhite,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})