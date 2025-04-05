import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <input
          type="checkbox"
          className="form-check-input me-2"
          checked={todo.completed}
          onChange={(e) => onToggle(todo.id, e.target.checked)}
        />
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
      </div>
      <button className="btn btn-danger btn-sm" onClick={() => onDelete(todo.id)}>
        Hapus
      </button>
    </li>
  );
}

export default TodoItem;
