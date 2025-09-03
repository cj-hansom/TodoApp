import React, { useContext, useEffect } from 'react';
import { View, FlatList, StyleSheet, Button, LayoutAnimation } from 'react-native';
import TaskItem from '../components/TaskItem';
import { useTasks } from '../context/TaskProvider';
import { ThemeContext } from '../context/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Task } from '../types/Task';

type RootStackParamList = { TaskList: undefined; AddTask: { taskToEdit?: Task } | undefined };
type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

const TaskListScreen: React.FC<Props> = ({ navigation }) => {
  const { tasks, toggleTask, deleteTask } = useTasks();
  const { theme, toggleTheme, isDark } = useContext(ThemeContext);

  // Update header colors for dark/light mode
  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: theme.background },
      headerTintColor: theme.text,
    });
  }, [theme]);

  const handleToggle = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleTask(id);
  };

  const handleDelete = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    deleteTask(id);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 12 }}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          item ? (
            <TaskItem
              task={item}
              onToggleComplete={handleToggle}
              onDelete={handleDelete}
              onUpdate={() => navigation.navigate('AddTask', { taskToEdit: item })}
              theme={theme}
            />
          ) : null
        }
      />

      <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
      <View style={styles.buttonContainer}>
        <Button title={isDark ? 'Light Mode' : 'Dark Mode'} onPress={toggleTheme} />
      </View>
    </View>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  buttonContainer: { marginTop: 20 },
});
