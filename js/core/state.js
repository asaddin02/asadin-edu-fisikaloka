// Fisikaloka · Reactive Application State Store

class PhysicsState {
  constructor() {
    this.state = {
      mode: 'explore', // 'explore' or 'learn'
      activeLevel: 'sma', // 'sd', 'smp', 'sma', 'university', 'educator'
      activeLayer: 'standard', // 'simple', 'standard', 'advanced', 'deepDive'
      searchQuery: '',
      selectedDomainId: null,
      selectedEntityType: null,
      activeSimId: 'projectile',
      bookmarks: this.loadBookmarks(),
      theme: 'dark'
    };
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  setState(partial) {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (err) {
        console.error('State subscriber error:', err);
      }
    }
  }

  toggleBookmark(entityId) {
    const bookmarks = new Set(this.state.bookmarks);
    if (bookmarks.has(entityId)) {
      bookmarks.delete(entityId);
    } else {
      bookmarks.add(entityId);
    }
    const updated = Array.from(bookmarks);
    this.saveBookmarks(updated);
    this.setState({ bookmarks: updated });
    return bookmarks.has(entityId);
  }

  isBookmarked(entityId) {
    return this.state.bookmarks.includes(entityId);
  }

  loadBookmarks() {
    try {
      const saved = localStorage.getItem('asadin_physics_bookmarks');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed.filter(id => typeof id === 'string') : [];
    } catch {
      return [];
    }
  }

  saveBookmarks(bookmarks) {
    try {
      localStorage.setItem('asadin_physics_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // Storage quota or private mode fallback
    }
  }
}

export const appState = new PhysicsState();
