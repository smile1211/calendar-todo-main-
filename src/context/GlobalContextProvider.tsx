import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Todos } from "../types";

interface GlobalContextType {
    currentDate: Date;
    updateCurrentDate: (date: Date) => void;
    todos: Todos;
    updateTodos: (todo: Todos) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [todos, setTodos] = useState<Todos>(() => JSON.parse(localStorage.getItem("todos") || "{}"));

    const updateCurrentDate = (date: Date) => {
        setCurrentDate(date);
    };

    const updateTodos = (todo: Todos) => {
        setTodos(todo);
    };

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <GlobalContext.Provider value={{ currentDate, updateCurrentDate, todos, updateTodos }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useDate() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useDate는 AppStateProvider 내에서 사용해야 합니다.");
    }
    const { currentDate, updateCurrentDate } = context;
    return { currentDate, updateCurrentDate };
}

export function useTodos() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useTodos는 AppStateProvider 내에서 사용해야 합니다.");
    }
    const { todos, updateTodos } = context;
    return { todos, updateTodos };
}
