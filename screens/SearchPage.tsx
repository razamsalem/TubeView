import { useState } from "react"
import { View } from "react-native"

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
            <VideoList videos={userSearch} />
        </View>
    )
}