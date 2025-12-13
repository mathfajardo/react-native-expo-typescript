import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";



export default function Index() {
  return (
    <View className="flex-1 items-center bg-neutral-800 p-5">
      <Text className="text-3xl font-bold text-white mb-2 mt-5">FajaLoja</Text>
      <Text className="text-white mb-10 text-center">Sua API está conectada.</Text>

      <TouchableOpacity className="bg-green-900 px-8 py-4 rounded-lg">
        <Link href="/produtos" className="text-white text-lg font-semibold">
          ver produtos
        </Link>
      </TouchableOpacity>
    </View>
  );
}