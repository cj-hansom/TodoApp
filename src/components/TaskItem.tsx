import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { Task } from '../types/Task';

interface Props {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (task: Task) => void;
  theme: { background: string; text: string; border: string; button: string };
}

const TaskItem: React.FC<Props> = ({ task, onToggleComplete, onDelete, onUpdate, theme }) => {
  if (!task) return null;

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleComplete = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
    ]).start();

    onToggleComplete(task.id);
  };

  const backgroundColor = task.completed
    ? '#46a946ff'
    : task.dueDate && new Date(task.dueDate) < new Date()
    ? '#ff6b6b'
    : theme.background;

  return (
    <Animated.View
      style={[
        styles.container,
        { borderColor: theme.border, backgroundColor, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        style={styles.touchable}
        onLongPress={handleComplete} // Hold to mark complete
        delayLongPress={500}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.title,
            { color: theme.text, textDecorationLine: task.completed ? 'line-through' : 'none' },
          ]}
        >
          {task.title}
        </Text>
        {task.description ? (
          <Text
            style={[
              styles.description,
              { color: theme.text, textDecorationLine: task.completed ? 'line-through' : 'none' },
            ]}
          >
            {task.description}
          </Text>
        ) : null}
        {task.dueDate && <Text style={[styles.dueDate, { color: theme.text }]}>Due: {task.dueDate}</Text>}
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onUpdate(task)} style={styles.actionButton}>
          <Text style={[styles.actionText, { color: 'blue' }]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.actionButton}>
          <Text style={[styles.actionText, { color: 'red' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderRadius: 8,
    marginVertical: 4,
  },
  touchable: { flex: 1 },
  title: { fontSize: 16, fontWeight: '500' },
  description: { fontSize: 12, color: 'grey', marginTop: 2 },
  dueDate: { fontSize: 12, marginTop: 4, fontStyle: 'italic' },
  actions: { flexDirection: 'row', marginTop: 8, justifyContent: 'flex-end', width: '50%', alignSelf: 'flex-end' },
  actionButton: { marginLeft: 12 },
  actionText: { fontSize: 14, fontWeight: '500' },
});
