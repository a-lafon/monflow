import { motion } from "framer-motion";
import { FC } from "react";

interface ISidebar {
  isOpen: boolean;
  onClose: Function;
  children: React.ReactNode;
}

const Sidebar: FC<ISidebar> = ({ isOpen, onClose, children }) => {
  return (
    <motion.div
      className={`mf-sidebar modal is-align-items-flex-end ${isOpen ? 'is-active' : ''}`}
      exit={{ opacity: 0 }}
    >
      <div className="modal-background" onClick={() => onClose()}></div>
      <motion.div
        className="modal-content has-background-dark-blue m-0"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
      >
        <div className="section">
          <div className="container">
            {children}
          </div>
        </div>
      </motion.div>
      <button className="modal-close is-large has-background-black" aria-label="close" onClick={() => onClose()}></button>
    </motion.div>
  )
}

export default Sidebar;