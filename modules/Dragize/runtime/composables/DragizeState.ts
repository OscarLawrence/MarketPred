


export const useDragizeDB = async (key: string) => {
    const dragizeOptions = useRuntimeConfig().public.dragize || {};

    console.log('Dragize options:', dragizeOptions);

    let db = null

    switch (dragizeOptions.persistence) {
        case 'indexedDB':
            db = await useIndexedDB(key, {}, {});
            break;
        case 'localStorage':
            db = useLocalStorage(key, {});
            break;
        default:
            db = useMemoryStorage(key, {});
            break;
    }


    return db

}