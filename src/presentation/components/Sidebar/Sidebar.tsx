import { FC } from "react";

interface ISidebar {
  isOpen: boolean;
  onClose: Function;
  children: React.ReactNode;
}

const Sidebar: FC<ISidebar> = ({ isOpen, onClose, children }) => {
  return (
    <div className={`mf-sidebar modal is-align-items-flex-end ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={() => onClose()}></div>
      <div className="modal-content has-background-primary m-0">
        <div className="section">
          <div className="container">
            {children}
          </div>
        </div>
      </div>
      <button className="modal-close is-large has-background-black" aria-label="close" onClick={() => onClose()}></button>
    </div>
  )
}

export default Sidebar;