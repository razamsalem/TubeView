import React, { useState } from "react"
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useFocusEffect } from '@react-navigation/native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import RecentSearch from "../components/RecentSearch"
import { SearchHistoryItem } from "../types/SearchHistoryItem"
import { deleteSearchHistory, deleteSearchHistoryItem, getSearchHistory } from "../services/storageUtils"
import { COLORS, SIZES } from "../constants"

export default function UserScreen() {
    const [recentSearches, setRecentSearches] = useState<SearchHistoryItem[]>([])
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    useFocusEffect(() => {
        fetchRecentSearches()
    })

    const handleRefresh = () => {
        setRefreshing(true)
        setLoading(true)
        fetchRecentSearches()
        setRefreshing(false)
    }

    const handleDeleteAll = async () => {
        await deleteSearchHistory()
        fetchRecentSearches()
    }

    const handleDeleteEntity = async (searchValue: string) => {
        await deleteSearchHistoryItem(searchValue)
        handleRefresh()
    }

    const fetchRecentSearches = async () => {
        try {
            const searchHistory = await getSearchHistory()
            setRecentSearches(searchHistory)
        } catch (err) {
            console.error(`Something went wrong when fetching recent searches -> ${err}`)
            Alert.alert('Something went wrong...')
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome style={styles.HeaderIcon} size={24} name="search" />
                <Text style={styles.title}>Recent searches </Text>
                <View style={styles.actionBtns}>

                    {recentSearches.length > 0 &&
                        <TouchableOpacity onPress={handleDeleteAll}>
                            <FontAwesome style={styles.HeaderIcon} size={SIZES.medium} name="trash" />
                        </TouchableOpacity>
                    }

                    <TouchableOpacity onPress={handleRefresh}>
                        <FontAwesome style={styles.HeaderIcon} size={SIZES.medium} name="refresh" />
                    </TouchableOpacity>
                </View>
            </View>

            {recentSearches.length > 0 ? (
                <RecentSearch
                    recentSearches={recentSearches}
                    refreshing={refreshing}
                    handleRefresh={handleRefresh}
                    handleDelete={handleDeleteEntity}
                />
            ) : (

                <View style={styles.searchContainer}>
                    {loading ? (
                        <ActivityIndicator style={styles.loadingIndicator} size={"large"} />
                    ) :
                        <View>
                            <Image
                                source={require("../assets/search-history.png")}
                                style={styles.noRecentSearchesImage}
                            />
                            <Text style={styles.noRecentSearchesMsg}>
                                Your recent searches will appear here
                            </Text>
                        </View>
                    }
                </View>
            )}

            <View style={styles.header}>
                <FontAwesome style={styles.HeaderIcon} size={24} name="history" />
                <Text style={styles.title}>Your History</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
        minHeight: 350
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: SIZES.medium,
    },
    title: {
        fontSize: SIZES.xLarge,
        fontWeight: 'bold',
        color: COLORS.primary
    },
    actionBtns: {
        flexDirection: "row",
        gap: SIZES.small,
        marginLeft: 'auto'
    },
    searchContainer: {
        minHeight: 300
    },
    HeaderIcon: {
        color: COLORS.primary
    },
    noRecentSearchesMsg: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: SIZES.medium,
        color: COLORS.primary,
    },
    noRecentSearchesImage: {
        width: 256,
        height: 256,
        alignSelf: "center",
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})