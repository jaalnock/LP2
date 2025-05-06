import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  username: string;
  email: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <h3>User Profile</h3>
      <div *ngIf="user; else noUser">
        <p><strong>Username:</strong> {{ user?.username }}</p>
        <p><strong>Email:</strong> {{ user?.email }}</p>
      </div>
      <ng-template #noUser>
        <p>No user logged in</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 400px;
      margin: 20px auto;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      text-align: center;
    }
    h3 {
      color: #2c3e50;
      margin-bottom: 20px;
    }
    p {
      font-size: 1.1em;
      color: #2c3e50;
      margin: 10px 0;
    }
    strong {
      color: #007bff;
    }
    @media (max-width: 600px) {
      .profile-container {
        margin: 10px;
        padding: 15px;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) this.user = JSON.parse(currentUser);
  }
}