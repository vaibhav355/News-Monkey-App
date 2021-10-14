import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    articles = [
        {
            "source": {
                "id": "al-jazeera-english",
                "name": "Al Jazeera English"
            },
            "author": "Faras Ghani",
            "title": "Ban? No ban? Afghan cricket chief offers hope to women athletes",
            "description": "Al Jazeera speaks to Afghanistan’s cricket chief on the future of female athletes in the country after Taliban takeover.",
            "url": "http://www.aljazeera.com/sports/2021/10/13/afghanistan-cricket-chief-on-future-of-women-and-sport",
            "urlToImage": "https://www.aljazeera.com/wp-content/uploads/2021/10/2013-09-12T120000Z_45608824_GM1E99C1E8101_RTRMADP_3_AFGHANISTAN-FOOTBALL-CELEBRATION.jpg?resize=1200%2C630",
            "publishedAt": "2021-10-13T05:18:07Z",
            "content": "Sport in Afghanistan faced an uncertain future following the Talibans takeover of the country in August this year.\r\nHundreds of athletes, especially female athletes, went into hiding or were evacuate… [+7111 chars]"
        },
        {
            "source": {
                "id": "fox-sports",
                "name": "Fox Sports"
            },
            "author": "FOX Sports",
            "title": "A World Cup With A New And Unfamiliar Twist",
            "description": "In different corners of the world, excitement is bubbling for the T20 World Cup. Martin Rogers looks at the future of cricket in the U.S.",
            "url": "http://www.foxsports.com/stories/other/cricket-t20-world-cup-with-new-unfamiliar-twist",
            "urlToImage": "https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2021/10/1408/814/622.2_Newsletter_1920x1080_Cricket_T20.jpg?ve=1&tl=1",
            "publishedAt": "2021-10-13T00:40:39Z",
            "content": "By Martin RogersFOX Sports Columnist\r\nA global sporting celebration, with an expected worldwide audience in excess of 1.5 billion, will get going this weekend. And, for the most part, Americans wont … [+4899 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
            "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
            "publishedAt": "2020-04-27T11:41:47Z",
            "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
            "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
            "publishedAt": "2020-03-30T15:26:05Z",
            "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
    ]
    constructor(){
        super();
        console.log("Hello I am a constructor from News component");
        this.state = {
            articles: this.articles,
            loding: false
        }
    }

    async componentDidMount(){
        console.log("componentDidMount")
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=0b64bd19972d4e3588b9f1fb3ede6701";
        let data = await fetch(url);
        let parcedData = await data.json();
        console.log(data);
    }

    render() {
        console.log("render")
        return (
            <div className="container my-3">
                <h2>NewsMonkey - Top Headlines</h2>
                <div className="row">
                    {this.state.articles.map((element)=>(

                    <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title.slice(0, 43)} description={element.description.slice(0, 72)} imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div>

                    ))}
                </div>  
            </div>
        )
    }
}

export default News
