import React from 'react';
import { format } from 'date-fns';

const NoteCard = ({ note, onEdit, onDelete, onToggleComplete }) => {
  const badgeColor = {
    Personal: 'bg-yellow-200 text-yellow-800',
    Home: 'bg-green-200 text-green-800',
    Business: 'bg-purple-200 text-purple-800',
  }[note.category] || 'bg-gray-200 text-gray-800';

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between min-h-[180px] relative">
      {/* Category Badge */}
      <span className={`text-xs px-3 py-1 rounded-full ${badgeColor} absolute top-3 left-3`}>
        {note.category}
      </span>

      {/* Complete Checkbox */}
      <input
        type="checkbox"
        checked={note.completed}
        onChange={onToggleComplete}
        className="absolute top-3 right-3 w-4 h-4"
        title="Mark complete"
      />

      {/* Note Content */}
      <div className="mt-6">
        <h3 className={`text-lg font-semibold ${note.completed ? 'line-through text-gray-500' : ''}`}>
          {note.title}
        </h3>
        <p className={`text-sm mt-2 ${note.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
          {note.description}
        </p>
      </div>

      {/* Date & Actions */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
        <span>{format(new Date(note.date), 'dd.MM.yyyy')}</span>
        <div className="flex gap-4">
          <button onClick={onEdit} className="text-blue-500 hover:underline">Edit</button>
          <button onClick={onDelete} className="text-red-500 hover:underline">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

