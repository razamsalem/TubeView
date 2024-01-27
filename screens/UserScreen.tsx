import React, { useEffect, useState } from "react"
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome'

import RecentSearch from "../components/RecentSearch"
import { SearchHistoryItem } from "../types/SearchHistoryItem"
import { deleteSearchHistory, deleteHistoryItem, getHistory } from "../services/storageUtils"
import { COLORS, SIZES } from "../constants"
import { WatchedVideoItem } from "../types/WatchedVideoItem"
import { SwipeListView } from "react-native-swipe-list-view"
import RecentWatched from "../components/RecentWatched"

export default function UserScreen() {
    const [recentSearches, setRecentSearches] = useState<SearchHistoryItem[]>([])
    const [recentWatched, setRecentWatched] = useState<WatchedVideoItem[]>([])
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchUserHistory()
        console.log(JSON.stringify(recentWatched));
        
    }, [])

    const handleRefresh = () => {
        setRefreshing(true)
        setLoading(true)
        fetchUserHistory()
        setRefreshing(false)
    }

    const handleDeleteAll = async () => {
        await deleteSearchHistory()
        fetchUserHistory()
    }

    const handleDeleteEntity = async (type: string, value: string) => {
        await deleteHistoryItem(type, value)
        handleRefresh()
    }

    const fetchUserHistory = async () => {
        try {

            const searchHistory = await getHistory('search')
            setRecentSearches(searchHistory)

            const watchedHistory = await getHistory('video')
            setRecentWatched(watchedHistory)
        } catch (err) {
            console.error(`Something went wrong when fetching history -> ${err}`)
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

            {recentWatched.length > 0 ? (
                <View>
                   <RecentWatched 
                    recentVideos={recentWatched}
                    refreshing={refreshing}
                    handleRefresh={handleRefresh}
                    handleDelete={handleDeleteEntity}
                   />
                </View>
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

        </View >
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