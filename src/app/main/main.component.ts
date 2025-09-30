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
  completed:boolean=true;
  
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
        { id: '1', userId: '1',  title: 'kill Muzan Kibutsuzi', date: '2025-09-23',completed:this.completed},
        { id: '2', userId: '2',  title: 'kill Upper moon 6', date: '2025-09-29',completed:false},
        { id: '3' , userId:'3' , title: 'kill upper moon 2', date: '2025-09-30',completed:false},
      ];
      this.setTask();
    }
  }

  setTask(){
    localStorage.setItem('allTasks',JSON.stringify(this.allTasks));
  }

  removeTask(){
    localStorage.removeItem('allTasks')
  }

  addTask() {
    if (!this.selectedUser || !this.newTaskTitle.trim()) return;
    const newTask: Task = {
      id: (this.allTasks.length +1).toString(),
      userId: this.selectedUser.id,
      title: this.newTaskTitle.trim(),
      date: this.selectedDate,
      completed: false,
    };
    this.allTasks.push(newTask);
    this.setTask();
    this.newTaskTitle = '';
    this.selectedDate = '';
    console.log(newTask);
  }

  deleteTask(id: string) {
    this.allTasks = this.allTasks.filter(task => task.id !== id);
    this.setTask();
    console.log(id)
  }

  toggleCheck(id:string){
    const task = this.allTasks.find(t => t.id === id);
    if(task){
      this.completed !== this.completed;
    }
    this.setTask();
    console.log(this.completed);
  }
}