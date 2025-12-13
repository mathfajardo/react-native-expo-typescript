import api from "@/src/services/api";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function AdicionarProduto() {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [categoria, setCategoria] = useState("");
    const [valor, setValor] = useState("");
    const [carregando, setCarregando] = useState(false);

    const Adicionar = async () => {
        if (!nome.trim() || !categoria.trim() || !valor.trim()) {
            Alert.alert("Erro", "Preencha todos os campos");
            return;
        }

        const valorNumerico = parseFloat(valor);
        if (isNaN(valorNumerico)) {
            Alert.alert("Erro", "Valor deve ser um número");
            return;
        }

        setCarregando(true);
        try {
            const dadosProdutos = {
                nome_produto: nome,
                categoria: categoria,
                valor_produto: valorNumerico
            };

            const response = await api.post('/produtos', dadosProdutos);

            if (response.status === 201 || response.status === 200) {
                Alert.alert("Sucesso", "Produto adicionado com sucesso!");
                router.back();
            }
        } catch (error) {
            console.error("Erro: ", error);
            Alert.alert("Erro", "Não foi possível adicionar");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <ScrollView className="flex-1 bg-neutral-800">
            <View className="bg-neutral-800 p-5 border-b border-gray-700 items-center">
                <Text className="text-2x1 font-bold text-white">Adicionar produto</Text>
            </View>

            <View className="bg-neutral-700 m-4 p-5 rounded-lg shadow shadow-black/10">
                {/* campo nome */}
                <Text className="text-lg font-semibold text-white mb-2">Nome do produto</Text>
                <TextInput
                    className="border border-gray-600 rounded-lg p-3 text-white bg-neutral-800 mb-4"
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Digite o nome do produto"
                    placeholderTextColor="#9CA3AF"
                />

                {/* campo categoria */}
                <Text className="text-lg font-semibold text-white mb-2">Categoria</Text>
                <TextInput
                    className="border border-gray-600 rounded-lg p-3 text-white bg-neutral-800 mb-4"
                    value={categoria}
                    onChangeText={setCategoria}
                    placeholder="Digite o nome da categoria"
                    placeholderTextColor="#9CA3AF"
                />

                {/* campo valor */}
                <Text className="text-lg font-semibold text-white mb-2">Valor (R$)</Text>
                <TextInput
                    className="border border-gray-600 rounded-lg p-3 text-white bg-neutral-800 mb-4"
                    value={valor}
                    onChangeText={setValor}
                    placeholder="Digite o valor"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                />

                {/* botoes */}
                <TouchableOpacity
                    className="bg-blue-600 p-4 rounded-lg mb-3"
                    onPress={Adicionar}
                    disabled={carregando}
                >
                    <Text className="text-white text-center text-lg font-semibold">
                        {carregando ? "Salvando..." : "Adicionar produto"}
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-gray-600 p-4 rounded-lg"
                    onPress={() => router.back()}
                >
                    <Text className="text-white text-center text-lg font-semibold">Cancelar</Text>

                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}
