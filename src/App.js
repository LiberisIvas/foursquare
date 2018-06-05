import React, { Component } from 'react';
import logo from './logo1.png';
import './App.css';
import axios from "axios";
import Venue from './components/Venue';


//Get req code 429. To be updated

const API_DEFAULT = "https://api.foursquare.com/v2/venues/explore?v=20161101";
const CLIENT = "&client_secret=ISV2BFBDZIZL1WNG00D13F4CSLRXIARM0SXTSUU0KZSWWKMG&client_id=KVQIDLMIY4F0BIBEPQNSVQUSABBANRITCWD2ZL2MDPEGH1FM";
        
class App extends Component {
  state = {
    near:"",
    limit: 3,
    list: [],
    wish: "",    
  }

  
  render() {
    const listP = this.state.list;
    let printlist = listP.map (
      (value, index)=> {
        return <Venue value={value} key={index} state={{link:'my name'}}/>;
      }
    )

    return (
      <div className="App container">
        <div className="text-center"> 
          <h2 className="d-inline welcome">Welcome to "CityLife" </h2>
          <h5 className="recommend">Find out the best spots!</h5>
        </div>
        <div className="row">
          <div className="col l6 inputdiv push-l2 center-align">
            <input onChange={ this.placeChanged } type="text" className="form-control d-inline" placeholder="City: " value={this.state.near}/>
            <select className="form-control selection" onChange={this.wishChanged}>
              <option value="food">Food</option>
              <option value="drinks">Drinks</option>
              <option value="coffee">Coffee</option>
              <option value="shops">Shops</option>
              <option value="arts">Arts</option>
              <option value="outdoors">Outdoors</option>
              <option value="trending">Trending</option>
            </select>
            <div className="left-align">
              <button type="button" className=" btn-floating btn-large scale-transition waves-effect waves-light"onClick={this.getResults}> Search </button>
            </div>
          </div>
          <div className="row">
            <div className="col l6 inputdiv  center-align">
              <img src={logo} className="App-logo " alt="logo" />
            </div> 
          </div>              
        </div>   

        <div className="list-group col l9 ">
          <div className="d-flex flex-wrap w-100 justify-content-between list-group-item">
           {printlist}
          </div>
          <div className="align-right">
          { this.state.list.length > 0 ?  <button type="button" className="btn-floating btn-large scale-transition waves-effect waves-light" onClick={this.moreResults} value={this.state.limit}> + </button> : null } 
          </div>
        </div>   

      </div>
    );
  }


  placeChanged = event => {
    this.setState({
      near: event.target.value
    })
  };
//console.log(event)
  wishChanged = event => {
    this.setState({
      wish: event.target.value
    });
  };

moreResults = event => {
  this.setState({
    limit: +event.target.value + 3
  }, this.getResults );
};

getResults=()=> { 
  
  let near = this.state.near;
  let limit = this.state.limit;
  let wish = this.state.wish;
  // console.log(wish);  
    axios.get(API_DEFAULT+CLIENT+ '&limit='+ limit +'&near='+ near +'&section='+wish)
    .then(res=> {
      let items = res.data.response.groups[0].items;
      // console.log(items);
      this.setState({
        list:items
        // ?????????
      })
    })
    .catch(err=> {
      console.log(err)
    })
  }
}

export default App;
export {CLIENT};