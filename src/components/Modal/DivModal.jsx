const DivModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          
          {children}
        </div>
      </div>
    );
  };
  
  const styles = {
    overlay: {
      position: 'absolute', // Change from 'fixed' to 'absolute'
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'none',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
    },
  };

  export default DivModal;