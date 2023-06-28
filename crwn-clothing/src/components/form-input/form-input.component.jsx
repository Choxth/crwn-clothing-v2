// Interesting, this splits up what appear to be a series of properties into one prop for the label, 
// and the rest for the input field. Very cool technique, and no manual copying of properties
import {FormInputLabel, Input, Group} from './form-input.styles.jsx'

const FormInput = ({label, ...otherProps} ) => { 
    return  ( 
        <Group>
        <Input {...otherProps} /> 
        {label && ( 
                <FormInputLabel shrink={otherProps.value.length} >
                {label} 
                </FormInputLabel>

            )}  
    </Group> 
    ); 
}

export default FormInput; 