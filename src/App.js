import piggyData from "./assets/piggy-data.json";
import { useState } from "react";
import ItemCard from "./components/ItemCard";
import CartItem from "./components/CartItem";
import "./App.css";

function App() {
  const [friendsList, setFriendsList] = useState([]);
  const [piggyList, setPiggyList] = useState(piggyData);
  const [genderFilter, setGenderFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [sortKey, setSortKey] = useState("");
  const [avgDistance, setAvgDistance] = useState(0);

  const genderFilterChange = (event) => {
    event.preventDefault();
    const currentPiggies = colorFilter.length ? colorFilter : piggyData;
    const newPiggyList = event.target.value
      ? currentPiggies.filter((pig) => {
          return pig.gender === event.target.value;
        })
      : currentPiggies;
    console.log(newPiggyList);
    const genders = event.target.value ? newPiggyList : [];
    setGenderFilter(genders);
    sortKey && sortByKey(newPiggyList, sortKey);
    setPiggyList(newPiggyList);
  };

  const colorFilterChange = (event) => {
    event.preventDefault();
    setColorFilter(event.target.value);
    const currentPiggies = genderFilter.length ? genderFilter : piggyData;
    const newPiggyList = event.target.value
      ? currentPiggies.filter((pig) => {
          return pig.colors.includes(event.target.value);
        })
      : currentPiggies;
    console.log(newPiggyList);
    const colors = event.target.value ? newPiggyList : [];
    setColorFilter(colors);
    sortKey && sortByKey(newPiggyList, sortKey);
    setPiggyList(newPiggyList);
  };

  const sortByKey = (arr, key) => {
    return arr.sort((a, b) => {
      let x = a[key];
      let y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  const sortChange = (event) => {
    event.preventDefault();
    setSortKey(event.target.value);
    event.target.value && sortByKey(piggyList, event.target.value);
    setPiggyList(piggyList);
  };

  const displayAvgDistance = () => {
    if (avgDistance) {
      return <p>Avg Playdate Distance: {avgDistance.toFixed(1)}mi</p>;
    } else {
      return;
    }
  };

  const removeFriend = (event, index, distance) => {
    event.preventDefault();
    let newCart = friendsList.slice(0, index);
    if (index < friendsList.length) {
      newCart = newCart.concat(friendsList.slice(index + 1));
    }
    const newDist = newCart.length
      ? (avgDistance * friendsList.length - distance) / newCart.length
      : 0;
    console.log(newDist);
    setAvgDistance(newDist);
    setFriendsList(newCart);
  };

  const addFriend = (event, piggy) => {
    event.preventDefault();
    const newCart = friendsList.concat([{ piggy: piggy, key: Date.now() }]);
    setAvgDistance(
      (avgDistance * friendsList.length + piggy.distance) / newCart.length
    );
    setFriendsList(newCart);
  };
  return (
    <div className="App">
      <div className="header">
        <h1>Piggy Playdate Planner</h1>
      </div>
      <div className="main">
        <div className="section1">
          <div className="container navbar">
            <h2>Piggies near you!</h2>
            <form className="dropdown">
              <label>Filter gender: </label>
              <select id="gender" name="gender" onChange={genderFilterChange}>
                <option value="">All</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </form>
            <form className="dropdown">
              <label>Filter color: </label>
              <select id="color" name="color" onChange={colorFilterChange}>
                <option value="">All</option>
                <option value="brown">Brown</option>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="multi">Multi</option>
              </select>
            </form>
            <form className="dropdown">
              <label>Sort by: </label>
              <select id="sort" name="sort" onChange={sortChange}>
                <option value="">None</option>
                <option value="distance">Distance</option>
                <option value="name">Name</option>
              </select>
            </form>
          </div>
          <div className="container">
            {piggyList.map((piggy, index) => (
              <ItemCard piggy={piggy} addFriend={addFriend} index={index} />
            ))}
          </div>
        </div>
        <div className="section2">
          <h2>My Piggy Playdates</h2>
          <div className="container">
            {friendsList.map((piggy, index) => (
              <CartItem
                piggy={piggy}
                removeFriend={removeFriend}
                index={index}
              />
            ))}
            {displayAvgDistance()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
