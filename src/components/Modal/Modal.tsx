import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    header?: string;
}

export default function Modal({
    isOpen,
    onClose,
    children,
    header,
}: ModalProps) {
    if (!isOpen) return null;

    const handleBgClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles["modal-overlay"]} onClick={handleBgClick}>
            <div
                className={styles["modal-content"]}
                onClick={(e) => e.stopPropagation()}
            >
                {header && (
                    <div className={styles["modal-header"]}>
                        <h2>{header}</h2>
                    </div>
                )}
                <div className={styles["modal-body"]}>{children}</div>
            </div>
        </div>
    );
}
