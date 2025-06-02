import { useContext } from "react";
import { ModalContext } from '../../context/Modal';

export const useModal = () => useContext(ModalContext);