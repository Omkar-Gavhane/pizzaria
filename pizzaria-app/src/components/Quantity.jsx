import React from "react";

const Quantity = ({ quantity, setQuantity }) => {
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity((c) => c - 1);
    }
  };
  const handleIncrease = () => {
    setQuantity((c) => c + 1);
  };

  return (
    <div className="d-flex align-items-center justify-content-center gap-3">
      <button
        style={{
          borderRadius: "50%",
          width: "30px",
          paddingBottom: "2px",
          textAlign: "center",
        }}
        className={
          quantity === 1
            ? "border border-1 fw-bold "
            : "border border-1 fw-bold border-black"
        }
        disabled={quantity === 1}
        onClick={handleDecrease}
      >
        -
      </button>
      <p className="mb-0">{quantity}</p>
      <button
        style={{ borderRadius: "50%", width: "30px", paddingBottom: "2px" }}
        className="border border-1 border-black "
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
