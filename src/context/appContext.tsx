import { useState, createContext, useContext } from "react";
import { IContext, IProperty } from "../interfaces/app.interfaces";
import { sorter } from "../services/api.service";

export const Context = createContext<IContext>({
  properties: [],
  setPropertiesList: (list: IProperty[]) => {},
  searchValue: "",
  setSearchValue: (value: string) => {},
  sortValue: "ASC",
  setSortValue: (value: sorter) => {},
  numOfRooms: null,
  setNumOfRooms: (value: number | null) => {},
});

export const useCont = () => {
  return useContext(Context);
};

const AppDataProvider = (props: any) => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [searchValue, setSearchVal] = useState<string>("");
  const [sortValue, setSorterValue] = useState<sorter>("ASC");
  const [numOfRooms, setRoomsNum] = useState<number | null>(null);

  const setPropertiesList = (list: IProperty[]): void => {
    setProperties(list);
  };

  const setSearchValue = (val: string): void => {
    setSearchVal(val);
  };

  const setSortValue = (val: sorter): void => {
    setSorterValue(val);
  };

  const setNumOfRooms = (val: number | null): void => {
    setRoomsNum(val);
  };

  return (
    <Context.Provider
      value={{
        properties,
        setPropertiesList,
        searchValue,
        setSearchValue,
        sortValue,
        setSortValue,
        numOfRooms,
        setNumOfRooms,
      }}>
      {props.children}
    </Context.Provider>
  );
};

export default AppDataProvider;
