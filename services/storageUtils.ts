import AsyncStorage from '@react-native-async-storage/async-storage';

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
        const newSearch = { value: searchValue, time: new Date().toLocaleString() }
        searchHistory.unshift(newSearch)
        await AsyncStorage.setItem('searchHistory', JSON.stringify(searchHistory))
    } catch (err) {
        console.error(`Error saving search to history -> ${err}`)
    }
}