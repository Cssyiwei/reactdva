import React from "react";
import { tjjjlb, cxgglb } from "../../services/example.js";
import { Carousel } from "antd-mobile";
import style from "./css/zyhome.less";

class Swipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { List: [] };
    this.handlerNewFundEvent = this.handlerNewFundEvent.bind(this);
    this.handlerAdListEvent = this.handlerAdListEvent.bind(this);
  }

  handleTjjjlb() {
    tjjjlb({ moduleNo: this.props.moduleNo })
      .then((data) => {
        if (data.isSuccess === "0") {
          if (data.content.fundList && data.content.fundList.length > 0) {
            this.setState({ List: data.content.fundList.slice(0, 3) });
            // this.setState({ showRadio: true });
          } else {
            // this.setState({ showRadio: false });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleAdcolumn() {
    cxgglb({ adcolumn: this.props.moduleNo })
      .then((data) => {
        if (data.isSuccess === "0") {
          if (data.content.adList && data.content.adList.length > 0) {
            this.setState({ List: data.content.adList });
            // this.setState({ showRadio: true });
          } else {
            // this.setState({ showRadio: false });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handlerNewFundEvent(item) {
    if (localStorage.custId === null && localStorage.custNo === null) {
      this.props.history.push("/login");
      return;
    }
    if (item.hrefurllist && item.hrefurllist[0].buttonfunction === "5") {
      window.location.href = item.hrefurllist[0].hrefurl;
    } else {
      this.props.history.push("/market/" + item.fundcode);
    }
  }
  handlerAdListEvent(item) {
    if (item.linktype === "0") {
      this.props.history.push(`/market/${item.fundcode}`);
    } else {
      window.location.href = item.hrefurl;
    }
  }
  render() {
    return (
      this.state.List.length > 0 && (
        <section>
          <Carousel
            autoplay
            autoplayInterval={3000}
            infinite
            dotStyle={{
              width: "0.1rem",
              height: "0.1rem",
            }}
            dotActiveStyle={{
              background: "#ff2525",
              width: "0.1rem",
              height: "0.1rem",
            }}
          >
            {this.state.List.map((item, index) => {
              if (this.props.moduleNo === "29") {
                return (
                  <Template1
                    key={index}
                    item={item}
                    handlerNewFundEvent={this.handlerNewFundEvent}
                  />
                );
              } else if (this.props.moduleNo === "5") {
                return (
                  <Template2
                    key={index}
                    item={item}
                    handlerAdListEvent={this.handlerAdListEvent}
                  />
                );
              } else {
                return <div>暂无数据</div>;
              }
            })}
          </Carousel>
        </section>
      )
    );
  }
  // 挂载函数
  componentDidMount() {
    if (this.props.moduleNo === "99") {
      this.handleTjjjlb();
    } else if (this.props.moduleNo === "5") {
      this.handleAdcolumn();
    }
  }
}
function Template1(props) {
  const item = props.item;
  return (
    <div className={style.caroudiv}>
      {item.sortno < 20 ? (
        <img
          alt=""
          className={style.bgimg}
          src={require("../../assets/zyhome/banner_new_product.png")}
          onClick={() => props.handlerNewFundEvent(item)}
        />
      ) : (
        <img
          alt=""
          src={require("../../assets/zyhome/banner_hot_product.png")}
          onClick="clickHandlerNewFund(item, index)"
        />
      )}
      <div
        className={style.leftDiv}
        onClick={() => props.handlerNewFundEvent(item)}
      >
        <p className={style.title}>{item.fundname}</p>
        <p className={style.desc}>{item.titledescrip1}</p>
        <img
          alt=""
          onClick={() => props.handlerNewFundEvent(item)}
          className={style.img}
          src={require("../../assets/zyhome/button_shouye_banner.png")}
        />
      </div>
    </div>
  );
}
function Template2(props) {
  const item = props.item;
  return (
    <div className={style.caroudiv}>
      <img
        alt=""
        className={style.bgimg}
        src={item.picurl}
        onClick={() => props.handlerAdListEvent(item)}
      />
    </div>
  );
}
export default Swipe;
