import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text, Keyboard, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import axios from 'axios'

import { VideoItem } from "../types/VideoItem"
import { YT_API_KEY } from '@env'
import { COLORS, SIZES } from '../constants'
import { saveHistory } from '../services/storageUtils'
import { cacheData, getCachedData } from '../services/cacheUtils'
import { fetchVideoData } from '../services/videoUtils'

interface SearchBarProps {
    onSearchResult: (results: VideoItem[]) => void
}

export default function SearchBar({ onSearchResult }: SearchBarProps) {
    const [searchValue, setSearchValue] = useState<string>('')
    const [isTextInputFocused, setTextInputFocused] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSearch = async () => {
        try {
            if (!searchValue.trim()) {
                return
            }

            setIsLoading(true)
            await saveHistory('search', searchValue)

            const cacheKey = `cachedVideos_${searchValue}`
            const cachedData = await getCachedData(cacheKey)

            if (cachedData) {
                onSearchResult(cachedData.items)
                return
            }

            const res = await fetchVideoData(searchValue)
            onSearchResult(res.items)
            cacheData(cacheKey, res.items)
        } catch (err) {
            console.error("Error fetching data -> ", err)
            Alert.alert("Something went wrong when searching...")
        } finally {
            setIsLoading(false)
            Keyboard.dismiss()
        }
    }

    const handleCleanSearch = () => {
        setSearchValue('')
        onSearchResult([])
    }

    const handleFocus = () => {
        setTextInputFocused(true)
    }

    const handleBlur = () => {
        setTextInputFocused(false)
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for videos..."
                selectionColor={COLORS.primary}
                value={searchValue}
                onChangeText={(text) => setSearchValue(text)}
                onSubmitEditing={handleSearch}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />

            {isLoading ? (
                <ActivityIndicator size="small" color={COLORS.primary} style={styles.loadingIndicator} />
            ) : (
                isTextInputFocused ? (
                    <TouchableOpacity onPress={handleSearch}>
                        <FontAwesome name="search" style={styles.icon} />
                    </TouchableOpacity>
                ) : (
                    <View>
                        {searchValue &&
                            <TouchableOpacity onPress={handleCleanSearch}>
                                <FontAwesome name="remove" style={styles.icon} />
                            </TouchableOpacity>
                        }
                    </View>
                )
            )}
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
    },
    icon: {
        color: COLORS.primary,
        fontSize: SIZES.xLarge
    },
    loadingIndicator: {
        marginLeft: 8,
    }
})