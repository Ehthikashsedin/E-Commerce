import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { loadMore } from "./productsSlice";

const ProductList = () => {
  const dispatch = useDispatch();

  const {
    visibleItems,
    view,
    hasMore,
    loading,
  } = useSelector((state) => state.products);

  const lastElementRef = useInfiniteScroll(() => {
    if (hasMore) {
      dispatch(loadMore());
    }
  });

  if (loading && visibleItems.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`products-container ${view}`}>
      {visibleItems.map((product, index) => {
        if (index === visibleItems.length - 1) {
          return (
            <div ref={lastElementRef} key={product.id}>
              <ProductCard product={product} view={view} />
            </div>
          );
        }

        return (
          <ProductCard
            key={product.id}
            product={product}
            view={view}
          />
        );
      })}
      {loading && <div>Loading more...</div>}
    </div>
  );
};

export default ProductList;