import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.mutate({
      variables: {
        content: this.state.content,
        id: this.props.songId,
      },
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Add a lyric</label>
        <input
          value={this.state.content}
          onChange={(event) => {
            this.setState({ content: event.target.value });
          }}
        />
      </form>
    );
  }
}

const addLyrics = gql`
  mutation addLyrics($content: String, $id: ID!) {
    addLyricToSong(content: $content, songId: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(addLyrics)(LyricCreate);
