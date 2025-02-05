export default function EditToggle(props) {
    return (
        <section className="edit-toggle-section"> 
        
            <div className="form-check form-switch">
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Edit Mode
                <input onClick={() => props.setEditMode(!props.editMode) } defaultChecked={props.editMode} className="form-check-input edit-toggle-button" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>                
                </label>
            </div>
        </section>
    )
}