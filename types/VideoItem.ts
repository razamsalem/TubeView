export interface VideoItem {
    id: {
        videoId: string
    }
    snippet: {
        thumbnails: {
            high: {
                url: string
            }
        }
        title: string
        description: string
        publishTime: string
        channelTitle: string
    }
}