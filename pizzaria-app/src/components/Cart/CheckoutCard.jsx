import React from "react";

const CheckoutCard = ({ totalItems, price }) => {
  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <div className="d-flex flex-column gap-3">
        <h3>
          {totalItems} {totalItems === 1 ? "Item" : "Items"}
        </h3>
        <table className="w-100 mx-3 mt-4" style={{ fontSize: "1.1rem" }}>
          <tbody>
            <tr>
              <td className="w-75">SubTotal</td>
              <td>&#8377; {price.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="w-75 fw-bold">Total</td>
              <td className="fw-bold">&#8377; {price.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="btn btn-success w-100 mt-4">Checkout</button>
    </div>
  );
};

export default CheckoutCard;
