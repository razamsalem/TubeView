import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text } from 'react-native'
import axios from 'axios'

import { VideoItem } from "../types/VideoItem"
import { YT_API_KEY } from '@env'
import { COLORS } from '../constants'

interface SearchBarProps {
    onSearchResult: (results: VideoItem[]) => void;
}

export default function SearchBar({ onSearchResult }: SearchBarProps) {
    const [searchValue, setSearchValue] = useState<string>('')
    const BASE_URL: string = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&videoEmbeddable=true&type=video&key=${YT_API_KEY}&q=${searchValue}`

    const handleSearch = async () => {
        try {
            const res = await axios.get(BASE_URL)

            if (res.data.items) {
                onSearchResult(res.data.items)
            }

        } catch (err) {
            console.error('Error searching videos:', err)
            Alert.alert('Error searching, Please try again...')
        }
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16
    },
    input: {
        flex: 1,
        marginRight: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: 4,
    }
})