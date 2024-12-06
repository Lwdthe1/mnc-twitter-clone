class Storage {
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`[Storage] Failed to setItem:`, { key, value }, err);
    }
  }

  getItem(key) {
    try {
      const rawValue = localStorage.getItem(key);
      const parsedValue = JSON.parse(rawValue);

      return parsedValue;
    } catch (err) {
      console.error(`[Storage] Failed to getItem`, { key }, err);
    }
  }

  deleteItem(key) {
    try {
      localStorage.removeItem(key, null);
      this._removeTypeKey();
    } catch (err) {
      console.error(`[Storage] Failed to deleteItem`, { key }, err);
    }
  }

  createItemKey(type) {
    const id = Date.now();
    return { storageKey: `${type}:${id}`, id };
  }

  getItemKey(type, id) {
    if (!id) {
      return type;
    }

    return `${type}:${id}`;
  }

  getItemsByType(type) {
    const allKeys = Object.keys(localStorage);

    return allKeys.reduce((items, key) => {
      if (key.startsWith(`${type}:`)) {
        items.push(this.getItem(key));
      }
      return items;
    }, []);
  }
}

const storage = new Storage();

export default storage;
