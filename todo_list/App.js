import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

export default function App() {
    const [items, setItems] = useState('');
    const [list, setList] = useState([]);

    function handleAddSetList() {
        if (items.trim() !== '') {
            setList((prevItems) => [...prevItems, { 
                text: items, 
                completed: false
            }]);
            setItems('');
        }
    }

    function handleDeleteFromList(itemIndex) {
        setList((prevItems) => prevItems.filter((item, index) => index !== itemIndex));
    }

    function toggleComplete(itemIndex) {
        const updatedList = list.map((item, index) => {
            if (index === itemIndex) {
                return {
                    ...item,
                    completed: !item.completed
                };
            }
            return item;
        });
        setList(updatedList);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>To-Do List</Text>
            <TextInput
                placeholder="What task do you need to complete?"
                value={items}
                onChangeText={(text) => setItems(text)}
                style={styles.input}
            />
            <Button title="Add" onPress={handleAddSetList} />
            
            <FlatList
                data={list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.listItem}>
                        <View style={styles.taskContainer}>
                            <Text 
                                style={[
                                    styles.taskText,
                                    item.completed && styles.completedTask
                                ]}
                                onPress={() => toggleComplete(index)}
                            >
                                {item.text}
                            </Text>
                            {item.completed && <Text style={styles.checkmark}>✓</Text>}
                        </View>
                        <Button 
                            title="Delete" 
                            onPress={() => handleDeleteFromList(index)} 
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        justifyContent: 'center',
    },
    input: {
        marginBottom: 16,
        borderWidth: 1,
        padding: 8,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        justifyContent: 'space-between',
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Takes available space (pushes Delete button to the right)
    },
    taskText: {
        marginRight: 8, // Small space between text and checkmark
    },
    completedTask: {
        textDecorationLine: 'line-through',
    },
    checkmark: {
        marginRight: 16, // Space after checkmark (before Delete button)
    },
});