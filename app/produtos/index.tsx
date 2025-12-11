import api from "@/src/services/api";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

    useEffect(() => {
        carregarProdutos();
    }, []);

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

    function renderizarItem({ item }: { item: Produto }) {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                    <Text style={styles.nome_produto}>{item.nome_produto}</Text>
                    <Text style={styles.categoria}>{item.categoria}</Text>
                    <Text style={styles.valor_produto}>R$ {item.valor_produto}</Text>
                </View>
            </View>
        )
    }

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff"/>
                <Text style={styles.loadingText}>Carregando produtos...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        )
    }

    if (produtos.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Lista de produtos</Text>
                <Text style={styles.count}>{produtos.length} produtos</Text>
            </View>

            <View style={styles.cabecalho}>
                <Text style={styles.cabecalhoTexto}>Produto</Text>
                <Text style={styles.cabecalhoTexto}>Categoria</Text>
                <Text style={styles.cabecalhoTexto}>Valor</Text>

            </View>

            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderizarItem}
                contentContainerStyle={styles.list}     
            />

            <TouchableOpacity style={styles.btn}>
                <Link href="/produtos/adicionar" style={styles.btnText}>
                    +
                </Link>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    center: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        backgroundColor: '#fff',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    count: {
        fontSize: 14,
        color: '#666',
    },
    list: {
        padding: 16
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    nome_produto: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 4,
        marginBottom: 4,
    },
    categoria: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    valor_produto: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2ecc71',
        textAlign: 'right',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: '#e74c3c',
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center'
    },
    cabecalho: {
        flexDirection: 'row',
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0'
    },
    cabecalhoTexto: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
        flex: 1,
        textAlign: 'center',
    },
    btn: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007bff',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    btnText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    }
});