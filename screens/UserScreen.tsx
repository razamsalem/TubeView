import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { COLORS, SIZES } from "../constants"
import { useEffect, useState } from "react"
import { deleteSearchHistory, getSearchHistory } from "../services/storageUtils"

interface SearchHistoryItem {
    value: string
    time: string
}

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
                <FontAwesome style={styles.fontIcon} size={24} name="search" />
                <Text style={styles.title}>Recent searches </Text>

                <View style={styles.actionBtns}>
                    <TouchableOpacity onPress={handleDelete}>
                        <FontAwesome style={styles.fontIcon} size={SIZES.medium} name="trash" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleRefresh}>
                        <FontAwesome style={styles.fontIcon} size={SIZES.medium} name="refresh" />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={recentSearches}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({ item }) => (
                    <View style={styles.historyItem}>
                        <FontAwesome size={18} name="clock-o" style={styles.clockIcon} />
                        <Text style={styles.data}>{item.value}</Text>
                        <Text style={styles.timeData}>{item.time}</Text>
                    </View>
                )}
                
                refreshing={refreshing}
                onRefresh={handleRefresh}
            />


            <View style={styles.header}>
                <FontAwesome style={styles.fontIcon} size={24} name="history" />
                <Text style={styles.title}>Your History</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
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
    historyItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: SIZES.medium,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
    },
    actionBtns: {
        flexDirection: "row",
        gap: SIZES.small,
        marginLeft: 'auto'
    },
    data: {
        color: COLORS.gray
    },
    timeData: {
        color: COLORS.gray,
        marginLeft: 'auto'
    },
    fontIcon: {
        color: COLORS.primary
    },
    clockIcon: {
        marginRight: 8,
        color: COLORS.gray
    }
})