import React from "react";

const styles = {
  header: {
    textAlign: "center",
    color: "#231f21",
    textTransform: "uppercase"
  },
  image: {
    width: "20px",
    height: "20px",
    margin: "0 auto"
  }
};

const Title = props => {
  return (
    <h3 style={styles.header}>
      <img
        src="https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/unsplash-512.png"
        style={styles.image}
        alt="page icon"
      />{" "}
      | Unsplash Search
    </h3>
  );
};

export default Title;
