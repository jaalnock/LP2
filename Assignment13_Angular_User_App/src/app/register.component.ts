import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  username: string;
  email: string;
  password: string;
}

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="form-container">
      <h3>Register</h3>
      <form (ngSubmit)="register()">
        <input [(ngModel)]="user.username" name="username" placeholder="Username" required>
        <input [(ngModel)]="user.email" name="email" type="email" placeholder="Email" required>
        <input [(ngModel)]="user.password" name="password" type="password" placeholder="Password" required>
        <button type="submit">Register</button>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 400px;
      margin: 20px auto;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    h3 {
      color: #2c3e50;
      text-align: center;
      margin-bottom: 20px;
    }
    input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 2px solid #dfe6e9;
      border-radius: 6px;
      font-size: 1em;
    }
    input:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
    }
    button {
      width: 100%;
      padding: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1em;
    }
    button:hover {
      background: #0056b3;
    }
    @media (max-width: 600px) {
      .form-container {
        margin: 10px;
        padding: 15px;
      }
    }
  `]
})
export class RegisterComponent {
  user: User = { username: '', email: '', password: '' };
  constructor(private router: Router) {}

  register() {
    if (this.user.username && this.user.email && this.user.password) {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some(u => u.email === this.user.email)) {
        alert('Email already registered');
        return;
      }
      users.push(this.user);
      localStorage.setItem('users', JSON.stringify(users));
      this.user = { username: '', email: '', password: '' };
      this.router.navigate(['/login']);
    }
  }
}