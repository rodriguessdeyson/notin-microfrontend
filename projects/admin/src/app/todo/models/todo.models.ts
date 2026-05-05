export type TodoStatus = 'todo' | 'in-progress' | 'done';
export type TodoPriority = 'low' | 'medium' | 'high';

export interface TodoItem {
  id: number;
  title: string;
  assignee: string;
  status: TodoStatus;
  priority: TodoPriority;
  dueDate: string;
}

export interface TodoDraft {
  title: string;
  assignee: string;
  priority: TodoPriority;
  dueDate: string;
}
