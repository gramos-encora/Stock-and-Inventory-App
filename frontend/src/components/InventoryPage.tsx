import React, { useState } from "react";

import { Product, ProductListProps } from "../models/Product";
import InventoryTable from "./ProductTable";
import InventoryOverview from "./InventoryOverview";

const InventoryPage: React.FC<ProductListProps> = ({
  products: initialProducts,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  return (
    <div>
      <InventoryTable products={products} setProducts={setProducts} />
      <InventoryOverview products={products} />
    </div>
  );
};

export default InventoryPage;
