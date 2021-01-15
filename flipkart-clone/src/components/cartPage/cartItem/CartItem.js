import React, { useState } from "react";
import "./style.css";

/**
 * @author
 * @function CartItem
 **/

const CartItem = (props) => {
   
  const [quantity, setQty] = useState(props.cartItem.quantity);
  const { _id, name, price, img } = props.cartItem;

  const onQuantityIncrement = () => {
    setQty(quantity + 1);
    //每点一次更新一次,为什么quantity + 1而不是quantity？因为setQty是异步含函数，
    //setQty的数值还没变更，onQuantityInc方法就执行了
    props.onQuantityInc(_id, quantity + 1);
  };

  const onQuantityDecrement = () => {
    //return 之后就点不动了
    if (quantity <= 1) return;
    setQty(quantity - 1);
    //每点一次更新一次
    props.onQuantityDec(_id, quantity - 1);
  };

  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={img} alt={""} />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p>Rs. {price}</p>
          </div>
          <div>Delivery in 3 - 5 days</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        {/* quantity control */}
        <div className="quantityControl">
          <button onClick={onQuantityDecrement}>-</button>
          <input value={quantity} readOnly />
          <button onClick={onQuantityIncrement}>+</button>
        </div>
        <button className="cartActionBtn">save for later</button>
        <button
          className="cartActionBtn"
          onClick={() => props.onRemoveCartItem(_id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;