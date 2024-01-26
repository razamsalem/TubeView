import { FlatList, StyleSheet, Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { SearchHistoryItem } from "../types/SearchHistoryItem";
import { COLORS, SIZES } from "../constants";

interface RecentSearchProps {
    recentSearches: SearchHistoryItem[]
    refreshing: boolean
    handleRefresh: () => void
}

export default function RecentSearch({ recentSearches, refreshing, handleRefresh }: RecentSearchProps) {

    return (
        <View style={styles.searchList}>
            <FlatList
                data={recentSearches}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({ item }) => (
                    <View style={styles.historyItem}>
                        <FontAwesome size={18} name="clock-o" style={styles.clockIcon} />
                        <Text style={styles.valueData}>
                            {item.value.length > 23 ? `${item.value.substring(0, 23)}...` : item.value}
                        </Text>
                        <Text style={styles.timeData}>{item.time}</Text>
                    </View>
                )}
                refreshing={refreshing}
                onRefresh={handleRefresh}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchList: {
        height: 320
    },
    historyItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: SIZES.medium,
        borderBottomWidth: .5,
        borderBottomColor: COLORS.lightGray,
    },
    clockIcon: {
        marginRight: 8,
        color: COLORS.gray
    },
    valueData: {
        color: COLORS.gray
    },
    timeData: {
        color: COLORS.lightGray,
        marginLeft: 'auto'
    },
})