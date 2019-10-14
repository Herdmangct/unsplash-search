import React from "react";

const styles = {
  image: {
    width: "150px",
    height: "150px"
  }
};

const Image = props => {
  return (
    <div>
      <img
        src={props.imageURL}
        alt="an item in the Gallery"
        style={styles.image}
      />
    </div>
  );
};

export default Image;
