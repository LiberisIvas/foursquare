import React from 'react';
import axios from 'axios';


class Venue extends React.Component{

    state = {
        img: null
    }
    
    render(){
        const {value} = this.props;
        this.apiImageLink = "https://api.foursquare.com/v2/venues/" + value.venue.id + "/photos?client_secret=ISV2BFBDZIZL1WNG00D13F4CSLRXIARM0SXTSUU0KZSWWKMG&client_id=KVQIDLMIY4F0BIBEPQNSVQUSABBANRITCWD2ZL2MDPEGH1FM&v=20161101";
        console.log(this.apiImageLink);

        return (
    <div className="container-fluid">
        <div className="d-flex list-group-item list-group-item-action">
            <img src={this.state.img} alt="img" id="images"/>
        <div className="d-flex list-group-item list-group-item-action">         
            <div className="name-venue">
                <div className="name-venue">
                <p>Name:</p>
                {value.venue.name}
                </div>
                <div className="address-venue">
                <p>Address:</p>            
                {value.venue.location.address}
                </div>
            </div>
                   
        </div>
        </div>
    </div>
        )
    }

    getphotos=()=>{
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
    componentDidMount(){
        this.getphotos();
    }
}

export default Venue;