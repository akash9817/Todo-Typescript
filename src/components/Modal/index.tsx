interface IModal {
  showModal : boolean;
  handleClose : () => void;
  children : React.ReactNode
}

const Modal : React.FC<IModal> = ({children, showModal, handleClose}) => {
  return (
    <div>
      {showModal && <div className="modal-backdrop show" onClick={handleClose}></div>}
      <div className={`modal ${showModal ? 'd-block' : 'd-none'}`} tabIndex={-1} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Sub Task</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Modal