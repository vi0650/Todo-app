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
export class MainComponent implements OnChanges{

  @Input() selectedUser: User | null = null;
  // @Input() deletedUser: User | null = null;

  // Mixed list of tasks for all users
  allTasks: Task[] = [
    { id: 1, userId: 1, title: 'kill Muzan Kibutsuzi', date: '2025-09-23' },
    { id: 1, userId: 2, title: 'kill Upper moon 6', date: '2025-09-29'},
    { id: 1, userId: 3, title: 'kill upper moon 2', date: '2025-09-30'},
  ];

  newTaskTitle = '';
  selectedDate: string = '';

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['deletedUser'] && this.deletedUser) {
    //  this.allTasks = this.allTasks.filter(task => task.userId !== this.deletedUser!.id);
    // }
  }
  
  //getter of users task
  get userTasks(): Task[] {
    if (!this.selectedUser) return [];
    return this.allTasks.filter(task => task.userId === this.selectedUser!.id);
  }

  addTask() {
    if (!this.selectedUser || !this.newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Number(this.allTasks.length + 1),
      userId: this.selectedUser.id,
      title: this.newTaskTitle.trim(),
      date: this.selectedDate
    };
    this.allTasks.push(newTask);
    this.newTaskTitle = '';
    this.selectedDate = '';
    console.log(this.allTasks);
  }

  deleteTask(id: Number) {
    this.allTasks = this.allTasks.filter(task => task.id !== id);
  }
}
