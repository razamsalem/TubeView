import React, { useEffect, useState } from "react"
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native"
import axios from "axios"

import { YT_API_KEY } from "@env"
import { VideoItem } from "../types/VideoItem"
import { COLORS, SIZES } from "../constants"
import VideoList from "../components/VideoList"
import SubjectPills from "../components/SubjectPills"

const subjects = ["React Native", "Coding", "Sports", "Music", "Gaming"]

export default function HomeScreen() {
    const [videos, setVideos] = useState<VideoItem[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedSubject, setSelectedSubject] = useState<string>("React Native")

    const BASE_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&videoEmbeddable=true&type=video&key=${YT_API_KEY}&q=${selectedSubject}`

    useEffect(() => {
        fetchData()
    }, [selectedSubject])

    const fetchData = async () => {
        try {
            setLoading(true)

            if (selectedSubject === "React Native") {
                const res = await require("../DemoData/demo-videos.json")
                setVideos(res.items)
            } else {
                const res = await axios.get(BASE_URL)
                setVideos(res.data.items)
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
        backgroundColor: COLORS.lightWhite,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})