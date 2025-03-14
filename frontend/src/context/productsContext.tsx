import { createContext, PropsWithChildren, useState, useEffect } from "react";
import {
  fetchProducts,
  fetchCategoryStats,
  ProductFilters,
} from "../utils/NetworkManager";
import { Product } from "../models/Product";
import { CategoryStats } from "../models/CategoryStats";

interface DataI {
  isLoading: boolean;
  error: string;
  data: Product[];
  filters: ProductFilters;
  stats: CategoryStats[];
}

export interface ProductContextType {
  data: DataI;
  getProducts: ({}) => Promise<void>;
  getStats: () => Promise<void>;
  setData: React.Dispatch<React.SetStateAction<DataI>>;
}

const productContext = createContext<ProductContextType | undefined>(undefined);

const ProductContext = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<DataI>({
    isLoading: false,
    error: "",
    data: [],
    filters: {},
    stats: [],
  });

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
    getStats();
  }, [data.filters]); // Dependencies, when change, use Effect

  return (
    <productContext.Provider value={{ data, getProducts, getStats, setData }}>
      {children}
    </productContext.Provider>
  );
};

export { ProductContext, productContext };
