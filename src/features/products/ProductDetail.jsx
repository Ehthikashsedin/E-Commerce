import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();

  const product = useSelector((state) =>
    state.products.items.find(
      (item) => item.id === Number(id)
    )
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="detail-page">
      <img src={product.image} alt={product.title} />

      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h3>Rs.{product.price.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default ProductDetail;