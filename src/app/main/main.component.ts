import { Component, Input, OnInit} from '@angular/core';
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
export class MainComponent implements OnInit{

  @Input() selectedUser: User | null = null;

  ngOnInit(): void {
    this.getTask();
    console.log(this.allTasks);
  }

  // Mixed list of tasks for all users
  allTasks: Task[] = [];

  newTaskTitle = '';
  selectedDate: string = '';
  
  //getter of users task
  get userTasks(): Task[] {
    if (!this.selectedUser) return [];
    return this.allTasks.filter(task => task.userId === this.selectedUser!.id);    
  }

  getTask(){
    const userTask = localStorage.getItem('allTasks')
    if(userTask){
      this.allTasks = JSON.parse(userTask);
    }else{
      this.allTasks = [
        { id: 1, userId: 1, title: 'kill Muzan Kibutsuzi', date: '2025-09-23' },
        { id: 1, userId: 2, title: 'kill Upper moon 6', date: '2025-09-29'},
        { id: 1, userId: 3, title: 'kill upper moon 2', date: '2025-09-30'},
      ];
      this.setTask();
    }
  }

  setTask(){
    localStorage.setItem('allTasks',JSON.stringify(this.allTasks));
  }

  addTask() {
    if (!this.selectedUser || !this.newTaskTitle.trim()) return;
    const newTask: Task = {
      id: (this.allTasks.length + 1),
      userId: this.selectedUser.id,
      title: this.newTaskTitle.trim(),
      date: this.selectedDate
    };
    this.allTasks.push(newTask);
    this.setTask();
    this.newTaskTitle = '';
    this.selectedDate = '';
    console.log(newTask);
  }

  deleteTask(id: Number) {
    this.allTasks = this.allTasks.filter(task => task.id !== id);
    console.log(id)
  }
}
