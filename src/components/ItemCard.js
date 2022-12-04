import React from "react";

function ItemCard(props) {
  const piggy = props.piggy;

  const displayAge = (age) => {
    if (age < 12) {
      return <p>{age} months old</p>;
    } else {
      return <p>{Math.floor(age / 12)} years old</p>;
    }
  };

  const displayGender = (gender) => {
    const ret = gender === "male" ? "(m)" : "(f)";
    return <p>{ret}</p>;
  };

  const displayDesc = (c, index) => {
    if (index < piggy.colors.length - 1) {
      return c + ", ";
    } else {
      return c + ".";
    }
  };

  return (
    <div className="ItemCard">
      <img className="piggy-img" src={piggy.image} alt="piggy pic hehe"></img>
      <div className="inline">
        <h2 className="card-name">{piggy.name}</h2>
        {displayGender(piggy.gender)}
      </div>
      <p>Description:{" "}{piggy.colors.map(displayDesc)}</p>
      {displayAge(piggy.age)}
      <p>{piggy.distance} miles away</p>
      <form onSubmit={(e) => props.addFriend(e, piggy)}>
        <button type="submit">Add Friend</button>
      </form>
    </div>
  );
}

export default ItemCard;
