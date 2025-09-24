import { Component} from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MainComponent } from '../main/main.component';
import { CommonModule } from '@angular/common';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-layout',
  imports: [SidebarComponent,MainComponent,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  selectedUser: User | null = null;

  defaultUser:any = this.selectedUser;

  onUserSelected(user:User){
    this.defaultUser=user;
  }
}
