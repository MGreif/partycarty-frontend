import React, { useContext } from "react";
import { IList } from "../components/List";

export const ListContext = React.createContext<IList>({
    description: "",
    editable: false,
    id: "",
    lastEdited: new Date(),
    items: []
})

export const useListContext = () => {
    const context = useContext(ListContext)
    
    return context
}