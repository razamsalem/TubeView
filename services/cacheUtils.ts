import AsyncStorage from "@react-native-async-storage/async-storage"
import { VideoItem } from "../types/VideoItem"

export const getCachedData = async (cacheKey: string) => {
    const cachedData = await AsyncStorage.getItem(cacheKey)

    if (cachedData) {
        const parsedData = JSON.parse(cachedData)

        const currTime = new Date().getTime()
        const cacheTime = parsedData.timestamp
        const timeDiff = (currTime - cacheTime) / (1000 * 60 * 60)

        if (timeDiff < 4) {
            return parsedData
        } else {
            AsyncStorage.removeItem(cacheKey)
        }

        return null
    }
}

export const cacheData = async (cacheKey: string, data: VideoItem[]) => {
    const dataToCache = {
        items: data,
        timestamp: new Date().getTime()
    }
    AsyncStorage.setItem(cacheKey, JSON.stringify(dataToCache))
}
