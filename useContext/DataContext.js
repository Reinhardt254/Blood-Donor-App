import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [cuserData, setCUserData] = useState([]);

  return (
    <DataContext.Provider value={{ data, setData, userData, setUserData, cuserData, setCUserData}}>
      {children}
    </DataContext.Provider>
  );
};




















