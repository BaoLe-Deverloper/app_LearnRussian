import { config } from "./../../config";
import axios from "axios";
import types from "./../Types";

export const getVocabularies = (idTopic,name) => {
console.log(name)
  return dispatch => {
    const token = localStorage.getItem("accessToken");
    return axios(
      config.UrlServerBase + "vocabulary/" + idTopic,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          'Authorization': "Bearer " + token
        }
      }).then(resp => {
        if (!resp.data.err) 
          dispatch({ type: types.getVocabulary, payload: {data:resp.data, name}} );

      });
  }
}
export const getTopics =() => {

  return dispatch => {
    const token = localStorage.getItem("accessToken");
    return axios(
      config.UrlServerBase + "topic" ,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          'Authorization': "Bearer " + token
        }
      }).then(resp => {
        if (!resp.data.err)
          dispatch({ type: types.getTopics, payload: resp.data });

      });
  }
}