import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Filters from "../features/products/Filters";
import ProductList from "../features/products/ProductList";
import { fetchProducts } from "../features/products/productsSlice";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    return (
        <>
            <Filters />
            <ProductList />
        </>
    );
};

export default Home;