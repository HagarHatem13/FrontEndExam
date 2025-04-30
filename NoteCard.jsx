import React from 'react';
import { format } from 'date-fns';

const NoteCard = ({ note, onEdit, onDelete, onToggleComplete }) => (
  <div className="border p-4 rounded shadow relative">
    <span className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full ${note.category === 'Personal' ? 'bg-yellow-200' : note.category === 'Home' ? 'bg-green-200' : 'bg-purple-200'}`}>
      {note.category}
    </span>

    <input
      type="checkbox"
      className="absolute top-2 right-2"
      checked={note.completed}
      onChange={onToggleComplete}
    />

    <h3 className={`text-lg font-bold ${note.completed ? 'line-through text-gray-500' : ''}`}>
      {note.title}
    </h3>

    <p className={`text-sm mt-1 ${note.completed ? 'line-through text-gray-400' : ''}`}>
      {note.description}
    </p>

    <div className="text-xs text-right mt-2">
      {format(new Date(note.date), 'dd.MM.yyyy')}
    </div>

    <div className="mt-2 flex space-x-2">
      <button onClick={onEdit} className="text-blue-500">Edit</button>
      <button onClick={onDelete} className="text-red-500">Delete</button>
    </div>
  </div>
);

export default NoteCard;
