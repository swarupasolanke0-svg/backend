import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnChanges {
  @Input() taskToEdit: Task | null = null;
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  formModel: Task = { title: '', description: '', status: 'pending' };

  ngOnChanges(): void {
    this.formModel = this.taskToEdit
      ? { ...this.taskToEdit }
      : { title: '', description: '', status: 'pending' };
  }

  onSubmit(): void {
    if (!this.formModel.title.trim()) return;
    this.save.emit(this.formModel);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
