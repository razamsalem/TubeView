import { router } from "expo-router"
import { VideoItem } from "../types/VideoItem"
import { saveHistory } from "./storageUtils"

export const handleVideoPress = (videoId: string, videoDetails: VideoItem) => {
    router.push({
      pathname: 'videos/[id]',
      params: { id: videoId, videoDetails: JSON.stringify(videoDetails) },
    })
  
    saveHistory('video', {
      videoId: videoId,
      title: videoDetails.snippet.title,
      thumbnail: videoDetails.snippet.thumbnails.high.url,
      channelTitle: videoDetails.snippet.channelTitle,
      timeWatched: new Date().toLocaleString(),
    })
  }