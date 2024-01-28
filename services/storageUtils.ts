import AsyncStorage from '@react-native-async-storage/async-storage'
import { SearchHistoryItem } from '../types/SearchHistoryItem'
import { WatchedVideoItem } from '../types/WatchedVideoItem'

export const getHistory = async (type: string) => {
    try {
        if (type === 'search') {
            const searchHistory = await AsyncStorage.getItem('searchHistory')
            return searchHistory ? (JSON.parse(searchHistory)) : []
        }
        if (type === 'video') {
            const watchedVideos = await AsyncStorage.getItem('watchedVideos')
            return watchedVideos ? JSON.parse(watchedVideos) : []
        }

        return null
    } catch (err) {
        console.error(`Failed to get history -> ${err}`)
        return []
    }
}

export const saveHistory = async (type: string, value: string | WatchedVideoItem) => {
    try {
        let history

        if (type === 'search') {
            history = await getHistory(type)
            const existingIdx = history.findIndex((item: SearchHistoryItem) => item.value === value)

            if (existingIdx !== -1) {
                history.splice(existingIdx, 1)
            }

            const newSearch = { value, time: new Date().toLocaleString() }
            history.unshift(newSearch)

            await AsyncStorage.setItem('searchHistory', JSON.stringify(history))
        } else if (type === 'video') {
            const videoData = value as WatchedVideoItem

            history = await getHistory(type)
            const existingIdx = history.findIndex((item: WatchedVideoItem) => item.videoId === videoData.videoId)

            if (existingIdx !== -1) {
                history.splice(existingIdx, 1)
            }

            history.unshift(videoData)
            await AsyncStorage.setItem('watchedVideos', JSON.stringify(history))

        } else {
            console.error('Invalid history type')
        }

    } catch (err) {
        console.error(`Error saving history -> ${err}`)
    }
}

export const deleteHistoryItem = async (type: string, value: string) => {
    try {
        if (type === 'search') {
            const searchHistory = await getHistory(type)
            const updatedSearchHistory = searchHistory.filter(
                (item: SearchHistoryItem) => item.value !== value
            )
            await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory))
        }
        if (type === 'video') {
            const watchedVideos = await getHistory(type)
            const updatedWatchedVideos = watchedVideos.filter((video: WatchedVideoItem) => video.videoId !== value)
            await AsyncStorage.setItem('watchedVideos', JSON.stringify(updatedWatchedVideos))
        }
        else return null

    } catch (err) {
        console.error(`Error deleting history item -> ${err}`)
    }
}

export const deleteSearchHistory = async () => {
    try {
        await AsyncStorage.removeItem('searchHistory')
        await AsyncStorage.removeItem('watchedVideos')
    } catch (err) {
        console.error(`Error deleting history -> ${err}`)
    }
}
