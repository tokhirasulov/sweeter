import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

document.addEventListener("click", function(e){
    if (e.target.dataset.like){
        clickLikeIcon(e.target.dataset.like)
    }  
    else if (e.target.dataset.retweet){
        clickRetweetIcon(e.target.dataset.retweet)
    } 
    else if (e.target.dataset.comment){
        clickReplyIcon(e.target.dataset.comment)
    }
    else if (e.target.id === 'tweet-btn'){
        clickTweetBtn(e.target.id === 'tweet-btn')
    }
})



function clickLikeIcon(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    } 
    else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}


function clickRetweetIcon(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    if (targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    } else {
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

function clickReplyIcon(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}


function clickTweetBtn(){
    const tweetInput = document.getElementById('tweet-input')
    if (tweetInput.value){
        tweetsData.unshift({
        handle: `RasulovTokhir`,
        profilePic: `images/tokhir.jpg`,
        likes: 0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4()
    })
    render()
    tweetInput.value = ``
    }
    
}

function getfeed(){
    let feed = ``

    tweetsData.forEach(function(tweet){
        let likeIcon = ``
        
        if (tweet.isLiked){
            likeIcon = "liked"
        }

        let retweetIcon = ``

        if (tweet.isRetweeted){
            retweetIcon = "retweeted"
        }

        let repliesHtml = ''
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
        <div class="tweet-reply">
            <div class="tweet-inner">
                <img src="${reply.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${reply.handle}</p>
                        <p class="tweet-text">${reply.tweetText}</p>
                    </div>
                </div>
        </div>
`
            })
        }

        feed +=`
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                    <span class='tweet-detail'>
                    <i class="fa-regular fa-comment-dots"
                    data-comment="${tweet.uuid}"></i>
                    ${tweet.replies.length}</span>
                    <span class='tweet-detail'>
                    <i class="fa-solid fa-heart ${likeIcon}"
                    data-like="${tweet.uuid}"></i>
                    ${tweet.likes}</span>
                    <span class='tweet-detail'>
                    <i class="fa-solid fa-retweet ${retweetIcon}" 
                    data-retweet="${tweet.uuid}"></i>
                    ${tweet.retweets}</span>
                    </div>   
                </div>            
            </div>   
            <div class="hidden" id="replies-${tweet.uuid}">
                ${repliesHtml}
        </div>
        ` 
    })
    return feed
}

function render(){
    document.getElementById("feed").innerHTML = getfeed()
}
render()