// Interesting, this splits up what appear to be a series of properties into one prop for the label, 
// and the rest for the input field. Very cool technique, and no manual copying of properties
import './form-input.styles.scss'

const FormInput = ({label, ...otherProps} ) => { 
    return  ( 
        <div className="group">
        <input className="form-input" {...otherProps} /> 
            { label && ( 
                <label 
                  className={`${otherProps.value.length > 0 ? 'shrink' : ''} form-input-label`}>{label}</label>
            )}  
    </div> 
    )
}

export default FormInput; 