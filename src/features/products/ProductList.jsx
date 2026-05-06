import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { loadMore } from "./productsSlice";
import { useCallback, useEffect } from "react";

const ProductList = () => {
  const dispatch = useDispatch();

  const {
    visibleItems,
    view,
    hasMore,
    loading,
    loadingMore,
  } = useSelector((state) => state.products);

  // Truly stable callback - NO dependencies on state values
  const handleLoadMore = useCallback(() => {
    dispatch(loadMore());
  }, [dispatch]);

  useInfiniteScroll(handleLoadMore);

  // Load more if page is not scrollable on mount
  useEffect(() => {
    const checkAndLoadMore = () => {
      if (visibleItems.length > 0 && !loading && !loadingMore && hasMore) {
        const scrollHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        
        // If page is not scrollable, load more products
        if (scrollHeight <= viewportHeight) {
          dispatch(loadMore());
        }
      }
    };

    // Small delay to ensure DOM has been painted
    setTimeout(checkAndLoadMore, 100);
  }, [visibleItems.length, loading, loadingMore, hasMore, dispatch]);

  if (loading && visibleItems.length === 0) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading products...</div>;
  }

  return (
    <div className={`products-container ${view}`}>
      {visibleItems.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          view={view}
        />
      ))}
      <div 
        style={{ 
          padding: "1.5rem", 
          textAlign: "center", 
          gridColumn: "1 / -1",
          minHeight: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f9f9f9",
          borderTop: "1px solid #e0e0e0"
        }}
      >
        {loadingMore && <div>⏳ Loading more products...</div>}
        {!loadingMore && !hasMore && visibleItems.length > 0 && <div style={{ color: "#666" }}>✓ No more products</div>}
        {!loadingMore && hasMore && visibleItems.length === 0 && <div style={{ color: "#999" }}>No products found</div>}
      </div>
    </div>
  );
};

export default ProductList;