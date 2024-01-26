import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { COLORS } from '../../constants'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function Layout() {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor: COLORS.primary}}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "TubeView",
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />, 
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="User"
        options={{
          title: "You",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  )
}
