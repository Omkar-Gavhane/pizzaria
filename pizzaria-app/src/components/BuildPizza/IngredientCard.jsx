import React from "react";

const IngredientCard = ({
  ingredient,
  selectedIngredients,
  setSelectedIngredients,
}) => {
  // check if ingredient is already selected
  const isSelected = selectedIngredients.some(
    (item) => item._id === ingredient._id
  );

  // handle checkbox click
  const handleCheckboxChange = () => {
    if (isSelected) {
      // remove if already selected
      setSelectedIngredients((prev) =>
        prev.filter((item) => item._id !== ingredient._id)
      );
    } else {
      // add to selected list
      setSelectedIngredients((prev) => [...prev, ingredient]);
    }
  };

  return (
    <div
      className={`d-flex justify-content-between align-items-center w-75 border rounded p-3 mb-3 ${
        isSelected ? "border-success bg-light" : "border-secondary"
      }`}
    >
      {/* Left: Image */}
      <div>
        <img
          src={ingredient.image}
          alt={ingredient.tname}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </div>

      {/* Middle: Name and Price */}
      <div className="d-flex flex-column align-items-start text-start w-50">
        <h5 className="m-0">{ingredient.tname}</h5>
        <p className="text-muted mb-1 text-capitalize">
          {ingredient.category || "Topping"}
        </p>
        <h6 className="text-dark mb-0">₹ {ingredient.price}</h6>
      </div>

      {/* Right: Checkbox */}
      <div className="d-flex align-items-center gap-2">
        <input
          type="checkbox"
          id={ingredient._id}
          checked={isSelected}
          onChange={handleCheckboxChange}
          style={{ width: "20px", height: "20px", cursor: "pointer" }}
        />
        <label htmlFor={ingredient._id} className="fw-semibold">
          Add
        </label>
      </div>
    </div>
  );
};

export default IngredientCard;
