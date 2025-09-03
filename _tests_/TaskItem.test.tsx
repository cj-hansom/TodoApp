import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TaskItem from '../src/Components/TaskItem';
import { Task } from '../src/types/Task';

const mockTheme = { background: '#fff', text: '#000', border: '#ccc', button: '#ddd' };

describe('TaskItem', () => {
  const task: Task = { id: '1', title: 'Task 1', completed: false };

  it('renders correctly', () => {
    const { getByText } = render(
      <TaskItem
        task={task}
        onToggleComplete={() => {}}
        onDelete={() => {}}
        onUpdate={() => {}}
        theme={mockTheme}
      />
    );
    expect(getByText('Task 1')).toBeTruthy();
  });

  it('calls toggle on long press', () => {
    const toggleMock = jest.fn();
    const { getByText } = render(
      <TaskItem
        task={task}
        onToggleComplete={toggleMock}
        onDelete={() => {}}
        onUpdate={() => {}}
        theme={mockTheme}
      />
    );

    fireEvent(getByText('Task 1'), 'onLongPress');
    expect(toggleMock).toHaveBeenCalledWith('1');
  });

  it('calls delete on delete press', () => {
    const deleteMock = jest.fn();
    const { getByText } = render(
      <TaskItem
        task={task}
        onToggleComplete={() => {}}
        onDelete={deleteMock}
        onUpdate={() => {}}
        theme={mockTheme}
      />
    );

    fireEvent.press(getByText('Delete'));
    expect(deleteMock).toHaveBeenCalledWith('1');
  });
});
