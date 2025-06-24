


export const useMemoryStorage = (key: string, initialValue: any = {}) => {
    if (import.meta.server) return useState(key, () => initialValue);

    // Create a reactive state for the memory storage
    const state = useState(key, () => ({ ...initialValue }));

    // Watch for changes and update the state
    watch(state, (newValue) => {
        // In memory storage, we simply update the state without any persistence
        console.log(`Memory storage updated for key "${key}":`, newValue);
    }, { deep: true });

    return state;
}