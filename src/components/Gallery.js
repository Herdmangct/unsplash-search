import React from "react";

// External Libraries
import InfiniteScroll from "react-infinite-scroll-component";

// Semantic-UI
import { Grid, Image, Loader } from "semantic-ui-react";

const Gallery = props => {
  const { images, areMoreImages, fetchImages } = props;

  return (
    <div style={{ overflow: "hidden" }}>
      <InfiniteScroll
        dataLength={images}
        next={() => fetchImages()}
        hasMore={areMoreImages}
        loader={<Loader>Loading</Loader>}
      >
        <Grid centered stackable columns={3}>
          {props.images.map((imageURL, index) => {
            return (
              <Grid.Column key={index}>
                <div
                  style={{
                    height: "353px"
                  }}
                >
                  <Image src={imageURL} />
                </div>
              </Grid.Column>
            );
          })}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};

export default Gallery;
