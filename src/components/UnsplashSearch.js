import React, { PureComponent as Component } from "react";
import SearchForm from "./SearchForm";
import Gallery from "./Gallery";

// axios
import axios from "axios";

// Semantic ui
import { Grid, Container } from "semantic-ui-react";

// My Components
import Title from "./Title";
import Credit from "./Credit";

// StyleSheet
const styles = {
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottom: "1px solid rgba(34,36,38,.15)",
    height: "85px"
  },
  search: { textAlign: "center" },
  galleryContainer: { paddingTop: "20px" }
};

class UnsplashSearch extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      page: 1,
      areMoreImages: true,
      previousQuery: ""
    };
    this.fetchImages = this.fetchImages.bind(this);
  }

  fetchImages(query = this.state.previousQuery) {
    const unsplashURL = "https://api.unsplash.com/search/photos";
    const API_KEY =
      "9888edae338650499263b75c4d942fb12a6bb9751d4777c92c6cb54fee89fdac";
    const isChangeOfQuery = this.state.previousQuery !== query;
    let currentPage;

    // Remember query for scrolling purposes
    this.setState({ previousQuery: query });

    // use currentPage Variable because this.setState is async and takes time to update.
    if (isChangeOfQuery) {
      this.setState({ page: 1 });
      currentPage = 1;
    } else {
      currentPage = this.state.page;
    }

    axios
      .get(unsplashURL, {
        params: {
          query: query,
          per_page: 20,
          page: currentPage
        },
        headers: { Authorization: `Client-ID ${API_KEY}` }
      })
      .then(responseData => {
        const { results, total_pages } = responseData.data;

        const imageURLs = results.map(image => {
          return image.urls.raw + "&fit=crop&w=1080&h=1080";
        });

        if (isChangeOfQuery) {
          this.setState({ images: imageURLs });
        } else {
          this.setState({
            images: [...this.state.images, ...imageURLs]
          });
        }

        if (this.state.page < total_pages) {
          this.setState({ page: this.state.page + 1 });
        } else {
          this.setState({ areMoreImages: false });
        }
      });
  }

  render() {
    return (
      <div>
        <div style={styles.header}>
          <Container>
            <Grid verticalAlign="middle">
              <Grid.Row centered columns={"equal"}>
                <Grid.Column id={"mobile-disapear"}>
                  <Title />
                </Grid.Column>
                <Grid.Column style={styles.search}>
                  <SearchForm fetchImages={this.fetchImages} />
                </Grid.Column>
                <Grid.Column id={"mobile-disapear"}>
                  <Credit />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>

        <Container style={styles.galleryContainer}>
          <Grid verticalAlign="middle">
            <Grid.Row centered>
              <Gallery
                images={this.state.images}
                areMoreImages={this.state.areMoreImages}
                fetchImages={this.fetchImages}
              />
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default UnsplashSearch;
