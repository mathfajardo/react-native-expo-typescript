import api from "@/src/services/api";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function HomeScreen() {

    const [totalProdutos, setTotalProdutos] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        carregarTotalProdutos();
    }, []);

    async function carregarTotalProdutos() {
        try {
            setLoading(true);
            const response = await api.get('/produtosTotal');
            setTotalProdutos(response.data.data.total);
            setError('')
        } catch (error) {
            console.error('Erro: ', error)
            setError('Erro ao carregar dados');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center p-5 bg-neutral-800">
                <ActivityIndicator size="large" color="#ffffff"/>
                <Text className="mt-3 text-lg text-white">Carregando...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center p-5 bg-neutral-800">
                <Text className="text-lg text-red-500 text-center">{error}</Text>
            </View>
        )
    }

    return (
        <View className="flex-1 items-center bg-neutral-800 p-5">
            <Text className="text-4xl font-bold text-white mb-2 mt-5">FajaLoja</Text>

            <View className="flex-row mt-10 w-full justify-between max-w-md">
                <View className="bg-neutral-700 p-4 rounded-lg w-48 shadow shadow-black/10">
                    <Text className="text-white text-lg font-bold mb-2">Total de produtos</Text>
                    <Text className="text-gray-300 text-6xl"> {totalProdutos}</Text>
                </View>

                <View className="bg-neutral-700 p-4 rounded-lg w-48 shadow shadow-black/10">
                    <Text className="text-white text-lg font-bold mb-2">Produtos</Text>
                    <Text className="text-gray-300 text-6xl"> {totalProdutos}</Text>
                </View>
            </View>
        </View>
    )
}