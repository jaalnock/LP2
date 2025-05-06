// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// interface Task {
//   id: number;
//   text: string;
// }

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   template: `
//     <div class="container">
//       <h2>To-Do List</h2>
//       <input [(ngModel)]="newTask" placeholder="Add task" (keyup.enter)="addTask()">
//       <button (click)="addTask()">{{ editId ? 'Update' : 'Add' }}</button>
//       <ul>
//         <li *ngFor="let task of tasks">
//           {{ task.text }}
//           <button (click)="editTask(task)">Edit</button>
//           <button (click)="deleteTask(task.id)">Delete</button>
//         </li>
//       </ul>
//     </div>
//   `,
//   styles: [`
//     .container {
//       max-width: 500px;
//       margin: 30px auto;
//       padding: 20px;
//       background: #ffffff;
//       border-radius: 10px;
//       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//       text-align: center;
//       font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//     }
//     h2 {
//       color: #2c3e50;
//       margin-bottom: 20px;
//       font-size: 1.8em;
//       font-weight: 600;
//     }
//     input {
//       width: 70%;
//       padding: 10px;
//       margin: 0 10px 15px 0;
//       border: 2px solid #dfe6e9;
//       border-radius: 6px;
//       font-size: 1em;
//       transition: border-color 0.3s ease;
//     }
//     input:focus {
//       outline: none;
//       border-color: #007bff;
//       box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
//     }
//     button {
//       padding: 10px 16px;
//       border: none;
//       border-radius: 6px;
//       cursor: pointer;
//       font-size: 1em;
//       transition: background-color 0.3s ease, transform 0.1s ease;
//     }
//     button:active {
//       transform: scale(0.95);
//     }
//     button:first-of-type {
//       background: #007bff;
//       color: white;
//     }
//     button:first-of-type:hover {
//       background: #0056b3;
//     }
//     li button:nth-child(1) {
//       background: #28a745;
//       color: white;
//       margin: 0 5px;
//     }
//     li button:nth-child(1):hover {
//       background: #218838;
//     }
//     li button:nth-child(2) {
//       background: #dc3545;
//       color: white;
//     }
//     li button:nth-child(2):hover {
//       background: #c82333;
//     }
//     ul {
//       list-style: none;
//       padding: 0;
//       margin: 0;
//     }
//     li {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       padding: 12px 15px;
//       background: #f8f9fa;
//       border-radius: 6px;
//       margin-bottom: 8px;
//       transition: background-color 0.2s ease;
//     }
//     li:hover {
//       background: #e9ecef;
//     }
//     li span {
//       flex: 1;
//       text-align: left;
//       font-size: 1.1em;
//       color: #2c3e50;
//     }
//     @media (max-width: 600px) {
//       .container {
//         margin: 20px 10px;
//         padding: 15px;
//       }
//       input {
//         width: 65%;
//         margin: 0 5px 10px 0;
//       }
//       button {
//         padding: 8px 12px;
//         font-size: 0.9em;
//       }
//     }
//   `]
// })
// export class AppComponent implements OnInit {
//   tasks: Task[] = [];
//   newTask: string = '';
//   editId: number | null = null;

//   ngOnInit() {
//     const tasks = localStorage.getItem('tasks');
//     if (tasks) this.tasks = JSON.parse(tasks);
//   }

//   addTask() {
//     if (!this.newTask.trim()) return;
//     if (this.editId) {
//       const task = this.tasks.find(t => t.id === this.editId);
//       if (task) task.text = this.newTask.trim();
//       this.editId = null;
//     } else {
//       this.tasks.push({ id: Date.now(), text: this.newTask.trim() });
//     }
//     this.newTask = '';
//     localStorage.setItem('tasks', JSON.stringify(this.tasks));
//   }

//   editTask(task: Task) {
//     this.newTask = task.text;
//     this.editId = task.id;
//   }

//   deleteTask(id: number) {
//     this.tasks = this.tasks.filter(task => task.id !== id);
//     localStorage.setItem('tasks', JSON.stringify(this.tasks));
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Task {
  id: number;
  text: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>To-Do List</h2>
      <input [(ngModel)]="newTask" placeholder="Add task" (keyup.enter)="addTask()">
      <button (click)="addTask()">{{ editId ? 'Update' : 'Add' }}</button>
      <ul>
        <li *ngFor="let task of tasks">
          {{ task.text }}
          <button (click)="editTask(task)">Edit</button>
          <button (click)="deleteTask(task.id)">Delete</button>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .container {
      max-width: 400px;
      margin: 20px auto;
      text-align: center;
    }
    h2 {
      color: #333;
    }
    input {
      width: 70%;
      padding: 8px;
      margin: 10px 5px;
      border: 1px solid #ccc;
    }
    button {
      padding: 8px;
      background: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background: #0056b3;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      display: flex;
      justify-content: space-between;
      padding: 8px;
      border-bottom: 1px solid #eee;
    }
  `]
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  newTask: string = '';
  editId: number | null = null;

  ngOnInit() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) this.tasks = JSON.parse(tasks);
  }

  addTask() {
    if (!this.newTask.trim()) return;
    if (this.editId) {
      const task = this.tasks.find(t => t.id === this.editId);
      if (task) task.text = this.newTask.trim();
      this.editId = null;
    } else {
      this.tasks.push({ id: Date.now(), text: this.newTask.trim() });
    }
    this.newTask = '';
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  editTask(task: Task) {
    this.newTask = task.text;
    this.editId = task.id;
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}