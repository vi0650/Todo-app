import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../core/models/user.model';
import { CommonModule } from '@angular/common';
import { Task } from '../core/models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  imports: [CommonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnChanges {

  @Input() defaultUser: User | null = null;

  // Mixed list of tasks for all users
  allTasks: Task[] = [
    { id: '1', userId: '1', title: 'kill Akuza', date: '2025-09-23', completed: false }
  ];

  newTaskTitle = '';
  selectedDate: string = '';

  //getter of users task
  get userTasks(): Task[] {
    if (!this.defaultUser) return [];
    return this.allTasks.filter(task => task.userId === this.defaultUser!.id);
  }

  ngOnChanges(_changes: SimpleChanges) {
    // No-op: userTasks getter derives from defaultUser and allTasks
  }

  addTask() {
    if (!this.defaultUser || !this.newTaskTitle.trim()) return;
    const newTask: Task = {
      id: String(this.allTasks.length + 1),
      userId: this.defaultUser.id,
      title: this.newTaskTitle.trim(),
      date: this.selectedDate,
      completed: false
    };
    this.allTasks.push(newTask);
    this.newTaskTitle = '';
    this.selectedDate = '';
  }

  deleteTask(id: string) {
    this.allTasks = this.allTasks.filter(task => task.id !== id);
  }
}
