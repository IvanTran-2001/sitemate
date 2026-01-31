const API_URL = 'http://localhost:3000/api/todos';

export const todoAPI = {
  async getAll() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
  },

  async create(text: string) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!response.ok) throw new Error('Failed to create todo');
    return response.json();
  },

  async update(id: string, data: { text?: string; completed?: boolean }) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return response.json();
  },

  async delete(id: string) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete todo');
    return response.json();
  },

  async clearCompleted() {
    const response = await fetch(`${API_URL}/completed/all`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to clear completed todos');
    return response.json();
  }
};
