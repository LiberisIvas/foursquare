import React from 'react';
import axios from 'axios';
import {CLIENT} from '../App';


class Link extends React.Component {
    state ={
        link: null
    }

getlinks() {
    axios.get( this.apiImageLink )
    .then(res=> {
        let itemLink = res.data.response.links.items[0];
        console.log(res)
        this.setState({
            link: 'test'
        });
      })
      .catch(err=> {
        console.log(err)
      });           
}

componentDidMount() {
    this.getlinks()
}

render () {
    this.apiImageLink = "https://api.foursquare.com/v2/venues/" + this.props.linkId + "/links?"+CLIENT+"&v=20161101";
    const {value} = this.props;

    return (
        <div className="link-venue">
        <a href={this.state.link}>Link</a>        
        </div>

    )
 }


}




export default Link;