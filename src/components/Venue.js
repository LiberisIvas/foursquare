import React from 'react';
import axios from 'axios';
import Link from './Link';
import {CLIENT} from '../App';

class Venue extends React.Component{

    state = {
        img: null
    }
    
    getphotos() {
        axios.get( this.apiImageLink )
        .then(res=> {
            let itemImage = res.data.response.photos.items[0];
            this.setState({
                img: itemImage.prefix + '200x200' + itemImage.suffix
            });
          })
          .catch(err=> {
            console.log(err)
          });
    }
    //state will change 
    componentWillReceiveProps(nextProps) {
        if(nextProps.img == null) {
            axios.get( this.apiImageLink )
            .then(res=> {
                let itemImage = res.data.response.photos.items[0];
                console.log(res)
                this.setState({
                    img: itemImage.prefix + '200x200' + itemImage.suffix
                });
              })
              .catch(err=> {
                console.log(err)
            })
        }
    }
    componentDidMount() {
        this.getphotos()
    }
    

    render() {



        const value = this.props.value;
        // const {value} = this.props;
    
        const link = <Link linkId={value.venue.id}/>;
        console.log(link)
        
        this.apiImageLink = "https://api.foursquare.com/v2/venues/" + value.venue.id + "/photos?"+CLIENT+"&v=20161101";

        return (
            
    <div className="container-fluid">
        <div className="d-flex list-group-item list-group-item-action">
            <img src={this.state.img} alt="img" id="images"/>
        <div className="d-flex list-group-item list-group-item-action">         
            <div className="name-venue">
                <div className="name-venue">
                <p>Name:</p> {value.venue.name}
                </div>
                <div className="address-venue">
                <p>Address:</p>            
                <a href={`http://maps.google.com/?q=${value.venue.location.address}`}>
                {value.venue.location.address} </a>              
                {link}
                
                
                </div>
                
            </div>
        </div>
        </div>
    </div>
        )
    } 
}


export default Venue;