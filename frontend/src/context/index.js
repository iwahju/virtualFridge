import { createContext } from "react";

const fridgeContext = createContext(null);
const FridgeProvider = fridgeContext.Provider;


export { fridgeContext, FridgeProvider };
