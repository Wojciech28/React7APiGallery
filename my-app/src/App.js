import React, { Component } from 'react';
import {
  
  BrowserRouter,
  Switch,
  Route,
  Redirect
  
} from "react-router-dom";

import './App.css';
import Header from './Header.js'
import Photo from './Photo.js'
import apiKey from './config';
import axios from 'axios';
import './index.css'
import Results from './Results';
import Error from './Error'

class App extends Component {
  state={
    query :" ",
    images:[],
    forest:[],
    sky:[],
    sea:[],
    disabled: true,
    isLoading: true,
    error: null
  };

  fetchData=(term)=>{
    this.setState({images:[],disabled:true,isLoading: true})
    let url=`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${term}&per_page=24&format=json&nojsoncallback=1`;
    axios.get(url)
      .then(response=>{
          if(response.data.photos.photo.length===0){
            this.setState({disabled:false,isLoading:false})
            
          }else{
            this.setState({isLoading:false})
          }

          this.setState({images:response.data.photos.photo,query:term})

          if(term==="forest"||term==="sky"||term==="sea"){
            this.setState({[term]:response.data.photos.photo})
          }
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({error:"url not found"});
        }
       }
      )
  }
  
  componentDidMount(){
    this.fetchData("forest")
    this.fetchData("sky")
    this.fetchData("sea")
    this.setState({disabled: true})
    
  }
  
  render(){
    return (
      <div className="container">
        <BrowserRouter >
          <Switch>
              <Route exact path="/"><Redirect to="/forest"/></Route>
              <Route path="/search/:query"  history={this.props.history} render={()=>
                  <div>
                    <Header onSearch={this.fetchData} />
                    <Photo  images={this.state.images} disabled={this.state.disabled} query={this.state.query} loader={this.state.isLoading} />
                    {!this.state.disabled && <Results/>}
                  </div>
              }/>
              <Route exact path="/sea" render={()=>
                  <div>
                    <Header onSearch={this.fetchData} />
                    <Photo  images={this.state.sea} disabled={this.state.disabled} query={'sea'}/>
                  </div>
              }/>
              <Route exact path="/sky" render={()=>
                  <div>
                    <Header onSearch={this.fetchData} />
                    <Photo  images={this.state.sky} disabled={this.state.disabled} query={'sky'}/>
                  </div>
              }/>
              <Route exact path="/forest" render={()=>
                  <div>
                    <Header onSearch={this.fetchData} />
                    <Photo  images={this.state.forest} disabled={this.state.disabled} query={'forest'} />
                  </div>
              }/>
              <Route component={Error}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
