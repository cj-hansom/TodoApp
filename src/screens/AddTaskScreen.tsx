import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemeContext } from '../context/ThemeContext';
import { useTasks } from '../context/TaskProvider';
import { Task } from '../types/Task';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  TaskList: undefined;
  AddTask: { taskToEdit?: Task };
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddTask'>;

const AddTaskScreen: React.FC<Props> = ({ navigation, route }) => {
  const { theme } = useContext(ThemeContext);
  const { addTask, updateTask } = useTasks();
  const taskToEdit = route.params?.taskToEdit;

  const [title, setTitle] = useState(taskToEdit?.title || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const [dueDate, setDueDate] = useState<string | undefined>(taskToEdit?.dueDate);
  const [showDate, setShowDate] = useState(false);

  const save = () => {
if (!title.trim()) {
    Alert.alert('Validation', 'Please enter a title before saving.');
    return;
  }
    const task: Task = {
      id: taskToEdit?.id || Date.now().toString(),
      title,
      description,
      dueDate,
      completed: taskToEdit?.completed || false,
    };
    taskToEdit ? updateTask(task) : addTask(task);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        placeholder="Title"
          placeholderTextColor={theme.text === '#111' ? '#555' : '#aaa'}
        value={title}
        onChangeText={setTitle}
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
      />
      <TextInput
        placeholder="Description"
          placeholderTextColor={theme.text === '#111' ? '#555' : '#aaa'}
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
      />
      <Button title={dueDate ? `Due: ${dueDate}` : 'Set Due Date'} onPress={() => setShowDate(true)} />
      {showDate && (
        <DateTimePicker
          value={dueDate ? new Date(dueDate) : new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDate(Platform.OS === 'ios');
            if (date) setDueDate(date.toISOString().split('T')[0]);
          }}
        />
      )}
      <View style={styles.buttonContainer}>

        <Button  title={taskToEdit ? 'Update Task' : 'Add Task'} onPress={save} />
      </View>
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  input: { borderWidth: 1, padding: 8, marginBottom: 12, borderRadius: 4 },
  buttonContainer:{marginTop:20}
});
