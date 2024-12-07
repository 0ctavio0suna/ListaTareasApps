import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Math.random().toString(), value: task, completed: false }]);
      setTask('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleCompletion = (taskId) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Añadir tarea"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Añadir tarea" onPress={addTask} />
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={[styles.taskItem, item.completed && styles.completedTask]}>
            <TouchableOpacity onPress={() => toggleCompletion(item.id)}>
              <Text style={item.completed && styles.completedText}>{item.value}</Text>
            </TouchableOpacity>
            <Button title="Marcar como completada" onPress={() => toggleCompletion(item.id)} />
            <Button title="Eliminar" onPress={() => deleteTask(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button title="Eliminar todas las tareas" onPress={() => setTasks([])} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f1f1f1',
    marginVertical: 5,
  },
  completedTask: {
    backgroundColor: '#d3ffd3',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
