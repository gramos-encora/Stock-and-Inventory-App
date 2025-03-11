import { createContext, PropsWithChildren, useState, useEffect } from "react";
import { fetchProducts, ProductFilters } from "../utils/NetworkManager";
import { Product } from "../models/Product";

// context chec

interface DataI {
  isLoading: boolean;
  error: string;
  data: Product[];
  filters: ProductFilters;
}

export interface ProductContextType {
  data: DataI;
  getProducts: ({}) => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<DataI>>;
}

const productContext = createContext<ProductContextType | undefined>(undefined);

// provider => provedoor

const ProductContext = ({ children }: PropsWithChildren) => {
  // Products endpoint
  // Filtrado

  const [data, setData] = useState<DataI>({
    isLoading: false,
    error: "",
    data: [],
    filters: {},
  });

  const getProducts = async ({ filters }: { filters?: ProductFilters }) => {
    setData((prev) => ({ ...prev, isLoading: true }));
    try {
      const products = (await fetchProducts(
        filters || data.filters
      )) as Product[];
      setData({ ...data, data: products });
    } catch (error) {
      if (error instanceof Error) {
        setData((prev) => ({
          ...prev,
          error: "Algo salio mal",
        }));
      }
      setData((prev) => ({ ...prev, error: error as string }));
    } finally {
      setData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    getProducts({});
  }, [data.filters]);
  // Cada vez que el componente se renderiza
  // cada vez que estado
  // array dependencias [] => solo corre al inicio y
  //  al final de la vida del componente

  // console.log(data);

  return (
    <productContext.Provider value={{ data, getProducts, setData }}>
      {children}
    </productContext.Provider>
  );
};

export { ProductContext, productContext };
// opcional -> hook que consuma el contetx

// <h1> // componte
// hola  // children
// </h1>// componte

// <ProductContext>
//   children
// </ProductContext>
