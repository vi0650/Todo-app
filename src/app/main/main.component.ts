import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class MainComponent implements OnInit, OnChanges {

  @Input() selectedUser: User | null = null;
  @Input() deletedUserId: string | null = null;

  ngOnInit(): void {
    this.getTask();
  }

  // Mixed list of tasks for all users
  allTasks: Task[] = [];
  newTaskTitle = '';
  selectedDate: string = '';
  completed: boolean = false;

  //getter of users task

  getTask() {
    const userTask = localStorage.getItem('allTasks')
    if (userTask) {
      this.allTasks = JSON.parse(userTask);
    } else {
      this.allTasks = [
        { id: '1', userId: '1', title: 'walking', date: '2025-09-23', completed: this.completed },
        { id: '2', userId: '2', title: 'running', date: '2025-09-29', completed: this.completed },
        { id: '3', userId: '3', title: 'swimming', date: '2025-09-30', completed: this.completed },
      ];
      this.setTask();
    }
  }

  setTask() {
    localStorage.setItem('allTasks', JSON.stringify(this.allTasks));
  }

  get userTasks(): Task[] {
    const selectedId = this.selectedUser?.id;
    if (!selectedId) {
      return this.allTasks;
    }
    return this.allTasks.filter(task => task.userId === selectedId);
  }

  addTask() {
    if (!this.selectedUser || !this.newTaskTitle.trim()) return;
    const newTask: Task = {
      id: (this.allTasks.length + 1).toString(),
      userId: this.selectedUser.id,
      title: this.newTaskTitle.trim(),
      date: this.selectedDate,
      completed: this.completed,
    };
    this.allTasks.push(newTask);
    this.setTask();
    this.newTaskTitle = '';
    this.selectedDate = '';
  }

  deleteTask(id: string) {
    this.allTasks = this.allTasks.filter(task => task.id !== id);
    this.setTask();
  }

  toggleCheck(id: string) {
    const task = this.allTasks.find(t => t.id === id);
    if (task) {
      task.completed == !task.completed;
      this.setTask();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deletedUserId'] && this.deletedUserId) {
      const beforeCount = this.allTasks.length;
      this.allTasks = this.allTasks.filter(t => t.userId !== this.deletedUserId);
      if (this.allTasks.length !== beforeCount) {
        this.setTask();
      }
    }
  }
}