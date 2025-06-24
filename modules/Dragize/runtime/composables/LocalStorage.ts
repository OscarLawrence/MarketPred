


export const useLocalStorage = (key: string, initialValue: any) => {
    if (import.meta.server) return useState('key', () => initialValue);
    const storage = window.localStorage;

    // Initialize the value from localStorage or use the initial value
    const storedValue = storage.getItem(key);
    const value = storedValue ? JSON.parse(storedValue) : initialValue;

    // Create a reactive reference to the value
    const state = useState('key', () => value);

    // Watch for changes and update localStorage
    watch(state, (newValue) => {
        storage.setItem(key, JSON.stringify(newValue));
    }, { deep: true });

    return state;
}