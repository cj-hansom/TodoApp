import React from "react";
import { renderHook, act } from '@testing-library/react-native';
import { TaskProvider, useTasks } from "../src/context/TaskProvider";

describe("TaskProvider", () => {
  it("adds a task", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TaskProvider>{children}</TaskProvider>
    );

    const { result } = renderHook(() => useTasks(), { wrapper });

    act(() => {
      result.current.addTask({
        id: "1",
        title: "Test Task",
        description: "testing",
        dueDate: "2025-09-01",
        completed: false,
      });
    });

    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].title).toBe("Test Task");
  });
});
