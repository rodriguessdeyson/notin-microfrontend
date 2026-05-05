import { Injectable, computed, signal } from '@angular/core';
import { TodoDraft, TodoItem, TodoStatus } from '../models/todo.models';

const initialTodos: TodoItem[] = [
  {
    id: 1,
    title: 'Align backlog labels across teams',
    assignee: 'Ana',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-04-08',
  },
  {
    id: 2,
    title: 'Publish shell release notes',
    assignee: 'Caio',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-04-10',
  },
  {
    id: 3,
    title: 'Archive completed sprint stories',
    assignee: 'Rafa',
    status: 'done',
    priority: 'low',
    dueDate: '2026-04-03',
  },
  {
    id: 4,
    title: 'Prepare QA handoff checklist',
    assignee: 'Lia',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-04-07',
  },
];

@Injectable({ providedIn: 'root' })
export class TodoStore {
  private readonly nextId = signal(initialTodos.length + 1);

  readonly todos = signal<TodoItem[]>(initialTodos);

  readonly summary = computed(() => {
    const todos = this.todos();
    const completed = todos.filter((todo) => todo.status === 'done').length;
    const inProgress = todos.filter((todo) => todo.status === 'in-progress').length;
    const overdue = todos.filter((todo) => this.isOverdue(todo)).length;
    const highPriority = todos.filter((todo) => todo.priority === 'high').length;

    return {
      total: todos.length,
      completed,
      inProgress,
      open: todos.length - completed,
      overdue,
      highPriority,
      completionRate: todos.length === 0 ? 0 : Math.round((completed / todos.length) * 100),
    };
  });

  addTodo(draft: TodoDraft): boolean {
    const title = draft.title.trim();

    if (!title) {
      return false;
    }

    const todo: TodoItem = {
      id: this.nextId(),
      title,
      assignee: draft.assignee.trim() || 'Nao atribuido',
      status: 'todo',
      priority: draft.priority,
      dueDate: draft.dueDate,
    };

    this.todos.update((items) => [todo, ...items]);
    this.nextId.update((current) => current + 1);

    return true;
  }

  cycleStatus(id: number): void {
    this.todos.update((items) =>
      items.map((todo) =>
        todo.id === id ? { ...todo, status: this.nextStatus(todo.status) } : todo,
      ),
    );
  }

  removeTodo(id: number): void {
    this.todos.update((items) => items.filter((todo) => todo.id !== id));
  }

  private nextStatus(status: TodoStatus): TodoStatus {
    if (status === 'todo') {
      return 'in-progress';
    }

    if (status === 'in-progress') {
      return 'done';
    }

    return 'todo';
  }

  private isOverdue(todo: TodoItem): boolean {
    if (todo.status === 'done') {
      return false;
    }

    const now = new Date().setHours(0, 0, 0, 0);
    const dueDate = new Date(todo.dueDate).setHours(0, 0, 0, 0);

    return dueDate < now;
  }
}
