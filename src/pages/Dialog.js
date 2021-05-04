import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog() {
    const history = useHistory();

  const updateName = () =>{
        history.push("/finishsignup");
  }


  return (
    <div>
      
      <Dialog
        open="open"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"You should update your name to add review"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={updateName} color="primary" autoFocus>
            Update Name
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
