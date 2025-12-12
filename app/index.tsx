import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-white">FajaLoja</Text>
      <Text style={styles.subtitle}>Sua API está conectada.</Text>

      <TouchableOpacity style={styles.button}>
        <Link href="/produtos" style={styles.buttonText}>
          ver produtos
        </Link>
      </TouchableOpacity>

    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});