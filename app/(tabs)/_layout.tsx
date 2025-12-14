import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#3b82f6',
            tabBarInactiveTintColor: '#6b7280',
            tabBarStyle: {
                backgroundColor: '#ffffffff',
            },
        }}
        >
            <Tabs.Screen 
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size}) => (
                        <MaterialIcons name="home" size={size} color={color}/>
                    )
                }}
            />

            <Tabs.Screen 
                name="produtos"
                options={{
                    title: 'Produtos',
                    tabBarIcon: ({ color, size}) => (
                        <MaterialIcons name="inventory" size={size} color={color}/>
                    )
                }}
            />

            <Tabs.Screen 
                name="clientes"
                options={{
                    title: 'Clientes',
                    tabBarIcon: ({ color, size}) => (
                        <MaterialIcons name="people" size={size} color={color}/>
                    )
                }}
            />
            
        </Tabs>
        
    )
}