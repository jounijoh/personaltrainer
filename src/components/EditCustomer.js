import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditCustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
  setCustomer({
      firstname: props.data.firstname,
      lastname: props.data.lastname,
      streetaddress: props.data.streetaddress,
      postcode: props.data.postcode,
      city: props.data.city,
      email: props.data.email,
      phone: props.data.phone,
    });
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.updateCustomer(customer, props.data.links[0].href);
    setOpen(false);
  };
  

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
        <TextField
            margin="dense"
            label="First name"
            value={customer.firstname}
            onChange={e => setCustomer({...customer, firstname: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Last name"
            value={customer.lastname}
            onChange={e => setCustomer({...customer, lastname: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Street address"
            value={customer.streetaddress}
            onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Postcode"
            value={customer.postcode}
            onChange={e => setCustomer({...customer, postcode: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="City"
            value={customer.city}
            onChange={e => setCustomer({...customer, city: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Email"
            value={customer.email}
            onChange={e => setCustomer({...customer, email: e.target.value})}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Phone"
            value={customer.phone}
            onChange={e => setCustomer({...customer, phone: e.target.value})}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
