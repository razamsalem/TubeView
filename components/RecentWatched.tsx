import React from "react"
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native"
import { SwipeListView } from "react-native-swipe-list-view"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { WatchedVideoItem } from "../types/WatchedVideoItem"
import { COLORS, SIZES } from "../constants"

interface RecentSearchProps {
  recentVideos: WatchedVideoItem[]
  refreshing: boolean
  handleRefresh: () => void
  handleDelete: (type: string, value: string) => void
}


export default function RecentWatched({ recentVideos, refreshing, handleRefresh, handleDelete }: RecentSearchProps) {

  const renderItem = (data: { item: WatchedVideoItem; index: number }) => (
    <View style={styles.historyItem}>
      <Image style={styles.image} source={{ uri: data.item.thumbnail }} />
      <View style={styles.videoInfo}>
        <Text style={styles.valueData}>
          {data.item.title.length > 30 ? `${data.item.title.substring(0, 30)}...` : data.item.title}
        </Text>
        <Text style={styles.timeData}>{data.item.channelTitle}</Text>
        <View style={styles.date}>
          <FontAwesome size={14} name="clock-o" style={styles.clockIcon} />
          <Text style={styles.timeData}>{data.item.timeWatched}</Text>
        </View>
      </View>
    </View>
  )

  const RenderHiddenItem = (data: { item: WatchedVideoItem; index: number }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => handleDelete('video', data.item.videoId)}
      >
        <FontAwesome name="trash" size={18} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  )

  return (
    < View style={styles.searchList} >
      <SwipeListView
        data={recentVideos}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderItem}
        renderHiddenItem={RenderHiddenItem}
        rightOpenValue={- 75}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </ View>
  )
}

const styles = StyleSheet.create({
  searchList: {
    minHeight: 360
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    borderBottomWidth: .5,
    borderBottomColor: COLORS.lightGray,
    backgroundColor: COLORS.lightWhite,
    gap: SIZES.small
  },
  clockIcon: {
    marginRight: 4,
    color: COLORS.gray
  },
  valueData: {
    color: COLORS.gray
  },
  timeData: {
    color: COLORS.lightGray,
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
    paddingVertical: 48,
    backgroundColor: COLORS.primary,
  },
  image: {
    width: '40%',
    height: 90
  },
  videoInfo: {
    flexDirection: 'column',
    textAlign: 'left'
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})
