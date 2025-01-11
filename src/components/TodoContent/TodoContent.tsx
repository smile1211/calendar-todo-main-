import { useState } from "react";
import styles from "./TodoContent.module.css";
import { formatISODate } from "../../utils";
import Modal from "../Modal/Modal";
import ModalContent from "../ModalContent/ModalContent";
import Todo from "../Todo/Todo";
import { CiCirclePlus } from "react-icons/ci";
import { useDate, useTodos } from '../../context/GlobalContextProvider';

export default function TodoContent() {
    const { currentDate } = useDate();
    const { todos } = useTodos();
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [activeTodoId, setActiveTodoId] = useState<string | null>(null);
    const [modalMode, setModalMode] = useState<"mod" | "del" | "add">("add");

    const openModal = (id: string | null, mode: "mod" | "del" | "add") => {
        setActiveTodoId(id);
        setModalMode(mode);
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setActiveTodoId(null);
    };

    const formattedDate = formatISODate(currentDate);
    const dailyTodos = todos[formattedDate] || [];

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const dayDate = date.getDate();
        const dayName = ["일", "월", "화", "수", "목", "금", "토"][
            date.getDay()
        ];
        return `${year}년 ${month}월 ${dayDate}일 (${dayName})`;
    };

    return (
        <div className={styles["todo-content"]}>
            <div className={styles["todo-content-inner"]}>
                <p className={styles["todo-date-label"]}>
                    {formatDate(currentDate)}
                </p>
                {dailyTodos.length > 0 ? (
                    dailyTodos.map((todo) => (
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            completed={todo.completed}
                            text={todo.text}
                            openModal={openModal}
                        />
                    ))
                ) : (
                    <div className={styles['add-container']}  onClick={() => openModal(null, "add")}>
                        <CiCirclePlus className={styles['add-icon']}/>
                        <p className={styles['add-text']}>새로운 할 일을 추가해 주세요!</p>
                    </div>
                )}
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    header={modalMode === "add" ? "추가하기" : modalMode === "mod" ? "수정하기" : ""}
                >
                    <ModalContent
                        onClose={closeModal}
                        mode={modalMode}
                        todoId={activeTodoId}
                    />
                </Modal>
            </div>
        </div>
    );
}
