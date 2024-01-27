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

export const saveSearchToHistory = async (searchValue: string) => {
    try {
        const searchHistory = await getHistory('search')
        const existingIdx = searchHistory.findIndex((item: SearchHistoryItem) => item.value === searchValue)

        if (existingIdx !== -1) {
            searchHistory.splice(existingIdx, 1)
        }

        const newSearch = { value: searchValue, time: new Date().toLocaleString() }
        searchHistory.unshift(newSearch)

        await AsyncStorage.setItem('searchHistory', JSON.stringify(searchHistory))
    } catch (err) {
        console.error(`Error saving search to history -> ${err}`)
    }
}

export const deleteHistoryItem = async (type: string, value: string) => {
    try {
        if (type === 'search') {
            const searchHistory = await getHistory('search')
            const updatedSearchHistory = searchHistory.filter(
                (item: SearchHistoryItem) => item.value !== value
            )
            await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory))
        }

        if (type === 'video') {
            const watchedVideos = await getHistory('video')
            const updatedWatchedVideos = watchedVideos.filter((video: WatchedVideoItem) => video.videoId !== value)
            await AsyncStorage.setItem('watchedVideos', JSON.stringify(updatedWatchedVideos))
        }

    } catch (err) {
        console.error(`Error deleting history item -> ${err}`)
    }
}


export const deleteSearchHistory = async () => {
    try {
        await AsyncStorage.removeItem('searchHistory')
    } catch (err) {
        console.error(`Error deleting search history -> ${err}`)
    }
}



export const saveWatchedVideo = async (videoData: WatchedVideoItem) => {
    try {
        const watchedVideos = await getHistory('video')
        watchedVideos.unshift(videoData)
        await AsyncStorage.setItem('watchedVideos', JSON.stringify(watchedVideos))
    } catch (err) {
        console.error(`Error saving watched video -> ${err}`)
    }
}


export const deleteAllWatchedVideos = async () => {
    try {
        await AsyncStorage.removeItem('watchedVideos')
    } catch (err) {
        console.error(`Error deleting all watched videos -> ${err}`)
    }
}
