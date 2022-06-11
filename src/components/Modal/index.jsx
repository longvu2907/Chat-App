import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Card from "../Card";
import "./index.scss";

export default function Modal({ setIsShowModal, children }) {
  return (
    <div
      className='modal-wrapper'
      onClick={() => setIsShowModal && setIsShowModal(false)}
    >
      <Card className='modal' onClick={e => e.stopPropagation()}>
        {setIsShowModal && (
          <AiOutlineClose
            className='modal__close-btn'
            onClick={() => setIsShowModal(false)}
          />
        )}
        {children}
      </Card>
    </div>
  );
}
