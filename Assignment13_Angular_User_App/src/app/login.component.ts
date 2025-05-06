import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  email: string;
  password: string;
}

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="form-container">
      <h3>Login</h3>
      <form (ngSubmit)="login()">
        <input [(ngModel)]="user.email" name="email" type="email" placeholder="Email" required>
        <input [(ngModel)]="user.password" name="password" type="password" placeholder="Password" required>
        <button type="submit">Login</button>
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
      background: #28a745;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1em;
    }
    button:hover {
      background: #218838;
    }
    @media (max-width: 600px) {
      .form-container {
        margin: 10px;
        padding: 15px;
      }
    }
  `]
})
export class LoginComponent {
  user: User = { email: '', password: '' };
  constructor(private router: Router) {}

  login() {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === this.user.email && u.password === this.user.password);
    if (foundUser) {
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      this.user = { email: '', password: '' };
      this.router.navigate(['/profile']);
    } else {
      alert('Invalid email or password');
    }
  }
}