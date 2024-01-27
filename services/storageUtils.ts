import AsyncStorage from '@react-native-async-storage/async-storage'
import { SearchHistoryItem } from '../types/SearchHistoryItem'
import { WatchedVideoItem } from '../types/WatchedVideoItem'

export const getSearchHistory = async () => {
    try {
        const searchHistory = await AsyncStorage.getItem('searchHistory')
        return searchHistory ? (JSON.parse(searchHistory)) : []
    } catch (err) {
        console.error(`Failed to get search history -> ${err}`)
        return []
    }
}

export const saveSearchToHistory = async (searchValue: string) => {
    try {
        const searchHistory = await getSearchHistory()
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

export const deleteSearchHistoryItem = async (searchValue: string) => {
    try {
        const searchHistory = await getSearchHistory()
        const updatedSearchHistory = searchHistory.filter(
            (item: SearchHistoryItem) => item.value !== searchValue
        )
        await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory))
    } catch (err) {
        console.error(`Error deleting search history item -> ${err}`)
    }
}


export const deleteSearchHistory = async () => {
    try {
        await AsyncStorage.removeItem('searchHistory')
    } catch (err) {
        console.error(`Error deleting search history -> ${err}`)
    }
}

export const getWatchedVideos = async () => {
    try {
        const watchedVideos = await AsyncStorage.getItem('watchedVideos')
        return watchedVideos ? JSON.parse(watchedVideos) : []
    } catch (err) {
        console.error(`Failed to get watched videos -> ${err}`)
        return []
    }
}

export const saveWatchedVideo = async (videoData: WatchedVideoItem) => {
    try {
        const watchedVideos = await getWatchedVideos()
        watchedVideos.unshift(videoData)
        await AsyncStorage.setItem('watchedVideos', JSON.stringify(watchedVideos))
    } catch (err) {
        console.error(`Error saving watched video -> ${err}`)
    }
}

export const deleteWatchedVideo = async (videoId: string) => {
    try {
        const watchedVideos = await getWatchedVideos()
        const updatedWatchedVideos = watchedVideos.filter((video: WatchedVideoItem) => video.videoId !== videoId)
        await AsyncStorage.setItem('watchedVideos', JSON.stringify(updatedWatchedVideos))
    } catch (err) {
        console.error(`Error deleting watched video -> ${err}`)
    }
}

export const deleteAllWatchedVideos = async () => {
    try {
        await AsyncStorage.removeItem('watchedVideos')
    } catch (err) {
        console.error(`Error deleting all watched videos -> ${err}`)
    }
}
