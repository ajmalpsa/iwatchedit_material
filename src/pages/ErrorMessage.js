
import { Alert, AlertTitle } from '@material-ui/lab';

function ErrorMessage({message}) {
    return (
        <Alert severity="error">
            <AlertTitle>API Error {message} </AlertTitle>
        An error occured in the Api <strong>check it out!</strong>
        </Alert>
    )
}

export default ErrorMessage
