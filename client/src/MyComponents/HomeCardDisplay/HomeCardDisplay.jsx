import React from "react";
import classNames from "classnames";

// Stylesheet
import useStyles from "../../assets/jss/myStyles/homeContainerStyles";
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';

// Core Components
import { Grid } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import GameCard from "../GameCard/GameCard";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper/core";

SwiperCore.use([EffectCoverflow, Pagination]);

// Test data. Will grab it from another method
// Faces don't need to be mapped over just set them in an array and send as prop
const faces = [
  "https://i.pravatar.cc/300?img=1",
  "https://i.pravatar.cc/300?img=2",
  "https://i.pravatar.cc/300?img=3",
  "https://i.pravatar.cc/300?img=4",
];

const lastPlayedGames = [
  {
    slug: "123",
    name: "Among Us",
    image:
      "http://www.posterswholesale.com/resize/Shared/Images/Product/Among-Us/54261.jpg?bw=500&bh=500",
  },
  {
    slug: "456",
    name: "Call of Duty",
    image:
      "https://images.unsplash.com/photo-1519810755548-39cd217da494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
  },
  {
    slug: "789",
    name: "Dragon Ball FighterZ",
    image:
      "https://en.wikipedia.org/wiki/Dragon_Ball_FighterZ#/media/File:DBFZ_cover_art.jpg",
  },
  {
    slug: "1001",
    name: "Battlefield V",
    image:
      "https://en.wikipedia.org/wiki/Battlefield_V#/media/File:Battlefield_V_standard_edition_box_art.jpg",
  },
  {
    slug: "2020",
    name: "Super Smash Bros. Ultimate",
    image:
      "https://en.wikipedia.org/wiki/Super_Smash_Bros._Ultimate#/media/File:Super_Smash_Bros._Ultimate.jpg",
  },
  {
    slug: "300482",
    name: "StarCraft II: Legacy of the Void",
    image:
      "https://en.wikipedia.org/wiki/StarCraft_II:_Legacy_of_the_Void#/media/File:StarCraft_II_-_Legacy_of_the_Void_cover.jpg",
  },
];

// Display should be like a carousel/tab from phone
// Able to switch between multiplayer genre carousel
// To Recommended Game List carousel
// To Games Last Played carousel
export default function HomeCardDisplay(props) {
  const { desktop } = props;

  // Styles
  const classes = useStyles();
  const shadowStyles = useLightTopShadowStyles();

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

  const desktopView = (
    <>
      <Grid
        container
        className={classes.root}
      >
        {lastPlayedGames.map(({ slug, name, image }) => (
          <Grid item xs={11} sm={11} md={6} lg={4}>
            <GameCard
              key={slug}
              slug={slug}
              name={name}
              image={image}
              faces={faces}
              width={265}
              root={classNames(classes.cardSize, shadowStyles)}
              title={classes.font}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
  return <>{desktopView}</>;
}
