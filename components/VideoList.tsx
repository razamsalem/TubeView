import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import moment from "moment";

import { VideoItem } from "../types/VideoItem";
import { SIZES, COLORS } from "../constants";

interface VideoListProps {
  videos: VideoItem[]
}

const MemoizedVideoItem = React.memo(({ item, onPress }: { item: VideoItem; onPress: (videoDetails: VideoItem) => void }) => {
  const formattedTime = moment(item.snippet.publishTime).fromNow()

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.videoItem}>
        <Image source={{ uri: item.snippet.thumbnails.high.url }} style={styles.thumbnail} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {item.snippet.title}
          </Text>
          <View style={styles.miniData}>
            <Text style={styles.channel} numberOfLines={1}>
              {item.snippet.channelTitle}
            </Text>
            <Text>.</Text>
            <Text style={styles.publishTime}>{formattedTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
})

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
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    resizeMode: 'cover',
  },
  title: {
    marginTop: SIZES.xSmall,
    textAlign: 'left',
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 4,
  },
  miniData: {
    flexDirection: 'row',
    gap: 4
  },
  channel: {
    marginTop: 4,
    color: COLORS.gray,
  },
  publishTime: {
    marginTop: 4,
    color: COLORS.gray,
  },
})
