import { addresses } from "../App.const";
import { IProperty } from "../interfaces/app.interfaces";

export type sorter = "ASC" | "DES";

export const getProperties = async (
  search = "",
  rooms: number | null = null,
  sort: string
): Promise<IProperty[]> => {
  const res = await fetch("http://localhost:3000/transactions.json");
  const data: { properties: IProperty[]; total: number } = await res.json();

  const properties = data.properties.map((p, i) => {
    p.address = addresses[i];
    p.image = `http://localhost:3000/images/prop${
      Math.floor(Math.random() * 5) + 1
    }.jpg`;
    return p;
  });
  if (!search || search === "") {
    if (!rooms) {
      if (sort) {
        return properties.sort((a, b) =>
          sort === "ASC" ? +a.price - +b.price : +b.price - +a.price
        );
      } else {
        return properties;
      }
    } else {
      if (sort) {
        return properties
          .filter((p) => +p.num_rooms === rooms)
          .sort((a, b) =>
            sort === "ASC" ? +a.price - +b.price : +b.price - +a.price
          );
      } else {
        return properties.filter((p) => +p.num_rooms === rooms);
      }
    }
  } else {
    if (!rooms) {
      if (sort) {
        return properties
          .filter((p) => p.address.toLowerCase().includes(search.toLowerCase()))
          .sort((a, b) =>
            sort === "ASC" ? +a.price - +b.price : +b.price - +a.price
          );
      } else {
        return properties.filter((p) =>
          p.address.toLowerCase().includes(search.toLowerCase())
        );
      }
    } else {
      if (sort) {
        return properties
          .filter(
            (p) =>
              p.address.toLowerCase().includes(search.toLowerCase()) &&
              p.num_rooms === rooms
          )
          .sort((a, b) =>
            sort === "ASC" ? +a.price - +b.price : +b.price - +a.price
          );
      } else {
        return properties.filter(
          (p) =>
            p.address.toLowerCase().includes(search.toLowerCase()) &&
            p.num_rooms === rooms
        );
      }
    }
  }
};
