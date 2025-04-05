import React, { useEffect, useState } from 'react';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const fetchTodos = async () => {
    const res = await fetch('https://romantic-precious-jupiter.glitch.me/api/todos');
    const data = await res.json();
    setTodos(data);
  };
  
  const addTodo = async () => {
    if (!text) return;
    const res = await fetch('https://romantic-precious-jupiter.glitch.me/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setText('');
  };
  
  const toggleComplete = async (id, completed) => {
    await fetch(`https://romantic-precious-jupiter.glitch.me/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
    fetchTodos();
  };
  
  const deleteTodo = async (id) => {
    await fetch(`https://romantic-precious-jupiter.glitch.me/api/todos/${id}`, {
      method: 'DELETE',
    });
    fetchTodos();
  };
  
  return (
    <div className="container mt-5">
      <h1 className="text-center">To-Do List</h1>
      <div className="input-group mb-3">
        <input
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tambah tugas baru..."
        />
        <button className="btn btn-primary" onClick={addTodo}>Tambah</button>
      </div>
      <ul className="list-group">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={toggleComplete} onDelete={deleteTodo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
