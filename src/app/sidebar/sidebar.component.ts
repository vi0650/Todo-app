import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../core/models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  @Output() userSelected = new EventEmitter<User>();
  @Output() userDeleted = new EventEmitter<string>();

  ngOnInit(): void {
    this.getUserData();
  }
  newUserName = '';
  users: User[] = [];

  getUserData() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
      console.log('data from localstorage');
    } else {
      this.users = [{ id: '1', name: 'user-1' }, { id: '2', name: 'user-2' }, { id: '3', name: 'user-3' }];
      this.setUserData();
    }
  }
  setUserData() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
  addUser() {
    const user: User = { id: (this.users.length + 1).toString(), name: this.newUserName };
    this.users.push(user);
    this.setUserData();
    this.newUserName = '';
  }
  selectUser(user: User) {
    this.userSelected.emit(user);
  }
  wipeUser(id: string) {
    this.users = this.users.filter(user => user.id !== id);
    this.setUserData();
    this.userDeleted.emit(id);
  }
  image = '/public/favicon.ico';
}