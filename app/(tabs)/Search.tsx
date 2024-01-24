import { View } from "react-native";
import SearchBar from "../../components/SearchBar";
import { VideoItem } from "../../types/VideoItem";
import { useState } from "react";
import VideoList from "../../components/VideoList";
import SearchPage from "../../screens/SearchPage";

export default function Search() {

    return (
        <View>
            <SearchPage />
        </View>
    )
}