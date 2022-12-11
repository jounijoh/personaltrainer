import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    activity: "",
    duration: "",
    customer: "",
  });
 
  const handleClickOpen = () => {
    setTraining({date: new Date(), customer: props.data.links[0].href });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addTraining(training)
    setOpen(false);
  };
 
  
  return (
    <div>
      <Button>
      <AddOutlinedIcon size="small" onClick={handleClickOpen}>
        Add training
      </AddOutlinedIcon>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          New Training for {props.data.firstname} {props.data.lastname}
        </DialogTitle>
        <DialogContent> 
          <LocalizationProvider dateAdapter={AdapterDayjs}> &nbsp;&nbsp;Select date and time: <br/>
            <DateTimePicker
              
              renderInput={(props) => <TextField {...props} />}
              inputFormat="DD.MM.YYYY HH:mm"
              value={training.date}
              onChange={(date) => setTraining({ ...training,
                date: dayjs(date.$d).toISOString() })}
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            label="Activity"
            value={training.activity}
            onChange={(e) =>
              setTraining({ ...training, activity: e.target.value })
            }
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Duration"
            value={training.duration}
            onChange={(e) =>
              setTraining({ ...training, duration: e.target.value })
            }
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSave()}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
