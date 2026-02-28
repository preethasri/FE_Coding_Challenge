import React from "react";
import "./character.css";

const Character = ({ character }) => {
  return (
    <div
      className="character-card"
      role="card"
      aria-labelledby="character-card"
    >
      <div className="character-image">
        <img src={character?.image} alt="char-img" />
      </div>
      <div className="character-info">
        <div className="character-name">
          <h4>{character?.name}</h4>
        </div>
        <div className="character-status">
          <span
            className={`${character?.status === "Alive" ? "alive" : "dead"}`}
          ></span>
          {character?.status}
        </div>
        <div className="character-location">
          <div>Last Known Location</div>
          <div>{character?.location?.name}</div>
        </div>
        <div className="character-origin">
          <div>First Seen In</div>
          <div>{character?.origin?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Character;
