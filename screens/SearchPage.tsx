import React, { useState } from "react"
import { Image, Text, View, StyleSheet } from "react-native"

import { VideoItem } from "../types/VideoItem"
import SearchBar from "../components/SearchBar"
import VideoList from "../components/VideoList"

export default function SearchPage() {
    const [userSearch, setUserSearch] = useState<VideoItem[]>([])

    const onSearchResult = (results: VideoItem[]) => {
        setUserSearch(results)
    }

    return (
        <View>
            <SearchBar onSearchResult={onSearchResult} />
            {userSearch.length > 0 ? (
                <VideoList videos={userSearch} />
            ) : (
                <View style={styles.imageContainer}>
                    <Image
                        source={require("../assets/search.png")}
                        style={styles.fullHeightImage}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: "center",
        marginTop: 50,
        height: "100%",
    },
    fullHeightImage: {
        width: 256,
        height: 256,
    },
})
