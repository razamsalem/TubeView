import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { COLORS, SIZES } from "../constants"
import { useEffect, useState } from "react"
import { deleteSearchHistory, getSearchHistory } from "../services/storageUtils"
import { SearchHistoryItem } from "../types/SearchHistoryItem"
import RecentSearch from "../components/RecentSearch"

export default function UserScreen() {
    const [recentSearches, setRecentSearches] = useState<SearchHistoryItem[]>([])
    const [refreshing, setRefreshing] = useState<boolean>(false)

    useEffect(() => {
        fetchRecentSearches()
    }, [])

    const handleRefresh = () => {
        setRefreshing(true)
        fetchRecentSearches()
        setRefreshing(false)
    }

    const handleDelete = () => {
        deleteSearchHistory()
        fetchRecentSearches()
    }

    const fetchRecentSearches = async () => {
        const searchHistory = await getSearchHistory()
        setRecentSearches(searchHistory)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome style={styles.HeaderIcon} size={24} name="search" />
                <Text style={styles.title}>Recent searches </Text>

                <View style={styles.actionBtns}>
                    <TouchableOpacity onPress={handleDelete}>
                        <FontAwesome style={styles.HeaderIcon} size={SIZES.medium} name="trash" />
                    </TouchableOpacity>

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
                    handleDelete ={handleDelete }
                />
            ) : (
                <View style={styles.searchContainer}>
                    <Image
                        source={require("../assets/search-history.png")}
                        style={styles.noRecentSearchesImage}
                    />
                    <Text style={styles.noRecentSearchesMsg}>
                        Your recent searches will appear here
                    </Text>
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
})