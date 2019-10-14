import React, { PureComponent as Component } from "react";

// Semantic-UI
import { Form, Input } from "semantic-ui-react";

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      query: "orange"
    };
    this._handleInput = this._handleInput.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  // Show Images when page starts
  componentDidMount() {
    this.props.fetchImages(this.state.query);
  }

  _handleInput(event) {
    this.setState({ query: event.target.value });
  }

  // prevent submit to a server
  _handleSubmit(event) {
    event.preventDefault();
    this.props.fetchImages(this.state.query);
  }

  render() {
    return (
      <Form onSubmit={this._handleSubmit}>
        <Input
          icon="search"
          type="search"
          placeholder={this.state.query}
          onInput={this._handleInput}
          style={{ textAlign: "center" }}
        />
      </Form>
    );
  }
}

export default SearchForm;
