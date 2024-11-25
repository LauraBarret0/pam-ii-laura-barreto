import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';

export default function App() {
  const [tasks, setTasks] = useState<any[]>([]); 
  const [deletedTasks, setDeletedTasks] = useState<any[]>([]); 
  const [taskName, setTaskName] = useState<string>(''); 
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null); 

  const tasksCollection = collection(db, 'tasks'); 

 
  useEffect(() => {
    refreshTasks();
  }, []);

  // Atualizar listas de tarefas
  const refreshTasks = async () => {
    const querySnapshot = await getDocs(query(tasksCollection, where('isDeleted', '==', false)));
    const fetchedTasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(fetchedTasks);

    const deletedSnapshot = await getDocs(query(tasksCollection, where('isDeleted', '==', true)));
    const fetchedDeletedTasks = deletedSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDeletedTasks(fetchedDeletedTasks);
  };

  // Adicionar uma nova tarefa
  const addTask = async () => {
    if (taskName.trim() === '') return alert('A tarefa não pode ser vazia');
    await addDoc(tasksCollection, { name: taskName, isDeleted: false });
    setTaskName('');
    alert('Tarefa adicionada!');
    refreshTasks();
  };

  // Atualizar uma tarefa existente
  const updateTask = async () => {
    if (!editingTaskId || taskName.trim() === '') return alert('Selecione uma tarefa para editar');
    const taskRef = doc(db, 'tasks', editingTaskId);
    await updateDoc(taskRef, { name: taskName });
    setTaskName('');
    setEditingTaskId(null);
    alert('Tarefa atualizada!');
    refreshTasks();
  };

  // Marcar uma tarefa como excluída
  const markTaskAsDeleted = async (id: string) => {
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, { isDeleted: true });
    alert('Tarefa marcada como excluída!');
    refreshTasks();
  };

  // Restaurar uma tarefa excluída
  const restoreTask = async (id: string) => {
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, { isDeleted: false });
    alert('Tarefa restaurada!');
    refreshTasks();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a tarefa"
        value={taskName}
        onChangeText={setTaskName}
      />
      {editingTaskId ? (
        <Button title="Salvar Alteração" onPress={updateTask} />
      ) : (
        <Button title="Adicionar Tarefa" onPress={addTask} />
      )}
      <Text style={styles.subtitle}>Tarefas Ativas</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text>{item.name}</Text>
            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() => {
                  setTaskName(item.name);
                  setEditingTaskId(item.id);
                }}
              >
                <Text style={styles.edit}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => markTaskAsDeleted(item.id)}>
                <Text style={styles.delete}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Text style={styles.subtitle}>Tarefas Excluídas</Text>
      <FlatList
        data={deletedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text>{item.name}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => restoreTask(item.id)}>
                <Text style={styles.restore}>Restaurar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  task: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
  },
  edit: {
    color: 'blue',
    marginRight: 10,
  },
  delete: {
    color: 'red',
  },
  restore: {
    color: 'green',
  },
});
