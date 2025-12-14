import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen 
                name="index"
                options={{
                    title: 'Home',
                }}
            />

            <Tabs.Screen 
                name="produtos"
                options={{
                    title: 'Produtos',
                }}
            />

            <Tabs.Screen 
                name="clientes"
                options={{
                    title: 'Clientes',
                }}
            />
        </Tabs>
        
    )
}