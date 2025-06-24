export const useIndexedDB = async (dbName: string, initialValue: any, options) => {
    if (import.meta.server) return useState('indexedDB', () => initialValue);

    const db = useState(dbName, () => initialValue);

    let dbInstance: IDBDatabase | null = null;
    const dbReady = new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event) => {
            dbInstance = (event.target as IDBOpenDBRequest).result;
            if (!dbInstance.objectStoreNames.contains('dragize')) {
                dbInstance.createObjectStore('dragize', { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => {
            dbInstance = (event.target as IDBOpenDBRequest).result;
            resolve(dbInstance);
        };

        request.onerror = (event) => {
            console.error('IndexedDB error:', event);
            reject(event);
        };
    });

    // Restore state from IndexedDB on init (awaited)
    const dbi = await dbReady;
    await new Promise<void>((resolve) => {
        const transaction = dbi.transaction(['dragize'], 'readonly');
        const store = transaction.objectStore('dragize');
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = () => {
            const result = getAllRequest.result;
            if (result && result.length > 0) {
                const restored = {};
                for (const entry of result) {
                    restored[entry.id] = entry.value;
                }
                // Only update if different
                if (JSON.stringify(restored) !== JSON.stringify(db.value)) {
                    db.value = restored;
                }
            }
            resolve();
        };
        getAllRequest.onerror = (event) => {
            console.error('Failed to restore state from IndexedDB:', event);
            resolve();
        };
    });

    // Helper to write all state to IndexedDB
    const persistState = async (newValue) => {
        try {
            const db = await dbReady;
            const transaction = db.transaction(['dragize'], 'readwrite');
            const store = transaction.objectStore('dragize');
            // Clear store before writing new state to avoid stale keys
            const clearRequest = store.clear();
            clearRequest.onsuccess = () => {
                for (const [key, value] of Object.entries(newValue)) {
                    const putRequest = store.put({ id: key, value });
                    putRequest.onerror = (event) => {
                        console.error(`Error storing key "${key}" in IndexedDB:`, event);
                    };
                }
            };
            clearRequest.onerror = (event) => {
                console.error('Error clearing IndexedDB store:', event);
            };
            transaction.onerror = (event) => {
                console.error('Transaction error:', event);
            };
        } catch (err) {
            console.error('Failed to persist state to IndexedDB:', err);
        }
    };

    watch(
        db,
        (newValue) => {
            // console.log('IndexedDB state changed:', newValue);
            persistState(newValue);
        },
        { deep: true }
    );

    return db;
}