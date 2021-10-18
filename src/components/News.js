import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
      }
      
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
      }

    constructor(){
        super();
        console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loding: false,
            page: 1
        }
    }

    async componentDidMount(){
        console.log("componentDidMount")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0b64bd19972d4e3588b9f1fb3ede6701&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loding: true});
        let data = await fetch(url);
        let parcedData = await data.json();
        console.log(parcedData);
        this.setState({
            articles: parcedData.articles, 
            totalResults: parcedData.totalResults,
            loding: false
        });
    }

    handlePrevClick = async ()=>{
        console.log("previous");
        
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0b64bd19972d4e3588b9f1fb3ede6701&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loding: true});
        let data = await fetch(url);
        let parcedData = await data.json();
        console.log(parcedData)

        this.setState({
            page: this.state.page - 1,
            articles: parcedData.articles,
            loding: false
        })
    }

    handleNextClick = async ()=>{
        console.log("Next");
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0b64bd19972d4e3588b9f1fb3ede6701&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loding: true});
            let data = await fetch(url);
            let parcedData = await data.json();

            this.setState({
                page: this.state.page + 1,
                articles: parcedData.articles,
                loding: false
            })
        }
    }

    render() {
        console.log("render")
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{margin: '35px 0px'}}>NewsMonkey - Top Headlines</h1>
                {this.state.loding && <Spinner/>}
                <div className="row">
                    {!this.state.loding && this.state.articles.map((element)=>(

                    <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title.slice(0, 43):""} description={element.description?element.description.slice(0, 72):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div>

                    ))}
                </div> 
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

                </div> 
            </div>
        )
    }
}

export default News
