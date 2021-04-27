class BodyData extends React.Component {
  state = {
    query: "",
    data: [],
    filteredData: []
  };

  handleInputChange = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const filteredData = prevState.data.filter(element => {
        return element.name.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filteredData
      };
    });
  };

  getData = () => {
    fetch(`https://restcountries.eu/rest/v2/all`)
      .then(response => response.json())
      .then(data => {
        const { query } = this.state;
        const filteredData = data.filter(element => {
          return element.name.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({
          data,
          filteredData
        });
      });
  };

  componentWillMount() {
    this.getData();
  }

  render() {
    return (
      <div className="searchForm">
        <form>
          <input
            placeholder="Search for..."
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
        <div>{this.state.filteredData.map(i => <p>{i.name}</p>)}</div>
      </div>
    );
  }
}
/*import React from "react";
import "./styles.css";
import YoutubeEmbed from "./YoutubeEmbed";


export default function TweetList() {
  return (
    <div>
    <div className="App">
      <h1>Sydney</h1>
      <YoutubeEmbed embedId="4FdlOJicGBk" />
    </div><span></span>
    <div className="App">
      <h1>LA</h1>
      <YoutubeEmbed embedId="Co8Ljb4RLe4" />
    </div>
    <div className="App">
      <h1>Tokyo</h1>
      <YoutubeEmbed embedId="0nTO4zSEpOs" />
    </div>
    <div className="App">
      <h1>Dubai</h1>
      <YoutubeEmbed embedId="jB2Z9PA7iKI" />
    </div>
    </div>
    
  );
}
*/