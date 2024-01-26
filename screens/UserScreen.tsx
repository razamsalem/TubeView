import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { COLORS, SIZES } from "../constants"
import { useEffect, useState } from "react"
import { getSearchHistory } from "../services/storageUtils"

interface SearchHistoryItem {
    value: string
    time: string
}

export default function UserScreen() {
    const [recentSearches, setRecentSearches] = useState<SearchHistoryItem[]>([])

    useEffect(() => {
        fetchRecentSearches()
    }, [])

    const fetchRecentSearches = async () => {
        const searchHistory = await getSearchHistory()
        setRecentSearches(searchHistory)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome size={24} name="search" />
                <Text style={styles.title}>Recent searches </Text>
                <TouchableOpacity>
                   <Text> Refresh </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={recentSearches}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({ item }) => (
                    <View style={styles.historyItem}>
                        <FontAwesome size={18} name="clock-o" style={{ marginRight: 8 }} />
                        <Text>{item.value}</Text>
                        <Text style={{ marginLeft: 'auto' }}>{item.time}</Text>
                    </View>
                )}
            />


            <View style={styles.header}>
                <FontAwesome size={24} name="history" />
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
    },
    historyItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: SIZES.medium,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
      },
})