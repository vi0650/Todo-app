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
      this.users = [{ id: 1, name: 'Tanjiro' }, { id: 2, name: 'Zenitsu' }, { id: 3, name: 'Inosuke' }];
      this.setUserData();
      console.log('dummy data');
    }
  }

  setUserData() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  addUser() {
    const user: User = { id: (this.users.length + 1), name: this.newUserName };
    this.users.push(user);
    this.setUserData();
    this.newUserName = '';
    console.log(this.users);
  }

  selectUser(user: User) {
    this.userSelected.emit(user);
    console.log(user);
  }
}
