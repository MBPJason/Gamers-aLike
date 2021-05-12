import React from "react";

// Stylesheet
import useStyles from "../../assets/jss/myStyles/homeContainerStyles";
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";

// Core Components
import { Grid } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import GameCard from "../GameCard/GameCard";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper/core";

SwiperCore.use([EffectCoverflow, Pagination]);

// Display should be like a carousel/tab from phone
// Able to switch between multiplayer genre carousel
// To Recommended Game List carousel
// To Games Last Played carousel
export default function HomeCardDisplay(props) {
  const { desktop } = props;

  // Styles
  const classes = useStyles();

  const mobileView = (
    <>
      <Swiper
        className='mySwiper swiper-container-h'
        spaceBetween={50}
        pagination={{
          clickable: true,
        }}
      >
        <SwiperSlide>Horizontal Slide 1</SwiperSlide>
        <SwiperSlide>
          <Swiper
            className='mySwiper2 swiper-container-v'
            direction={"vertical"}
            spaceBetween={50}
            pagination={{
              clickable: true,
            }}
          >
            <SwiperSlide>Vertical Slide 1</SwiperSlide>
            <SwiperSlide>Vertical Slide 2</SwiperSlide>
            <SwiperSlide>Vertical Slide 3</SwiperSlide>
            <SwiperSlide>Vertical Slide 4</SwiperSlide>
            <SwiperSlide>Vertical Slide 5</SwiperSlide>
          </Swiper>
        </SwiperSlide>
        <SwiperSlide>Horizontal Slide 3</SwiperSlide>
        <SwiperSlide>Horizontal Slide 4</SwiperSlide>
      </Swiper>
    </>
  );
  return (
    <>
      <div id={"Games Played"} className></div>
    </>
  );
}
