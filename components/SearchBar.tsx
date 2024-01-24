import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import { VideoItem } from "../types/VideoItem"
import { YT_API_KEY } from '@env'
import { COLORS, SIZES } from '../constants'

interface SearchBarProps {
    onSearchResult: (results: VideoItem[]) => void;
}

export default function SearchBar({ onSearchResult }: SearchBarProps) {
    const [searchValue, setSearchValue] = useState<string>('')

    const handleSearch = async () => {
        try {
            const cacheKey = `cachedVideos_${searchValue}`
            const cachedData = await getCachedData(cacheKey)

            if (cachedData) {
                onSearchResult(cachedData.items)
                return
            }

            const res = await fetchData()
            onSearchResult(res.items)

            cacheData(cacheKey, res.items)
        } catch (err) {

        }
    }

    const cacheData = async (cacheKey: string, data: VideoItem[]) => {
        const dataToCache = {
            items: data,
            timestamp: new Date().getTime()
        }
        AsyncStorage.setItem(cacheKey, JSON.stringify(dataToCache))
    }

    const getCachedData = async (cacheKey: string) => {
        const cachedData = await AsyncStorage.getItem(cacheKey)

        if (cachedData) {
            const parsedData = JSON.parse(cachedData)

            const currTime = new Date().getTime()
            const cacheTime = parsedData.timestamp
            const timeDiff = (currTime - cacheTime) / (1000 * 60 * 60)

            if (timeDiff < 10) {
                return parsedData
            } else {
                AsyncStorage.removeItem(cacheKey)
            }

            return null
        }
    }

    const fetchData = async () => {
        const BASE_URL: string = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&videoEmbeddable=true&type=video&key=${YT_API_KEY}&q=${searchValue}`
        const res = await axios.get(BASE_URL)
        return res.data
    }

    const handleCleanSearch = ( ) => {
        setSearchValue('')
        onSearchResult([])
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for videos..."
                value={searchValue}
                onChangeText={(text) => setSearchValue(text)}
                onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleSearch}>
                <Text>Search</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleCleanSearch}>
                <Text>X</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: SIZES.medium
    },
    input: {
        flex: 1,
        marginRight: 8,
        padding: 8,
        paddingVertical: SIZES.xSmall,
        paddingHorizontal: SIZES.small,

        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: 12,

        backgroundColor: COLORS.lightWhite
    }
})