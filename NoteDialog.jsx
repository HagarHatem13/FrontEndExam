import React, { useState } from 'react';

const NoteDialog = ({ onClose, onSave, note }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [desc, setDesc] = useState(note?.description || '');
  const [category, setCategory] = useState(note?.category || 'Personal');

  const handleSubmit = () => {
    if (!title.trim()) return alert("Title is required.");
    if (desc.length > 200) return alert("Description must be under 200 characters.");

    const data = {
      ...note,
      title,
      description: desc,
      category,
      date: note?.date || new Date(),
      completed: note?.completed || false
    };

    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl mb-4">{note ? 'Edit Note' : 'Add Note'}</h2>
        <input className="border p-2 mb-2 w-full" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="border p-2 mb-2 w-full" placeholder="Description" maxLength={200} value={desc} onChange={e => setDesc(e.target.value)} />
        <select className="border p-2 mb-2 w-full" value={category} onChange={e => setCategory(e.target.value)}>
          <option>Personal</option>
          <option>Home</option>
          <option>Business</option>
        </select>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="text-gray-600">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-1 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default NoteDialog;