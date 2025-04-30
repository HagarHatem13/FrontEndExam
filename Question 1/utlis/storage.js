export const getNotes = () => JSON.parse(localStorage.getItem('notely-notes')) || [];

export const saveNotes = (notes) => {
  localStorage.setItem('notely-notes', JSON.stringify(notes));
};