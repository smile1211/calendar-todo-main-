import React, { useEffect, useRef, useState } from "react";
import { formatISODate } from "../../utils";
import styles from "./ModalContent.module.css";
import { TodoItem } from "../../types";
import { useDate, useTodos } from '../../context/GlobalContextProvider';

interface ModalContentProps {
    onClose: () => void;
    mode: "add" | "mod" | "del";
    todoId?: string | null;
}

export default function ModalContent({
    onClose,
    mode: initialMode,
    todoId,
}: ModalContentProps) {
    const { currentDate, updateCurrentDate } = useDate();
    const { todos, updateTodos } = useTodos();
    const [taskText, setTaskText] = useState("");
    const [taskDate, setTaskDate] = useState(formatISODate(currentDate));
    const [mode, setMode] = useState<"add" | "mod" | "del" | "alert">(initialMode);
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if ((mode === "mod" || mode === "del") && todoId) {
            const allTodos = Object.values(todos).flat();
            const todoToModify = allTodos.find((todo) => todo.id === todoId);
            if (todoToModify) {
                setTaskText(todoToModify.text);
                setTaskDate(todoToModify.date);
            }
        }
    }, [mode]);


    useEffect(() => {
        if (mode === "add" || mode === "mod") {
            ref.current?.focus();
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Escape") {
                onClose();
            } else if (e.code === "Enter") {
                handleAddOrUpdateTodo();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [taskText]);

    const handleAddOrUpdateTodo = (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        if (!taskText.trim().length) {
            setMode("alert");
            return;
        }

        if (mode === "del" && todoId) {
            Object.keys(todos).forEach((date) => {
                todos[date] = todos[date].filter((todo) => todo.id !== todoId);
                if (todos[date].length === 0) {
                    delete todos[date];
                }
            });

            updateTodos({ ...todos });
            onClose();
            return;
        }

        const newTodo: TodoItem = {
            id: todoId || Date.now().toString(),
            text: taskText,
            date: taskDate,
            completed: false,
        };

        const updatedTodos = { ...todos };

        if (mode === "mod" && todoId) {
            let oldDate = "";

            Object.keys(updatedTodos).forEach((date) => {
                updatedTodos[date] = updatedTodos[date].map((todo) => {
                    if (todo.id === todoId) {
                        oldDate = date;
                        return {
                            ...todo,
                            text: taskText,
                            date: taskDate,
                            completed: todo.completed,
                        };
                    }
                    return todo;
                });

                if (updatedTodos[date].length === 0) {
                    delete updatedTodos[date];
                }
            });

            if (oldDate !== taskDate) {
                updatedTodos[oldDate] = updatedTodos[oldDate].filter((todo) => todo.id !== todoId);
                if (updatedTodos[oldDate].length === 0) {
                    delete updatedTodos[oldDate];
                }
                updatedTodos[taskDate] = [...(updatedTodos[taskDate] || []), newTodo];
            }
        } else {
            updatedTodos[taskDate] = [...(updatedTodos[taskDate] || []), newTodo];
        }

        updateTodos(updatedTodos);
        updateCurrentDate(new Date(taskDate));
        onClose();
    };

    const renderAlertMode = () => (
        <div className={styles["confirmation-text"]}>
            <p>할 일의 텍스트를 입력해 주세요!</p>
            <button className={styles.button} onClick={() => setMode(initialMode)}>돌아가기</button>
        </div>
    );

    const renderEditMode = () => (
        <>
            <div>
                <input
                    type="date"
                    className={styles.date}
                    id="task-date"
                    name="task-date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                />
            </div>
            <div>
                <textarea
                    id="task-text"
                    className={styles.text}
                    name="task-text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    rows={4}
                    placeholder="할 일을 입력 해 주세요."
                    ref={ref}
                ></textarea>
            </div>
        </>
    );

    const renderDeleteMode = () => (
        <div className={styles["confirmation-text"]}>
            <p>
                <strong>{taskDate}</strong>
            </p>
            <p className={styles["task-highlight"]}>{taskText}</p>
            <hr />
            <p>이 할 일을 정말로 삭제하시겠습니까?</p>
        </div>
    );

    return (
        <form onSubmit={handleAddOrUpdateTodo}>
            {mode === "alert"
                ? renderAlertMode()
                : mode === "del"
                ? renderDeleteMode()
                : renderEditMode()
            }
            
            {mode !== "alert" && (
                <div className={styles["button-wrap"]}>
                    <button type="submit">
                        {mode === "add" ? "추가" : mode === "mod" ? "수정" : "삭제"}
                    </button>
                    <button type="button" onClick={onClose}>취소</button>
                </div>
            )}
        </form>
    );
}