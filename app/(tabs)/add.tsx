import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

type Book = {
    id: string
    name: string
    price: string
}

export default function Add() {
    const [bookName, setBookName] = useState("")
    const [bookPrice, setBookPrice] = useState("")
    const [allBook, setAllBook] = useState<Book[]>([])

    useEffect(() => {
        loadBook()
    }, [addBook])

    async function loadBook() {
        const data = await AsyncStorage.getItem("book")
        if (data !== null) {
            setAllBook(JSON.parse(data))
        }
    }

    async function addBook() {
        const book = {
            id: Date.now().toString(),
            name: bookName,
            price: bookPrice
        }

        console.log(book)

        const newBook = [...allBook, book]
        await AsyncStorage.setItem("book", JSON.stringify(newBook))
        setAllBook(newBook)

        setBookName("")
        setBookPrice("")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>เพิ่มหนังสือใหม่</Text>

            <View style={styles.card}>
                <Text style={styles.label}>ชื่อหนังสือ</Text>
                <TextInput
                    value={bookName}
                    onChangeText={setBookName}
                    placeholder="กรอกชื่อหนังสือ"
                    style={styles.input} />

                <Text style={styles.label}>ราคาหนังสือ</Text>
                <TextInput
                    value={bookPrice}
                    onChangeText={setBookPrice}
                    placeholder="กรอกราคา (บาท)"
                    keyboardType="numeric"
                    style={styles.input} />

                <Button title="save" onPress={() => addBook()} />


            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'skyblue',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 3, // Android shadow
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '000000',
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: 'lightgrey',
    },
    button: {
        backgroundColor: 'green',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});