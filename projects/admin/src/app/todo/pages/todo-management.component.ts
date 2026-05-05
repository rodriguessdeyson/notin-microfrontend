import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatusSummaryComponent } from '../../status/components/status-summary/status-summary.component';
import { TodoDraft, TodoItem } from '../models/todo.models';
import { TodoStore } from '../stores/todo.store';

@Component({
  selector: 'app-todo-management',
  imports: [FormsModule, NgClass, StatusSummaryComponent],
  templateUrl: './todo-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoManagementComponent {
  protected readonly store = inject(TodoStore);

  protected draft: TodoDraft = {
    title: '',
    assignee: 'Maria',
    priority: 'medium',
    dueDate: '2026-04-11',
  };

  protected addTodo(): void {
    const wasAdded = this.store.addTodo(this.draft);

    if (!wasAdded) {
      return;
    }

    this.draft = {
      ...this.draft,
      title: '',
    };
  }

  protected labelForStatus(status: TodoItem['status']): string {
    if (status === 'in-progress') {
      return 'In Progress';
    }

    return status === 'done' ? 'Completed' : 'To Do';
  }

  protected priorityLabel(priority: TodoItem['priority']): string {
    if (priority === 'high') {
      return 'high';
    }

    if (priority === 'medium') {
      return 'medium';
    }

    return 'low';
  }
}
