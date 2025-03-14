import { createContext, PropsWithChildren, useState, useEffect } from "react";
import {
  fetchProducts,
  fetchCategoryStats,
  ProductFilters,
} from "../utils/NetworkManager";
import { Product } from "../models/Product";
import { CategoryStats } from "../models/CategoryStats";

// Interface para manejar productos y estadísticas
interface DataI {
  isLoading: boolean;
  error: string;
  data: Product[];
  filters: ProductFilters;
  stats: CategoryStats[]; // Agregamos las estadísticas
}

export interface ProductContextType {
  data: DataI;
  getProducts: ({}) => Promise<void>;
  getStats: () => Promise<void>; // Nueva función para obtener estadísticas
  setData: React.Dispatch<React.SetStateAction<DataI>>;
}

const productContext = createContext<ProductContextType | undefined>(undefined);

const ProductContext = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<DataI>({
    isLoading: false,
    error: "",
    data: [],
    filters: {},
    stats: [], // Inicializamos estadísticas vacías
  });

  // Función para obtener productos
  const getProducts = async ({ filters }: { filters?: ProductFilters }) => {
    setData((prev) => ({ ...prev, isLoading: true }));
    try {
      const products = (await fetchProducts(
        filters || data.filters
      )) as Product[];
      setData((prev) => ({ ...prev, data: products, error: "" }));
    } catch (error) {
      if (error instanceof Error) {
        setData((prev) => ({ ...prev, error: "Products couldn't be loaded" }));
      }
    } finally {
      setData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // función para obtener estadísticas
  const getStats = async () => {
    try {
      const stats = await fetchCategoryStats();
      setData((prev) => ({
        ...prev,
        stats: stats,
        error: "",
      }));
    } catch (error) {
      if (error instanceof Error) {
        setData((prev) => ({
          ...prev,
          error: "Category Stats couldn´t be loaded",
        }));
      }
    } finally {
      setData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    getProducts({});
    getStats(); // También obtenemos las estadísticas al inicio
  }, [data.filters]);

  return (
    <productContext.Provider value={{ data, getProducts, getStats, setData }}>
      {children}
    </productContext.Provider>
  );
};

export { ProductContext, productContext };
