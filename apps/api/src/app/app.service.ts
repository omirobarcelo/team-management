import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  todos: { title: string }[] = [{ title: 'Todo 1' }, { title: 'Todo 2' }];

  getData(): { title: string }[] {
    return this.todos;
  }

  addTodo() {
    this.todos.push({
      title: `New todo ${Math.floor(Math.random() * 1000)}`
    });
  }
}
