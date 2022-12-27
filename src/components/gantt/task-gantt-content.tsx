import React, {
  Fragment,
  useCallback,
} from "react";

import {
  ChangeInProgress,
  ChildMapByLevel,
  ChildOutOfParentWarnings,
  CriticalPaths,
  DependencyMap,
  DependencyMargins,
  DependentMap,
  EventOption,
  FixPosition,
  MapTaskToCoordinates,
  MapTaskToGlobalIndex,
  MapTaskToRowIndex,
  OnArrowDoubleClick,
  Task,
  TaskBarColorStyles,
  TaskMapByLevel,
  TaskOrEmpty,
} from "../../types/public-types";
import { Arrow } from "../other/arrow";
import { RelationLine } from "../other/relation-line";
import { TaskItem } from "../task-item/task-item";
import {
  BarMoveAction,
  GanttRelationEvent,
  RelationMoveTarget,
} from "../../types/gantt-task-actions";
import { getMapTaskToCoordinatesOnLevel } from "../../helpers/get-task-coordinates";
import { getChangeTaskMetadata } from "../../helpers/get-change-task-metadata";

export type TaskGanttContentProps = {
  visibleTasks: readonly TaskOrEmpty[];
  visibleTasksMirror: Readonly<Record<string, true>>;
  childTasksMap: ChildMapByLevel;
  tasksMap: TaskMapByLevel;
  mapTaskToGlobalIndex: MapTaskToGlobalIndex;
  mapTaskToRowIndex: MapTaskToRowIndex;
  mapTaskToCoordinates: MapTaskToCoordinates;
  childOutOfParentWarnings: ChildOutOfParentWarnings;
  dependencyMap: DependencyMap;
  dependentMap: DependentMap;
  dependencyMarginsMap: DependencyMargins;
  isShowDependencyWarnings: boolean;
  cirticalPaths: CriticalPaths;
  ganttRelationEvent: GanttRelationEvent | null;
  selectedTask: Task | null;
  fullRowHeight: number;
  handleWidth: number;
  svgWidth: number;
  taskHeight: number;
  taskHalfHeight: number;
  relationCircleOffset: number;
  relationCircleRadius: number;
  taskWarningOffset: number;
  arrowColor: string;
  arrowCriticalColor: string;
  arrowWarningColor: string;
  arrowIndent: number;
  barCornerRadius: number;
  dependencyFixWidth: number;
  dependencyFixHeight: number;
  dependencyFixIndent: number;
  fontSize: string;
  fontFamily: string;
  rtl: boolean;
  changeInProgress: ChangeInProgress | null;
  handleTaskDragStart: (
    action: BarMoveAction,
    task: Task, event: React.MouseEvent<Element, MouseEvent>,
  ) => void;
  setTooltipTask: (task: Task | null) => void;
  handleBarRelationStart: (target: RelationMoveTarget, task: Task) => void;
  setSelectedTask: (task: Task | null) => void;
  handleDeteleTask: (task: TaskOrEmpty) => void;
  onArrowDoubleClick?: OnArrowDoubleClick;
  comparisonLevels: number;
  fixStartPosition?: FixPosition;
  fixEndPosition?: FixPosition;
  colorStyles: TaskBarColorStyles;
} & EventOption;

