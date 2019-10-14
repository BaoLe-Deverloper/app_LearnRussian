import React from "react";
import { Row, Card, CardHeader, CardBody } from "shards-react";
import { config } from "./../../config";
import axios from "axios";

import Chart from "../../utils/chart";

class UsersOverview extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
      const chartOptions = {
        ...{
          responsive: true,
          legend: {
            position: "top"
          },
          elements: {
            line: {
              // A higher value makes the line look skewed at this ratio.
              tension: 0.3
            },
            point: {
              radius: 0
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: false,
                ticks: {
                  callback(tick, index) {
                    // Jump every 7 values on the X axis labels to avoid clutter.
                    return index % 7 !== 0 ? "" : tick;
                  }
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  suggestedMax: 45,
                  callback(tick) {
                    if (tick === 0) {
                      return tick;
                    }
                    // Format the amounts using Ks for thousands.
                    return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
                  }
                }
              }
            ]
          },
          hover: {
            mode: "nearest",
            intersect: false
          },
          tooltips: {
            custom: false,
            mode: "nearest",
            intersect: false
          }
        }
      };
      const token = localStorage.getItem("accessToken");
      if (token) {
        axios(config.UrlServerBase + "mark", {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Authorization': "Bearer " + token

          }
        }).then(resp => {
          if (!resp.data.err) {
    
            this.props.sendData(resp.data)
            const data = resp.data;
            const marksListen = data.listening.details.map(val => {
              return val.mark;
            });
            const marksRead = data.reading.details.map(val => {
              return val.mark;
            });
            const marksTest = data.testing.details.map(val => {
              return val.mark;
            });

            
            const   chartData=  {
                labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
                datasets: [
                  {
                    label: "Listening",
                    fill: "start",
                    data: marksListen,
                    backgroundColor: "rgba(0,123,255,0.1)",
                    borderColor: "rgba(0,123,255,1)",
                    pointBackgroundColor: "#ffffff",
                    pointHoverBackgroundColor: "rgb(0,123,255)",
                    borderWidth: 1.5,
                    pointRadius: 0,
                    pointHoverRadius: 3
                  },
                  {
                    label: "Reading",
                    fill: "start",
                    data: marksRead,
                    backgroundColor: "rgba(255,65,105,0.1)",
                    borderColor: "rgba(255,65,105,1)",
                    pointBackgroundColor: "#ffffff",
                    pointHoverBackgroundColor: "rgba(255,65,105,1)",
                    borderWidth: 1.5,
                    pointRadius: 0,
                    pointHoverRadius: 2,
                    pointBorderColor: "rgba(255,65,105,1)"
                  },
                  {
                    label: "Testing",
                    fill: "start",
                    data: marksTest,
                    backgroundColor: "#04f00247",
                    borderColor: "#035703",
                    pointBackgroundColor: "#ffffff",
                    pointHoverBackgroundColor: "#035703",
                    borderWidth: 1,
                    pointRadius: 0,
                    pointHoverRadius: 2,
                    pointBorderColor: "#035703"
                  }
                ]
              };
            const BlogUsersOverview = new Chart(this.canvasRef.current, {
              type: "LineWithLine",
              data: chartData,
              options: chartOptions
            });

            // They can still be triggered on hover.
            const buoMeta = BlogUsersOverview.getDatasetMeta(0);
            buoMeta.data[0]._model.radius = 0;
            buoMeta.data[
              chartData.datasets[0].data.length - 1
            ]._model.radius = 0;

            // Render the chart.
            BlogUsersOverview.render();
           
          }
        });
      }
     
    

  }

  render() {

    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Users Result</h6>
        </CardHeader>
        <CardBody className="pt-0">
          <Row className="border-bottom py-2 bg-light">

          </Row>
          <canvas
            height="120"
            ref={this.canvasRef}
            style={{ maxWidth: "100% !important" }}
          />
        </CardBody>
      </Card>
    );
  }
}


export default UsersOverview;
