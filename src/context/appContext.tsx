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

  // useEffect(() => {
  //   console.log("Context useEffect 2");
  //   (async () => {
  //     const data = await getProperties("", null, "DES");
  //     console.log(data);
  //     setProperties(data);
  //     console.log(properties);
  //   })();

  // async function fetchProperties() {
  //   const data = await getProperties("", null, "DES");
  //   console.log(data);
  //   setProperties(data);
  //   console.log(properties);
  // }
  // fetchProperties();
  // }, []);

  // const setPropertiesList = (val: IProperty[]): void => {
  //   console.log("setting properties");

  //   setProperties(val);
  // };

  const setPropertiesList = (list: IProperty[]): void => {
    console.log(list);
    console.log(properties);

    setProperties(list);
  };

  const setSearchValue = (val: string): void => {
    setSearchVal(val);
  };

  const setFilterValue = (val: sorter): void => {
    setFilterVal(val);
  };

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
  </Context.Provider>;
};

export default AppDataProvider;