export const TaskGanttContent: React.FC<TaskGanttContentProps> = ({
  visibleTasks,
  visibleTasksMirror,
  childTasksMap,
  tasksMap,
  mapTaskToGlobalIndex,
  mapTaskToRowIndex,
  mapTaskToCoordinates,
  childOutOfParentWarnings,
  dependencyMap,
  dependentMap,
  dependencyMarginsMap,
  isShowDependencyWarnings,
  cirticalPaths,
  ganttRelationEvent,
  selectedTask,
  fullRowHeight,
  handleWidth,
  taskHeight,
  taskHalfHeight,
  relationCircleOffset,
  relationCircleRadius,
  taskWarningOffset,
  arrowColor,
  arrowCriticalColor,
  arrowWarningColor,
  arrowIndent,
  barCornerRadius,
  dependencyFixWidth,
  dependencyFixHeight,
  dependencyFixIndent,
  fontFamily,
  fontSize,
  rtl,
  changeInProgress,
  handleTaskDragStart,
  setTooltipTask,
  handleBarRelationStart,
  setSelectedTask,
  handleDeteleTask,
  onDateChange = undefined,
  onFixDependencyPosition = undefined,
  onRelationChange,
  onProgressChange,
  onDoubleClick,
  onClick,
  onArrowDoubleClick = undefined,
  comparisonLevels,
  fixStartPosition = undefined,
  fixEndPosition = undefined,
  colorStyles,
}) => {
  const handleFixDependency = useCallback((task: Task, delta: number) => {
    if (!onFixDependencyPosition) {
      return;
    }

    const {
      start,
      end,
    } = task;

    const newStart = new Date(start.getTime() + delta);
    const newEnd = new Date(end.getTime() + delta);

    const newChangedTask = {
      ...task,
      start: newStart,
      end: newEnd,
    };

    const [
      dependentTasks,
      taskIndex,
      parents,
      suggestions,
    ] = getChangeTaskMetadata(
      {
        type: "change",
        task: newChangedTask,
      },
      tasksMap,
      childTasksMap,
      mapTaskToGlobalIndex,
      dependentMap,
    );

    onFixDependencyPosition(
      newChangedTask,
      dependentTasks,
      taskIndex,
      parents,
      suggestions,
    );
  }, [
    onFixDependencyPosition,
    tasksMap,
    childTasksMap,
    mapTaskToGlobalIndex,
    dependentMap,
  ]);

  return (
    <g className="content">
      <g className="arrows" fill={arrowColor} stroke={arrowColor}>
        {visibleTasks.map(task => {
          const {
            id: taskId,
            comparisonLevel = 1,
          } = task;

          if (task.type === "empty" || comparisonLevel > comparisonLevels) {
            return (
              <Fragment
                key={`${taskId}_${comparisonLevel}`}
              />
            );
          }

          const dependenciesByLevel = dependencyMap.get(comparisonLevel);
          const marginsByLevel = dependencyMarginsMap.get(comparisonLevel);

          if (!dependenciesByLevel) {
            return (
              <Fragment
                key={`${taskId}_${comparisonLevel}`}
              />
            );
          }

          const dependenciesByTask = dependenciesByLevel.get(taskId);

          if (!dependenciesByTask) {
            return (
              <Fragment
                key={`${taskId}_${comparisonLevel}`}
              />
            );
          }

          const mapTaskToCoordinatesOnLevel = getMapTaskToCoordinatesOnLevel(
            task,
            mapTaskToCoordinates,
          );

          const mapTaskRowIndexByLevel = mapTaskToRowIndex.get(comparisonLevel);

          if (!mapTaskRowIndexByLevel) {
            throw new Error(`Row indexes are not found for level ${comparisonLevel}`);
          }

          const criticalPathOnLevel = cirticalPaths.get(comparisonLevel);

          const criticalPathForTask = criticalPathOnLevel
            ? criticalPathOnLevel.dependencies.get(task.id)
            : undefined;

          return dependenciesByTask
            .filter(({ source }) => visibleTasksMirror[source.id])
            .map(({
              ownTarget,
              source,
              sourceTarget,
            }) => {
              const isCritical = criticalPathForTask
                ? criticalPathForTask.has(source.id)
                : false;

              return (
                <Arrow
                  key={`Arrow from ${taskId} to ${source.id} on ${comparisonLevel}`}
                  taskFrom={source}
                  targetFrom={sourceTarget}
                  taskTo={task}
                  targetTo={ownTarget}
                  marginsByTask={marginsByLevel ? marginsByLevel.get(task.id) : undefined}
                  mapTaskToCoordinatesOnLevel={mapTaskToCoordinatesOnLevel}
                  mapTaskRowIndexByLevel={mapTaskRowIndexByLevel}
                  fullRowHeight={fullRowHeight}
                  taskHeight={taskHeight}
                  arrowIndent={arrowIndent}
                  dependencyFixWidth={dependencyFixWidth}
                  dependencyFixHeight={dependencyFixHeight}
                  dependencyFixIndent={dependencyFixIndent}
                  arrowColor={arrowColor}
                  arrowWarningColor={arrowWarningColor}
                  arrowCriticalColor={arrowCriticalColor}
                  isShowDependencyWarnings={isShowDependencyWarnings}
                  isCritical={isCritical}
                  rtl={rtl}
                  onArrowDoubleClick={onArrowDoubleClick}
                  handleFixDependency={handleFixDependency}
                />
              );
          });
        })}
      </g>

      <g className="bar" fontFamily={fontFamily} fontSize={fontSize}>
        {visibleTasks.map(task => {
          const {
            comparisonLevel = 1,
          } = task;

          const key = `${comparisonLevel}_${task.id}`;

          if (task.type === "empty" || comparisonLevel > comparisonLevels) {
            return (
              <Fragment
                key={key}
              />
            );
          }

          const criticalPathOnLevel = cirticalPaths.get(comparisonLevel);

          const isCritical = criticalPathOnLevel
            ? criticalPathOnLevel.tasks.has(task.id)
            : false;

          return (
            <TaskItem
              task={task}
              childTasksMap={childTasksMap}
              childOutOfParentWarnings={childOutOfParentWarnings}
              dependencyMarginsMap={dependencyMarginsMap}
              isShowDependencyWarnings={isShowDependencyWarnings}
              mapTaskToGlobalIndex={mapTaskToGlobalIndex}
              mapTaskToCoordinates={mapTaskToCoordinates}
              arrowIndent={arrowIndent}
              barCornerRadius={barCornerRadius}
              handleWidth={handleWidth}
              taskHeight={taskHeight}
              taskHalfHeight={taskHalfHeight}
              relationCircleOffset={relationCircleOffset}
              relationCircleRadius={relationCircleRadius}
              taskWarningOffset={taskWarningOffset}
              isRelationDrawMode={Boolean(ganttRelationEvent)}
              isProgressChangeable={!!onProgressChange && !task.isDisabled}
              isDateChangeable={!!onDateChange && !task.isDisabled}
              isRelationChangeable={!!onRelationChange && !task.isDisabled}
              isDelete={!task.isDisabled}
              onDoubleClick={onDoubleClick}
              onClick={onClick}
              onEventStart={handleTaskDragStart}
              setTooltipTask={setTooltipTask}
              onRelationStart={handleBarRelationStart}
              setSelectedTask={setSelectedTask}
              isSelected={selectedTask === task}
              isCritical={isCritical}
              rtl={rtl}
              changeInProgress={changeInProgress}
              fixStartPosition={fixStartPosition}
              fixEndPosition={fixEndPosition}
              handleDeteleTask={handleDeteleTask}
              colorStyles={colorStyles}
              key={key}
            />
          );
        })}
      </g>

      {ganttRelationEvent && (
        <RelationLine
          x1={ganttRelationEvent.startX}
          x2={ganttRelationEvent.endX}
          y1={ganttRelationEvent.startY}
          y2={ganttRelationEvent.endY}
        />
      )}
    </g>
  );
};
