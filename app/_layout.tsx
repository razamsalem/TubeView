import { Stack } from "expo-router"

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                    headerTitle: 'Home',
                }}
            />
            {/* 
            <Stack.Screen
                name="videos/[id]"
                options={({ route }) => ({
                    headerTitle: route.params?.id ? `${route.params.id} video` : "Video",
                    title: "Video",
                })}
            /> */}
        </Stack>
    )
}