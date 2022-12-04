import React from "react";

function CartItem(props) {
  const piggy = props.piggy.piggy;
  console.log(piggy);
  return (
    <div className="CartItem">
      <img className="cart-img" src={piggy.image}></img>
      <div>
        <p>{piggy.name}</p>
        <form
          onSubmit={(e) => props.removeFriend(e, props.index, piggy.distance)}
        >
          <button type="submit">Remove</button>
        </form>
      </div>
    </div>
  );
}

export default CartItem;
