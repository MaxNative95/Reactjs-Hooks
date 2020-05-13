import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [news, setNews] = useState([]);

  const [searchQuery, setSearchQuery] = useState('react');

  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react');

  const [loading, setLoading] = useState(false);

  const fecthNews = () => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(res => (setNews(res.hits), setLoading(false)))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fecthNews();
  }, [url])

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }

  const showLoading = () => (loading ? <h2>Loading...</h2> : null)

  const searchForm = () => (
    <form onSubmit={handleSubmit} >
      <input type="text" value={searchQuery} onChange={handleChange} />
      <button>Search</button>
    </form>
  )

  const makeRequest = () => {
    return news.map((item, i) => (
      <p key={i}>{item.title}</p>
    ))
  }

  return (
    <div>
      <h2>News App</h2>
      {showLoading()}
      {searchForm()}
      {makeRequest()}
    </div>
  )

}

export default App




//  const App = () => {

//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     document.title = `Clicked ${count} times`;
//   })

//   const increment = () => {
//     setCount(count + 1);
//   }

//   return (
//     <div>
//       <h2>Counter App</h2>
//       <button onClick={increment}>Pressed {count} times.</button>
//     </div>
//   );

// };

// export default App


// export default class componentName extends Component {

//   state = {
//     count: 0
//   }

//   increment = () => {
//     this.setState({
//       count: this.state.count + 1
//     })
//   }

//   componentDidMount = () => {
//     document.title = `Clicked ${this.state.count} times`;
//   };

//   componentDidUpdate = (prevProps, prevState) => {
//     document.title = `Clicked ${this.state.count} times`;
//   };


//   render() {
//     return (
//       <div>
//         <h2>Counter App</h2>
//         <button onClick={this.increment}>Pressed {this.state.count} times.</button>
//       </div>
//     );
//   }
// }
