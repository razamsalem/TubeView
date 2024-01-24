import React from "react"
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { router } from "expo-router"

import { VideoItem } from "../types/VideoItem"
import { SIZES } from "../constants"

interface VideoListProps {
    videos: VideoItem[]
}

const MemoizedVideoItem = React.memo(({ item, onPress }: { item: VideoItem; onPress: () => void }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.videoItem}>
            <Image source={{ uri: item.snippet.thumbnails.medium.url }} style={styles.thumbnail} />
            <Text style={styles.title} numberOfLines={2}>{item.snippet.title}</Text>
        </View>
    </TouchableOpacity>
))

export default function VideoList({ videos }: VideoListProps) {

    const handleVideoPress = (videoId: string) => {
        router.push({
            pathname: 'videos/[id]',
            params: { id: videoId },
        })
    }

    const renderVideoItem = ({ item, index }: { item: VideoItem; index: number }) => (
        <MemoizedVideoItem
            item={item}
            onPress={() => handleVideoPress(item.id.videoId)}
        />
    )

    return (
        <View>
            <FlatList
                data={videos}
                renderItem={renderVideoItem}
                keyExtractor={(item) => item.id.videoId}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
            />
        </View>
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