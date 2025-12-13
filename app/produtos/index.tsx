import api from "@/src/services/api";
import { Link, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Alert, FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";


interface Produto {
    id: number;
    nome_produto: string;
    categoria: string;
    valor_produto: number;
}

export default function ProdutosScreen() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [recarregar, SetRecarregar] = useState(false);


    useFocusEffect(
        useCallback(() => {
            carregarProdutos();
        }, [])
    );

    async function carregarProdutos() {
        try {
            setLoading(true);
            const response = await api.get('/produtos');
            setProdutos(response.data.data);
            setError('');
        } catch (error) {
            setError('Erro ao carregar os produtos');
            console.error('Erro: ', error)
        } finally {
            setLoading(false);
        }
    }

    async function deletarProduto(id: number) {
        Alert.alert(
            "Confirmar",
            "Deseja realmente excluir o produto?",
            [
                { text: "Cancelar", style: "cancel"},
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await api.delete(`/produtos/${id}`);
                            setProdutos(produtos.filter(p => p.id !== id));
                        } catch (error) {
                            Alert.alert("Erro", "Não foi possível excluir");
                            console.error("Erro: ", error);
                        }
                    }
                }
            ]
        );
    }

    function renderizarItem({ item }: { item: Produto }) {
        return (
            <View className="bg-neutral-600 p-4 rounder-lg mb-3 shadow shadow-black/10">
                <View className="flex-row justify-between items-center">
                    <View className="flex-1">
                        <Text className="text-base font-semibold text-white flex-1 mr-2" numberOfLines={2}>{item.nome_produto}</Text>
                    </View>
                    
                    <View className="flex-row mt-1">
                        <Text className="text-sm text-gray-300 mr-3">{item.categoria}</Text>
                        <Text className="text-base font-bold text-green-500">R$ {item.valor_produto}</Text>
                    </View>

                    <TouchableOpacity className="ml-3 p-2 bg-red-500 rounded" onPress={() => deletarProduto(item.id)}>
                    <Text className="text-sm font-bold text-white flex-1">Excluir</Text>
                    </TouchableOpacity>
                </View>       
            </View>

            
        )
    }

    async function onRecarregar() {
        SetRecarregar(true);
        await carregarProdutos();
        SetRecarregar(false);
    }

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center p-5 bg-neutral-800">
                <ActivityIndicator size="large" color="#ffffff"/>
                <Text className="mt-3 text-lg text-white">Carregando produtos...</Text>
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

    if (produtos.length === 0) {
        return (
            <View className="flex-1 justify-center items-center p-5 bg-neutral-800">
                <Text className="text-lg text-white text-center">Nenhum produto encontrado</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-neutral-800">
            <View className="bg-neutral-800 p-4 border-gray-300 flex-row justify-between items-center">
                <Text className="text-xl font-bold text-white">Lista de produtos</Text>
                <Text className="text-sm text-white">{produtos.length} produtos</Text>
            </View>

            <View className="flex-row px-4 py-3 border-b border-gray-300">
                <Text className="text-sm font-bold text-white flex-1">Produtos</Text>
            </View>

            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderizarItem}
                contentContainerStyle={{ padding: 16}} 
                refreshControl={
                    <RefreshControl 
                        refreshing={recarregar}
                        onRefresh={onRecarregar}
                        colors={["#000000ff"]}
                        tintColor="#ffffff"
                    />
                } 
            />

            <TouchableOpacity className="absolute bottom-5 right-5 w-16 h-16 bg-blue-500 rounded-full justify-center items-center shadow-lg shadow-black/30">
                <Link href="/produtos/adicionar" className="text-white text-3x1 font-bold">
                    +
                </Link>

            </TouchableOpacity>
        </View>
    )
}

