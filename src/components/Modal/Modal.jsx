import React from 'react';

function Modal({ isOpen, onClose, params = {},children }) {
  if (!isOpen) return null;

  let styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '700px',
      width: params.width || '650px',
      position: 'fixed',
      top: '200px',
      // left: '50%',
      
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
    },
  };
  

  return (
    <div className="modal" style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}


export default Modal;