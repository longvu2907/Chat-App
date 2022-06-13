import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Card from "../Card";
import "./index.scss";

export default function Modal({ setShowModal, children }) {
  return (
    <div
      className='modal-wrapper'
      onMouseDown={e =>
        setShowModal && setShowModal(e.currentTarget !== e.target)
      }
    >
      <Card className='modal'>
        {setShowModal && (
          <AiOutlineClose
            className='modal__close-btn'
            onClick={() => setShowModal(false)}
          />
        )}
        {children}
      </Card>
    </div>
  );
}
