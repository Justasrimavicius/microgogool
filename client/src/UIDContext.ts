import React from "react";

interface context{
    UID: String,
    setUID: React.Dispatch<React.SetStateAction<string>> | (() => void)
}
const UID = '5';
const setUID = function(){return 0};

const UIDContext = React.createContext<context>({UID,setUID});

export default UIDContext;