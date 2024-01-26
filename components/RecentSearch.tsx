import React from "react"
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { SwipeListView } from "react-native-swipe-list-view"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { SearchHistoryItem } from "../types/SearchHistoryItem"
import { COLORS, SIZES } from "../constants"

interface RecentSearchProps {
    recentSearches: SearchHistoryItem[]
    refreshing: boolean
    handleRefresh: () => void
    handleDelete: (searchValue: string) => void
}


export default function RecentSearch({ recentSearches, refreshing, handleRefresh, handleDelete }: RecentSearchProps) {

    const renderItem = (data: { item: SearchHistoryItem; index: number }) => (
        <View style={styles.historyItem}>
            <FontAwesome size={18} name="clock-o" style={styles.clockIcon} />
            <Text style={styles.valueData}>
                {data.item.value.length > 23 ? `${data.item.value.substring(0, 23)}...` : data.item.value}
            </Text>
            <Text style={styles.timeData}>{data.item.time}</Text>
        </View>
    )

    const renderHiddenItem = (data: { item: SearchHistoryItem; index: number }) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => handleDelete(data.item.value)}
            >
                <FontAwesome name="trash" size={18} color={COLORS.white} />
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.searchList}>
            <SwipeListView
                data={recentSearches}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-75}
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
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.medium,
        borderBottomWidth: .5,
        borderBottomColor: COLORS.lightGray,
        backgroundColor: COLORS.lightWhite
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
        marginLeft: 'auto',
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    backRightBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
    },
    backRightBtnRight: {
        paddingVertical: SIZES.small,
        backgroundColor: COLORS.primary,
    },
})
