import { useState, createContext, useContext, useEffect } from "react";
import { IContext, IProperty } from "../interfaces/app.interfaces";
import { getProperties, sorter } from "../services/api.service";

export const Context = createContext<IContext>({
  properties: [],
  setPropertiesList: (list: IProperty[]) => {},
  searchValue: "",
  setSearchValue: (value: string) => {},
  filterValue: "ASC",
  setFilterValue: (value: sorter) => {},
});

export const useCont = () => {
  return useContext(Context);
};

const AppDataProvider = (props: any) => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [searchValue, setSearchVal] = useState<string>("");
  const [filterValue, setFilterVal] = useState<sorter>("ASC");

  const setPropertiesList = (list: IProperty[]): void => {
    console.log(list);

    setProperties(list);
  };

  const setSearchValue = (val: string): void => {
    setSearchVal(val);
  };

  const setFilterValue = (val: sorter): void => {
    setFilterVal(val);
  };

  return (
    <Context.Provider
      value={{
        properties,
        setPropertiesList,
        searchValue,
        setSearchValue,
        filterValue,
        setFilterValue,
      }}>
      {props.children}
    </Context.Provider>
  );
};

export default AppDataProvider;
