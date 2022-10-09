import { useEffect } from "react";

import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
} from "../store/catalog.slice";
import { useAppDispatch, useAppSelector } from "../store/store.config";

export default function useProducts() {
  const data = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, filtersLoaded, brands, types, metaData } =
    useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  //แยก useEffect เพื่อป้องกันการโหลดซ ้าซ้อนจาก [] (ตรวจสอบจาก Redux dev tools)
  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [filtersLoaded, dispatch]);

  return {
    data,
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    metaData,
  };
}
