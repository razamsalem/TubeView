import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchHistoryItem } from '../types/SearchHistoryItem';

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


export const deleteSearchHistory = async () => {
    try {
        await AsyncStorage.removeItem('searchHistory')
    } catch (err) {
        console.error(`Error deleting search history -> ${err}`)
    }
}