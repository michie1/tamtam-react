import React, { Component } from 'react';
import Carousel from 'nuka-carousel';
import axios from 'axios';

import './home.css';
import oxxio from './Slider/Oxxio.png';
import florensis from './Slider/Florensis.jpg';
import walibi from './Slider/Walibi.jpg';

class Home extends Component {
  mixins: [Carousel.ControllerMixin]

  constructor(props) {
    super(props);
    this.state = {
      'instagramItems': []
    };
  }

  getInitialState() {
    return {
      'instagramItems': []
    };
  }

  componentDidMount() {
    const url = 'https://www.instagram.com/tamtamnl/?__a=1';
    axios.get(url)
      .then((response) => {
        return Promise.resolve(response.data.graphql.user.edge_owner_to_timeline_media.edges.slice(6));
      })
      .then((edges) => {
        return Promise.resolve(edges.map((edge) => {
          return edge.node;
        }));
      })
      .then((nodes) => {
        this.setState({
          'instagramItems': nodes.map((node) => {
            return {
              image: node.thumbnail_resources[0].src,
              caption: node.edge_media_to_caption.edges[0].node.text
            }
          })
        });
      });
  }

  render() {
    const instagramItems = this.state.instagramItems.map((item, index) => {
      return <InstagramItem key={index} image={item.image} link="link" caption={item.caption} />;
    });

    return (
      <div id="home">
        <div id="heading">
          <Carousel>
            <img src={oxxio} alt="Oxxio"/>
            <img src={florensis} alt="Florensis"/>
            <img src={walibi} alt="Walibi"/>
          </Carousel>
        </div>
        <h2>We are Tam Tam</h2>
        <p>
          Tam Tam is a full service digital agency focussing on Dutch Digital Service Design.
        </p>
        <div id="instagram">
          <h3>Follow us on Instagram</h3>
          <h4>@ tamtamnl</h4>
          <ul>{instagramItems}</ul>
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
    );
  }
}

class InstagramItem extends Component {
  render() {
    return <li>
            <img src={this.props.image} alt="" />
            <br />
            <span>{this.props.caption}</span>
           </li>;
  }
}

export default Home;
