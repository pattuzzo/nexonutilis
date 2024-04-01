import { JSXElement, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { database } from "database";

export const DataContext = createContext();

export default function DataProvider(props: {children: JSXElement}) {
	const [data, setData] = createStore({
    search: new Map(),
		map: new Map(),
		navigation: [],
		item: {
			type: "",
			title: "",
			description: "",
			items: [],
			url: "",
		}
	});
	
	(function setMap(items: any) {
		items.forEach((item: any) => {
      if("items" in item) {
        data.map.set(item.url, item);
				setMap(item.items);
			}
		});
  })(database.items);

	return (
		<DataContext.Provider value={{data, setData}}>
			{props.children}
		</DataContext.Provider>
	);
}

export const useData = () => useContext<any>(DataContext);