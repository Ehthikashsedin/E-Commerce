import { useDispatch ,useSelector} from "react-redux";
import{setCategory,setSearch,setView} from "./productsSlice";
import { useState ,useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";


const Filters = () => {
    const dispatch = useDispatch();
    const {items,view} = useSelector((state) => state.products);
    const [searchInput, setSearchInput] = useState("");
    const debouncedSearchTerm = useDebounce(searchInput, 500);
    useEffect(() => {
        dispatch(setSearch(debouncedSearchTerm));
    }, [debouncedSearchTerm, dispatch]);
    const categories = ["all",...new Set(items.map((item) => item.category))];
    return (
        <div className="filters">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <select onChange={(e) => dispatch(setCategory(e.target.value))}>
                    {categories.map((category) => (<option key={category}>
                        {category}
                    </option>
                    ))}
                </select>
                <button onClick={() => dispatch(setView(view === "grid" ? "list" : "grid"))}>
                    toggle view
                </button>
            </div>

    );
};
export default Filters;