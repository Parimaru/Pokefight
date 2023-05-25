import { useState, createContext } from "react";

export const PopoverContext = createContext();

export default function PopoverContextProvider(props) {
  const [popover, setPopover] = useState(false);

  return (
    <PopoverContext.Provider value={{ popover, setPopover }}>
      {props.children}
    </PopoverContext.Provider>
  );
}
