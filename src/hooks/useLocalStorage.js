import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error reading localStorage:", error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error writing localStorage:", error);
        }
    };

    useEffect(() => {
        setValue(storedValue);
    }, [storedValue]);

    return [storedValue, setValue];
}

export default useLocalStorage;
