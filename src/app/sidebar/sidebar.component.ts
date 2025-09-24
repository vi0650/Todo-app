import { Component, Output, EventEmitter } from '@angular/core';
import { User } from '../core/models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Output() userSelected = new EventEmitter<User>();
  
  newUserName='';
  
  users:User[] = [{id:'1', name:'Tanjiro'}];
  addUser(){
    const user:User={id:''+(this.users.length+(1)),name:this.newUserName};
    this.users.push(user);
    this.newUserName='';
  }
  
  selectUser(user:User){
    this.userSelected.emit(user);
  }
}
