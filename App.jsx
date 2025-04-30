import React, { useState, useEffect } from 'react';
import Navbar from './src/components/Navbar';
import NoteCard from './src/components/NoteCard';
import NoteDialog from './src/components/NoteDialog';
import { getNotes, saveNotes } from './utils/storage';
import { format } from 'date-fns';

const categories = ['All', 'Personal', 'Home', 'Business'];

function App() {
  const [notes, setNotes] = useState(getNotes);
  const [filter, setFilter] = useState('All');
  const [showCompleted, setShowCompleted] = useState(false);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = (note) => {
    setNotes(prev => [...prev, { ...note, id: Date.now(), date: new Date(), completed: false }]);
  };

  const updateNote = (updatedNote) => {
    setNotes(prev => prev.map(n => n.id === updatedNote.id ? updatedNote : n));
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const toggleComplete = (id) => {
    setNotes(prev =>
      prev.map(n => n.id === id ? { ...n, completed: !n.completed } : n)
    );
  };

  const filteredNotes = notes
    .filter(n => (filter === 'All' || n.category === filter))
    .filter(n => n.title.toLowerCase().includes(search.toLowerCase()))
    .filter(n => !showCompleted || n.completed)
    .sort((a, b) => a.completed - b.completed || new Date(b.date) - new Date(a.date));

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Navbar 
        search={search} 
        setSearch={setSearch} 
        onAdd={() => { setDialogOpen(true); setEditingNote(null); }} 
      />

<div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-2">
  <div className="flex items-center gap-6">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => setFilter(cat)}
        className={`text-sm font-medium pb-2 transition-colors ${
          filter === cat
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-500 hover:text-blue-600'
        }`}
      >
        {cat}
      </button>
    ))}
  </div>

  <label className="flex items-center space-x-2 text-sm">
    <input
      type="checkbox"
      checked={showCompleted}
      onChange={() => setShowCompleted(!showCompleted)}
    />
    <span>Show only completed</span>
  </label>
</div>





      {filteredNotes.length === 0 ? (
        <div className="text-center text-gray-500 mt-16">No notes found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map(note => (
            <NoteCard 
              key={note.id}
              note={note}
              onEdit={() => { setEditingNote(note); setDialogOpen(true); }}
              onDelete={() => deleteNote(note.id)}
              onToggleComplete={() => toggleComplete(note.id)}
            />
          ))}
        </div>
      )}

      {dialogOpen && (
        <NoteDialog
          onClose={() => setDialogOpen(false)}
          onSave={editingNote ? updateNote : addNote}
          note={editingNote}
        />
      )}
    </div>
  );
}

export default App;