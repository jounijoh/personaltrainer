import React, { useState, useEffect } from "react";


export default function GetCustomer(props) {

    const [customer, setCustomer] = useState({});

    const customerUrl = props.params.links[2].href;
    
    useEffect(() => {
      fetch(customerUrl)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setCustomer(data);
      })
    }, [customerUrl]);

   
    const customerFullName = customer.lastname + " " + customer.firstname;

    return <>{customerFullName}</>;
  };