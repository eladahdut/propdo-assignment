import { sorter } from "../services/api.service";

export interface IProperty {
  price: number;
  sqm: number;
  num_rooms: number;
  floor: number;
  num_floors: number;
  elevator: number;
  parking: string;
  id: string;
  address: string;
  image?: string;
}

export interface IContext {
  properties: IProperty[];
  setPropertiesList: (list: IProperty[]) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  sortValue: string;
  setSortValue: (value: sorter) => void;
  numOfRooms: number | null;
  setNumOfRooms: (value: number | null) => void;
}
