import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, Text, View } from 'react-native';
import TaskListScreen from './src/screens/TaskListScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import { TaskProvider } from './src/context/TaskProvider';
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext';

export type RootStackParamList = {
  TaskList: undefined;
  AddTask: { taskToEdit?: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <AppWithNavigation />
      </TaskProvider>
    </ThemeProvider>
  );
}

const AppWithNavigation = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <StatusBar barStyle={theme.background === '#111' ? 'light-content' : 'dark-content'} />
      <Stack.Navigator
        initialRouteName="TaskList"
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerTitleStyle: { fontWeight: '600' },
        }}
      >
        <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'My Tasks' }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Add New Task' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
