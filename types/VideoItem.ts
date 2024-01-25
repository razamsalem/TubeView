export interface VideoItem {
    id: {
        videoId: string
    }
    snippet: {
        thumbnails: {
            medium: {
                url: string
            }
        }
        title: string
        description: string
        publishTime: string
        channelTitle: string
    }
}