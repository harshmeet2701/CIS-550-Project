import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [email, setEmail] = useState("");
  // const [value, setValue] = useState("");

  return (
    <UserContext.Provider value={[email, setEmail]} >
      {props.children}
    </UserContext.Provider>
  )
}