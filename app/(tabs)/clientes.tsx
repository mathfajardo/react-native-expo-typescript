import api from "@/src/services/api";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";

interface Cliente {
  id: number,
  nome_cliente: string,
  data_nascimento: string,
  ativo: boolean
}

export default function ClientesScreen() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recarregar, SetRecarregar] = useState(false);


  useFocusEffect(
    useCallback(() => {
      carregarClientes();
    }, [])
  );


  async function carregarClientes() {
    try {
      setLoading(true);
      const response = await api.get('/clientes');
      setClientes(response.data.data);
      setError('');
    } catch (error) {
      setError('Erro ao carregar os clientes');
      console.error('Erro: ', error);
    } finally {
      setLoading(false);
    }

  }

  async function deletarCliente(id: number) {
    Alert.alert(
      "Confirmar",
      "Deseja realmente excluir o produto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/clientes/${id}`);
              setClientes(clientes.filter(c => c.id !== id));
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir");
              console.error("Erro: ", error);
            }
          }
        }
      ]
    );
  }

  function renderizarItem({ item }: { item: Cliente }) {
    return (
      <View className="bg-neutral-600 p-4 rounder-lg mb-3 shadow shadow-black/10">
        <View className="flex-row justify-between items-center">
            <Text className="text-base font-semibold text-white flex-1 mr-2" numberOfLines={2}>{item.nome_cliente}</Text>
            <Text className="text-sm text-gray-300 mr-3">{item.data_nascimento}</Text>
          <TouchableOpacity className="ml-3 p-2 bg-red-500 rounded" onPress={() => deletarCliente(item.id)}>
            <Text className="text-sm font-bold text-white flex-1">Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  async function onRecarregar() {
    SetRecarregar(true);
    await carregarClientes();
    SetRecarregar(false);
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center p-5 bg-neutral-800">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="mt-3 text-lg text-white">Carregando clientes...</Text>
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

  if (clientes.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-5 bg-neutral-800">
        <Text className="text-lg text-white text-center">Nenhum cliente encontrado</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-neutral-800">
      <View className="bg-neutral-800 p-4 border-gray-300 flex-row justify-between items-center">
        <Text className="text-xl font-bold text-white">Lista de clientes</Text>
        <Text className="text-sm text-white">{clientes.length} clientes</Text>
      </View>

      <View className="flex-row px-4 py-3 border-b border-gray-300">
        <Text className="text-sm font-bold text-white flex-1">Clientes</Text>
      </View>

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderizarItem}
        contentContainerStyle={{ padding: 16 }}
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
        <Link href="../clientes/adicionar" asChild>
          <TouchableOpacity>
            <MaterialIcons name="add" size={32} color="white" />
          </TouchableOpacity>
        </Link>

      </TouchableOpacity>
    </View>
  )

}