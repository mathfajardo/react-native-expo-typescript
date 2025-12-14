import api from "@/src/services/api";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
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

export default function AdicionarCliente() {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [data_nascimento, setData_nascimento] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(false);
    const [ativo, setAtivo] = useState(1);
    const [carregando, setCarregando] = useState(false);

    // função para formatar a data
    function formatarData(data: Date | null) {
        if (!data) return '';

        return data.toLocaleDateString('pt-BR');
    }

    const Adicionar = async () => {
        if (!nome.trim() || !data_nascimento) {
            Alert.alert("Erro", "Preencha todos os campos");
            return;
        }

        setCarregando(true);
        try {

            const data_formatada = data_nascimento.toISOString().split('T')[0];
            const dadosClientes = {
                nome_cliente: nome,
                data_nascimento: data_formatada,
                ativo: ativo
            };

            const response = await api.post('/clientes', dadosClientes);

            if (response.status === 201 || response.status === 200) {
                Alert.alert("Sucesso", response.data.message);
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
                <Text className="text-2x1 font-bold text-white">Adicionar Cliente</Text>
            </View>

            <View className="bg-neutral-700 m-4 p-5 rounded-lg shadow shadow-black/10">
                {/* campo nome */}
                <Text className="text-lg font-semibold text-white mb-2">Nome do cliente</Text>
                <TextInput
                    className="border border-gray-600 rounded-lg p-3 text-white bg-neutral-800 mb-4"
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Digite o nome do cliente"
                    placeholderTextColor="#9CA3AF"
                />

                {/* campo data de nascimento */}
                <Text className="text-lg font-semibold text-white mb-2">Data de nascimento</Text>
                <TouchableOpacity className="border border-gray-600 rounded-lg p-3 bg-neutral-800 mb-4" onPress={() => setShowPicker(true)}>
                    <Text className="text-white">
                        {formatarData(data_nascimento) || "Selecione uma data"}
                    </Text>
                </TouchableOpacity>

                {showPicker && (
                    <DateTimePicker 
                        value={data_nascimento || new Date()}
                        onChange={(event, date) => {
                            setShowPicker(false);
                            if (date) setData_nascimento(date);
                        }}
                        mode="date"
                    />
                )}

                {/* campo ativo */}
                <Text className="text-lg font-semibold text-white mb-2">Ativo</Text>
                <View className="border border-gray-600 rounded-lg bg-neutral-800 mb-6">
                    <Picker
                        selectedValue={ativo}
                        onValueChange={(itemValue) => setAtivo(itemValue)}
                        style= {{ color: 'white'}}    
                        dropdownIconColor="white"
                    >
                        <Picker.Item label="Sim" value="1"/>
                        <Picker.Item label="Não" value="0"/>
                    </Picker>
                </View>

                {/* botoes */}
                <TouchableOpacity
                    className="bg-blue-600 p-4 rounded-lg mb-3"
                    onPress={Adicionar}
                    disabled={carregando}
                >
                    <Text className="text-white text-center text-lg font-semibold">
                        {carregando ? "Salvando..." : "Adicionar cliente"}
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
