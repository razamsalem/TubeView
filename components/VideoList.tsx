import React from "react"
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { router } from "expo-router"

import { VideoItem } from "../types/VideoItem"
import { SIZES } from "../constants"

interface VideoListProps {
  videos: VideoItem[]
}

const MemoizedVideoItem = React.memo(({ item, onPress }: { item: VideoItem; onPress: (videoDetails: VideoItem) => void }) => (
  <TouchableOpacity onPress={() => onPress(item)}>
    <View style={styles.videoItem}>
      <Image source={{ uri: item.snippet.thumbnails.medium.url }} style={styles.thumbnail} />
      <Text style={styles.title} numberOfLines={2}>
        {item.snippet.title}
      </Text>
    </View>
  </TouchableOpacity>
))

export default function VideoList({ videos }: VideoListProps) {

  const handleVideoPress = (videoId: string, videoDetails: VideoItem) => {
    router.push({
      pathname: 'videos/[id]',
      params: { id: videoId, videoDetails: JSON.stringify(videoDetails) },
    })
  }

  const keyExtractor = (item: VideoItem) => item.id.videoId

  const renderVideoItem = ({ item }: { item: VideoItem }) => (
    <MemoizedVideoItem item={item} onPress={(videoDetails) => handleVideoPress(item.id.videoId, videoDetails)} />
  )

  return (
    <FlatList
      data={videos}
      renderItem={renderVideoItem}
      keyExtractor={keyExtractor}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
    />
  )
}

const styles = StyleSheet.create({
  videoItem: {
    marginBottom: SIZES.large,
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    resizeMode: 'cover',
  },
  title: {
    marginTop: SIZES.xSmall,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
})
