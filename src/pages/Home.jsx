import Filters from "../features/products/Filters";
import ProductList from "../features/products/ProductList";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    return (
        <>
            <Filters />
            <ProductList />
            <Cart/>
        
        </>
    );
};
    export default Home;