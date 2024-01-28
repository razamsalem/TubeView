import { router } from "expo-router"
import { VideoItem } from "../types/VideoItem"
import { saveHistory } from "./storageUtils"
import { YT_API_KEY } from "@env"
import axios from "axios"

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

export const fetchVideoData = async (value: string) => {
  const BASE_URL: string = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&videoEmbeddable=true&type=video&key=${YT_API_KEY}&q=${value}`
  const res = await axios.get(BASE_URL)
  return res.data
}