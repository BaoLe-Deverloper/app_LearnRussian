import { config } from "./../../config";
import axios from "axios";
import types from "./../Types";

export const addTest = test => {

    return dispatch => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            axios(config.UrlServerBase + "test", {
                data: test,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': "Bearer " + token

                }
            }).then(resp => {
                dispatch({ type: types.addTest, payload: resp.data });
                console.log(resp);
            })
        }
    }
}

export const getListTest = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        axios(config.UrlServerBase + "test", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'Authorization': "Bearer " + token
            }
        }).then(resp => {
            return resp.data;

        });
    }
}
export const getTest = id => {
    return dispatch => {
        console.log(id)
        const  token =  localStorage.getItem("accessToken");
        if (token) {
            axios(config.UrlServerBase + "test/" + id, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': "Bearer " + token
                }
            }).then(resp => {
                if (!resp.data.err)
                    dispatch({ type: types.getTest, payload: resp.data });

                    console.log(resp)
            });
        }
    }
}

export const checkTest = test => {
    return dispatch => {

        const  token =  localStorage.getItem("accessToken");
        if (token) {
            axios(config.UrlServerBase + "test/check", {
                method:"POST",
                data:test,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': "Bearer " + token
                }
            }).then(resp => {
                if (!resp.data.err)
                    dispatch({ type: types.checkTest, payload: resp.data.response });
            });
        }
    }
}


export const updateTest = test => {

    return dispatch => {
        test.questions.map(val=>{
           delete val._id;
           return val;
        });
        const token = localStorage.getItem("accessToken");
        if (token) {
            axios(config.UrlServerBase + "test", {
                data: test,
                method: "put",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': "Bearer " + token

                }
            }).then(resp => {
                dispatch({ type: types.updateTest, payload: resp.data });
            
            })
        }
    }
}
