import React from 'react';
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <>
        <div id="header">
          <p>React header</p>
        </div>
        <div id="wrapper">
          <div id="content">
            <p>React content</p>
          </div>
        </div>
      </>
    )
  }
}

export default Main;
