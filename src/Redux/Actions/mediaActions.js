import { config } from "./../../config";
import axios from "axios";
import types from "./../Types";

export const getListVideos= () =>{
    return dispatch => {
      const local_data =JSON.parse(localStorage.getItem("videos_media"));
      if( local_data ===null || local_data.time > new Date().getHours + 1){
        const token = localStorage.getItem("accessToken");
        if (token) {
          axios(config.UrlServerBase + "video", {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'Authorization': "Bearer " + token
            }}).then(resp => {
              if(!resp.data.message){
                
                const data = {videos : resp.data, time : new Date().getHours}
                localStorage.setItem("videos_media", JSON.stringify(data))
                dispatch({type:types.getVideo, payload:resp.data} );
              }
                
            })
        }
      }else{
        dispatch({type:types.getVideo, payload:local_data.videos} );
      }
    }
  }
  
  export const getListPost = () => {
    return dispatch =>{
      const newPost = JSON.parse(localStorage.getItem("newPost"));
      if (newPost === null || newPost.time > new Date().getHours + 3) {
         axios.get("https://newsapi.org/v2/top-headlines?country=ru&apiKey="+config.newsApi_key+"&fbclid=" + config.newsApi_fbclid).then(resp => {
              const data = { news: resp.data.articles, time: new Date().getHours }
            
              localStorage.setItem("newPost", JSON.stringify(data));
              dispatch({type:types.getPost, payload:data.news})
             });
       }else{
         dispatch({type:types.getPost, payload:newPost.news})
       }
    }
  }