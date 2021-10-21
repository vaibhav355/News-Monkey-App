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
    capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loding: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0b64bd19972d4e3588b9f1fb3ede6701&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loding: true });
        let data = await fetch(url);
        let parcedData = await data.json();
        this.setState({
            articles: parcedData.articles,
            totalResults: parcedData.totalResults,
            loding: false
        });
    }
    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loding && <Spinner />}
                <div className="row">
                    {!this.state.loding && this.state.articles.map((element) => (

                        <div className="col-md-4" key={element.url}>
                            {/* If you want to slice the title and the description then do this */}
                            {/* <NewsItem title={element.title?element.title.slice(0, 43):""} description={element.description?element.description.slice(0, 72):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/> */}

                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>

                    ))}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

                </div>
            </div>
        )
    }
}

export default News
