import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  taskToEdit: Task | null = null;
  loading = false;
  errorMessage = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Could not load tasks. Is the backend running?';
        this.loading = false;
      }
    });
  }

  onSave(task: Task): void {
    if (this.taskToEdit && this.taskToEdit._id) {
      this.taskService.updateTask(this.taskToEdit._id, task).subscribe(() => {
        this.taskToEdit = null;
        this.loadTasks();
      });
    } else {
      this.taskService.createTask(task).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  onEdit(task: Task): void {
    this.taskToEdit = task;
  }

  onCancelEdit(): void {
    this.taskToEdit = null;
  }

  onDelete(id: string | undefined): void {
    if (!id) return;
    if (!confirm('Delete this task?')) return;
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }
}
