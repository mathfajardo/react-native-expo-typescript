import api from "@/src/services/api";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
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
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Adicionar produto</Text>
            </View>

            <View style={styles.form}>
                {/* campo nome */}
                <Text style={styles.label}>Nome do produto</Text>
                <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Digite o nome do produto"
                />

                {/* campo categoria */}
                <Text style={styles.label}>Categoria</Text>
                <TextInput
                    style={styles.input}
                    value={categoria}
                    onChangeText={setCategoria}
                    placeholder="Digite o nome da categoria"
                />

                {/* campo valor */}
                <Text style={styles.label}>Valor (R$)</Text>
                <TextInput
                    style={styles.input}
                    value={valor}
                    onChangeText={setValor}
                    placeholder="Digite o valor"
                    keyboardType="numeric"
                />

                {/* botoes */}
                <TouchableOpacity
                    style={[styles.btn, styles.btnPrimary]}
                    onPress={Adicionar}
                    disabled={carregando}
                >
                    <Text style={styles.btnText}>
                        {carregando ? "Salvando..." : "Adicionar produto"}
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, styles.btnSecondary]}
                    onPress={() => router.back()}
                >
                    <Text style={styles.btnText}>Cancelar</Text>

                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#fff',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    form: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 12,
        fontSize: 16, 
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
    },
    btn: {
        padding: 16, 
        borderRadius: 6,
        alignItems: 'center',
        marginBottom: 10,
    },
    btnPrimary: {
        backgroundColor: '#007bff',
    },
    btnSecondary: {
        backgroundColor: '#6c757d',
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    

});