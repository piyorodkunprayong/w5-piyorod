import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

type Book = {
    id: string
    name: string
    price: string
}

export default function Home() {

    const [allBook, setAllBook] = useState<Book[]>([])

    useEffect(() => {
        loadBook()
    }, [allBook])

    async function loadBook() {
        const data = await AsyncStorage.getItem("book")
        if (data !== null) {
            setAllBook(JSON.parse(data))
        }
    }

    async function removeBook(id:string) {
        const newBook = allBook.filter((_, i) => _.id != id)
        await AsyncStorage.setItem("book", JSON.stringify(newBook))
        setAllBook(newBook)
    }

    return (
        <View style={styles.container}  >
            <FlatList
                data={allBook}
                keyExtractor={(item)=> item.id.toString()}
                contentContainerStyle={styles.list}
                renderItem={({item})=>(
                    <View style={styles.card}>
                        <Text style={styles.id}>รหัส : {item.id}</Text>
                        <Text style={styles.name}>เรื่อง : {item.name}</Text>
                        <Text style={styles.price}>ราคา : {item.price}</Text>
                        <TouchableOpacity   style={styles.deleteBtn} 
                                            onPress={() => removeBook(item.id)}>
                            <Text style={styles.deleteText}>del</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue", // พื้นหลังอ่อน สบายตา
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "lightgrey",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  id: {
    fontSize: 12,
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    color: "green",
    marginBottom: 12,
  },
  deleteBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#FFECEC",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  deleteText: {
    color: "#D9534F",
    fontSize: 13,
    fontWeight: "500",
  },
});
