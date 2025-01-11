import { useState } from "react";
import styles from "./TodoHeader.module.css";
import { GiNotebook } from "react-icons/gi";
import Modal from "../Modal/Modal";
import ModalContent from "../ModalContent/ModalContent";
import { FaPlusCircle } from "react-icons/fa";

export default function TodoHeader() {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className={styles["todo-header"]}>
            <div className={styles.left}></div>
            <div className={styles.center}>
                <span>Check List</span>
                <GiNotebook />
            </div>
            <div className={styles.right}>
                <button className={styles.button} onClick={openModal}>
                    <span>Add Task</span>
                    <FaPlusCircle/>
                </button>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} header="추가하기">
                <ModalContent onClose={closeModal} mode="add"/>
            </Modal>
        </div>
    );
}
