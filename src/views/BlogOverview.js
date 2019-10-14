import React, { Component} from "react";

import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "../components/Info/UsersOverview";
import UserInfo from "../components/Info/UserInfo";
// import NewDraft from "../components/Info/NewDraft";
// import Discussions from "../components/Info/Discussions";
// import TopReferrals from "./../components/common/TopReferrals";

class BlogOverview extends Component {

  state = {
    smallStats: []
  }
  getData= data =>{
    const total_markListen = data.listening.total_mark;
    const total_markRead = data.reading.total_mark;
    const total_markTest = data.testing.total_mark;
    const sum = total_markListen + total_markRead + total_markTest;
    const percentageListen = data.listening.total_Num !== 0 ? Math.round(total_markListen  / data.listening.total_Num):0;
    const percentageRead = data.reading.total_Num !== 0 ? Math.round(total_markListen  / data.reading.total_Num):0;
    const percentageTest = data.testing.total_Num !== 0 ? Math.round(total_markListen  / data.testing.total_Num):0;
    const percentageSum = Math.round((percentageListen + percentageRead + percentageTest)/3);
    this.setState({
      smallStats: [
        {
          label: "Listening",
          value: total_markListen,
          percentage: percentageListen +"%",
          increase: percentageListen > 50,
          decrease: percentageListen<50,
          attrs: { md: "6", sm: "6" },
        },
        {
          label: "Reading",
          value: total_markRead,
          percentage: percentageRead + "%",
          increase: percentageRead>50,
          decrease: percentageRead<50,
          attrs: { md: "4", sm: "6" }
        },
        {
          label: "Testing",
          value: total_markTest,
          percentage: percentageTest + "%",
          increase: percentageTest > 50,
          decrease: percentageTest<50,
          attrs: { md: "4", sm: "6" }
        },
        {
          label: "Sum",
          value: sum,
          percentage: percentageSum +"%",
          increase: percentageSum > 50,
          decrease: percentageSum < 50,
          attrs: { md: "4", sm: "6" },
        }
      ]})
  }
  render(){
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="User's Dashboard" subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row>

        {/* Small Stats Blocks */}
        <Row>
          {this.state.smallStats.map((stats, idx) => (
            <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.value}
                percentage={stats.percentage}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
        </Row>

        <Row>
          {/* Users Overview */}
          <Col lg="8" md="12" sm="12" className="mb-4">
            <UsersOverview sendData={this.getData} />
          </Col>

          {/* Users by Device */}
          <Col lg="4" md="6" sm="12" className="mb-4">
            <UserInfo />
          </Col>

          {/* New Draft */}
          {/* <Col lg="4" md="6" sm="12" className="mb-4">
            <NewDraft />
          </Col> */}

          {/* Discussions */}
          {/* <Col lg="5" md="12" sm="12" className="mb-4">
            <Discussions />
          </Col> */}

          {/* Top Referrals */}
          {/* <Col lg="3" md="12" sm="12" className="mb-4">
            <TopReferrals />
          </Col> */}
        </Row>
      </Container>
    );

  }
} 


export default BlogOverview;
