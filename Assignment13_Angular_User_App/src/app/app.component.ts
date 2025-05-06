import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div class="container">
      <h2>User Management</h2>
      <nav>
        <a routerLink="/register">Register</a>
        <a routerLink="/login">Login</a>
        <a routerLink="/profile">Profile</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container {
      max-width: 500px;
      margin: 30px auto;
      padding: 20px;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    h2 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 1.8em;
    }
    nav {
      margin-bottom: 20px;
    }
    nav a {
      margin: 0 10px;
      color: #007bff;
      text-decoration: none;
      font-size: 1.1em;
    }
    nav a:hover {
      color: #0056b3;
      text-decoration: underline;
    }
    @media (max-width: 600px) {
      .container {
        margin: 20px 10px;
        padding: 15px;
      }
    }
  `]
})
export class AppComponent {}