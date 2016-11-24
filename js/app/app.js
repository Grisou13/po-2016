import React from 'react'
import ReactDOM from 'react-dom';
class App extends React.component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
  }
  render () {
    var sessions = this.state.items.map((item)=>{
      return <Session key={item} dsRecord={item} />
    });
    return (
      <div>
        Hi {this.props.name}

      </div>
    )
  }
}
ReactDOM.render(<App dsRecord="sessions" />, document.getElementById('app'));
