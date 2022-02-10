import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";
import axios from 'axios';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      text:'',
      predictResult:'',
      // 'serverUrl': 'http://127.0.0.1:5000/',
      'serverUrl': 'https://opinion-backend.herokuapp.com/',
    };
    // this.predict = this.predict.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = this.predict.bind(this);
  }
  
  handleChange(event) {    
    this.setState({
      value: event.target.value,
    });  
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.result);
    event.preventDefault();
  }

  predict(e) {

    e.preventDefault()
    const data = { 
          "TWEET": this.state.value,
      };
      console.log(data)
      
    axios.post(this.state.serverUrl + `/predict/`, data)
    .then((res) => {
      console.log('res is:'+ JSON.stringify(res.data.msg))
      alert('The subjectivity result for inserted text: \n'+this.state.value+'\n IS: '+res.data.msg)      
      // this.setState({predictResult:res.data})
      // console.log('result is: '+this.predictResult)
      // if (result){
      //   this.props.history.push({ 
      //     // pathname: '/PredictionResult',
      //     result:result,
      //   });
      //   console.log(this.result)

      // }else{
      //   alert('Error predicting data!!')
      // }

    })
    .catch(()=>{
        alert('Error retrieving data!!');
    })

  }

  render() {
    if (!this.props.data) return null;    
    const name = this.props.data.name;
    const description = this.props.data.description;
    const description1 = this.props.data.description1;
    const networks = this.props.data.social.map(function (network) {
      return (
        <li key={network.name}>
          <a href={network.url}>
            <i className={network.className}></i>
          </a>
        </li>
      );
    });
    return (
      <header id="home">
        <ParticlesBg type="circle" bg={true} />

        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className="current">
              <a className="smoothscroll" href="#home">
                Home
              </a>
            </li>
            <li>
              <a className="social-links" >{networks}
              </a>
            </li>
          </ul>
        </nav>

        <div className="row banner">
          <div className="banner-text">
            <Fade bottom>
              <h1 className="responsive-headline">{name}</h1>
            </Fade>
            <Fade bottom duration={1200}>
              <h3>{description}.</h3>
            </Fade>
            <Fade bottom duration={1200}>
              <h3>{description1}.</h3>
            </Fade>
            <hr />
            <Fade bottom duration={2000}>
              
            <form onSubmit={this.handleSubmit}>
              <container>
                <label className="prefix" style={{color: '#b6bbc6',backgroundColor: 'transparent'}}>Insert sentence:</label>{' '}
                <input  type="text" value={this.state.value} 
                onChange={this.handleChange}
                style={{width: "100%"}}
                />
              </container>      
              <input type="submit" value="Submit" />
            </form>
              
            </Fade>
          </div>
          <h5>Group Members:</h5>
          <hr
        style={{
            color: '#b6bbc6',
            backgroundColor: '#b6bbc6',
            height: 0.5
        }}
        />
        <ul>
          <li>Amr Shakhshir</li>
          <li>Sophia Abel</li>
          <li>Lena Greiner-Hiero</li>
          <li>Alina Krüger</li>
          <li>Chiara Loverso</li>
        </ul>
        </div>
        

        {/* <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p> */}
      </header>
    );
  }
}

export default Header;
