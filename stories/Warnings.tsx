import React, {
  useCallback,
  useState,
} from "react";

import {
  Dependency,
  Gantt,
  FixPosition,
  OnArrowDoubleClick,
  OnDateChange,
  OnRelationChange,
  Task,
  TaskOrEmpty,
  OnEditTask,
  OnAddTask,
} from "../src";

import { getTaskFields, initTasks } from "./helper";

import "../dist/index.css";

type AppProps = {
  ganttHeight?: number;
};

export const Warnings: React.FC<AppProps> = (props) => {
  const [tasks, setTasks] = useState<readonly TaskOrEmpty[]>(initTasks());

  const handleTaskChange = useCallback<OnDateChange>((
    task,
    dependentTasks,
    taskIndex,
    parents,
    suggestions,
  ) => {
    const {
      id: taskId,
      comparisonLevel = 1,
    } = task;

    console.log(`On date change Id: ${taskId}`);
    console.log(`On date change level: ${comparisonLevel}`);
    console.log(`On date change index: ${taskIndex}`);
    console.log("Dependent tasks", dependentTasks);
    console.log("Parents", parents);
    console.log("Suggestions", suggestions);

    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[taskIndex] = task;
      return newTasks;
    });
  }, []);

  const handleFixStartPosition = useCallback<FixPosition>((
    task,
    date,
    index,
  ) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[index] = {
        ...task,
        start: date,
      };

      return newTasks;
    });
  }, []);

  const handleFixEndPosition = useCallback<FixPosition>((
    task,
    date,
    index,
  ) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[index] = {
        ...task,
        end: date,
      };

      return newTasks;
    });
  }, []);

  const handleRelationChange = useCallback<OnRelationChange>((
    [taskFrom, targetFrom],
    [taskTo, targetTo],
    isOneDescendant,
  ) => {
    if (isOneDescendant) {
      return;
    }

    if (taskFrom.id === taskTo.id) {
      return;
    }

    const {
      comparisonLevel = 1,
    } = taskFrom;

    setTasks((prevTasks) => prevTasks.map(t => {
      const {
        comparisonLevel: otherComparisonLevel = 1,
      } = t;

      if (otherComparisonLevel !== comparisonLevel) {
        return t;
      }

      const newDependency: Dependency = {
        sourceId: taskFrom.id,
        sourceTarget: targetFrom,
        ownTarget: targetTo,
      };

      if (t.id === taskTo.id) {
        if (t.type === "empty" || !t.dependencies) {
          return {
            ...t,
            dependencies: [newDependency],
          };
        }

        return {
          ...t,
          dependencies: [
            ...t.dependencies.filter(({ sourceId }) => sourceId !== taskFrom.id),
            newDependency,
          ],
        };
      }

      if (t.id === taskFrom.id) {
        if (t.type !== "empty" && t.dependencies) {
          return {
            ...t,
            dependencies: t.dependencies.filter(({ sourceId }) => sourceId !== taskTo.id),
          };
        }
      }

      return t;
    }));
  }, []);

  const onArrowDoubleClick = useCallback<OnArrowDoubleClick>((
    taskFrom,
    taskTo,
  ) => {
    if (window.confirm(`Do yo want to remove relation between ${taskFrom.name} and ${taskTo.name}?`)) {
      const {
        comparisonLevel = 1,
      } = taskFrom;

      setTasks((prevTasks) => prevTasks.map((otherTask) => {
        if (otherTask.type === "empty") {
          return otherTask;
        }

        const {
          dependencies,
          id: otherId,
          comparisonLevel: otherComparisonLevel = 1,
        } = otherTask;

        if (comparisonLevel !== otherComparisonLevel) {
          return otherTask;
        }

        if (otherId === taskFrom.id) {
          if (dependencies) {
            return {
              ...otherTask,
              dependencies: dependencies.filter(({ sourceId }) => sourceId !== taskTo.id),
            };
          }
        }

        if (otherId === taskTo.id) {
          if (dependencies) {
            return {
              ...otherTask,
              dependencies: dependencies.filter(({ sourceId }) => sourceId !== taskFrom.id),
            };
          }
        }

        return otherTask;
      }));
    }
  }, []);

  const handleTaskEdit = useCallback<OnEditTask>((task, index) => {
    const taskFields = getTaskFields({
      name: task.name,
      start: task.type === "empty" ? null : task.start,
      end: task.type === "empty" ? null : task.end,
    });

    const nextTask: TaskOrEmpty = (task.type === "task" || task.type === "empty")
      ? (taskFields.start && taskFields.end)
        ? {
          type: "task",
          start: taskFields.start,
          end: taskFields.end,
          comparisonLevel: task.comparisonLevel,
          id: task.id,
          name: taskFields.name || task.name,
          progress: task.type === "empty"
            ? 0
            : task.progress,
          dependencies: task.type === "empty"
            ? undefined
            : task.dependencies,
          parent: task.parent,
          styles: task.styles,
          isDisabled: task.isDisabled,
        }
        : {
          type: "empty",
          comparisonLevel: task.comparisonLevel,
          id: task.id,
          name: taskFields.name || task.name,
          parent: task.parent,
          styles: task.styles,
          isDisabled: task.isDisabled,
        }
      : {
        ...task,
        name: taskFields.name || task.name,
        start: taskFields.start || task.start,
        end: taskFields.end || task.end,
      };

    setTasks((prevTasks) => {
      const nextTasks = [...prevTasks];
      nextTasks[index] = nextTask;

      return nextTasks;
    });
  }, []);

  const handleTaskAdd = useCallback<OnAddTask>((task, getMetadata) => {
    const taskFields = getTaskFields({
      start: task.start,
      end: task.end,
    });

    const nextTask: TaskOrEmpty = (taskFields.start && taskFields.end)
      ? {
        type: "task",
        start: taskFields.start,
        end: taskFields.end,
        comparisonLevel: task.comparisonLevel,
        id: String(Date.now()),
        name: taskFields.name || "",
        progress: 0,
        parent: task.id,
        styles: task.styles,
      }
      : {
        type: "empty",
        comparisonLevel: task.comparisonLevel,
        id: String(Date.now()),
        name: taskFields.name || "",
        parent: task.id,
        styles: task.styles,
      };

    const [
      dependentTasks,
      taskIndex,
    ] = getMetadata(nextTask);

    setTasks((prevTasks) => {
      const nextTasks = [...prevTasks];

      nextTasks.splice(taskIndex + 1, 0, nextTask);

      return nextTasks;
    });
  }, []);

  const handleTaskDelete = useCallback<OnDateChange>((
    task,
    dependentTasks,
    taskIndex,
    parents,
    suggestions,
  ) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");

    if (conf) {
      setTasks((prevTasks) => {
        const newTasks = [...prevTasks];

        newTasks[taskIndex] = task;

        suggestions.forEach(([start, end, task, index]) => {
          newTasks[index] = {
            ...task,
            start,
            end,
          };
        });

        newTasks.splice(taskIndex, 1);

        return newTasks;
      });
    }
    return conf;
  }, []);

  const handleProgressChange = useCallback(async (task: Task) => {
    const {
      id: taskId,
      comparisonLevel = 1,
    } = task;

    console.log("On progress change Id:" + taskId);

    setTasks((prevTasks) => prevTasks.map((otherTask) => {
      const {
        id: otherId,
        comparisonLevel: otherComparisonLevel = 1,
      } = otherTask;

      if (taskId === otherId && comparisonLevel === otherComparisonLevel) {
        return task;
      }

      return otherTask;
    }));
  }, []);

  const handleDblClick = (task: Task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleClick = (task: Task) => {
    console.log("On Click event Id:" + task.id);
  };

  return (
    <Gantt
      isShowChildOutOfParentWarnings
      isShowDependencyWarnings
      {...props}
      tasks={[...tasks]}
      onDateChange={handleTaskChange}
      onEditTask={handleTaskEdit}
      onAddTask={handleTaskAdd}
      onFixDependencyPosition={handleTaskChange}
      onRelationChange={handleRelationChange}
      onDelete={handleTaskDelete}
      onProgressChange={handleProgressChange}
      onDoubleClick={handleDblClick}
      onClick={handleClick}
      onArrowDoubleClick={onArrowDoubleClick}
      fixStartPosition={handleFixStartPosition}
      fixEndPosition={handleFixEndPosition}
    />
  );
};
