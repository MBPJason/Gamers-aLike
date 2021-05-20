import React from "react";
import classNames from "classnames";

// Stylesheet
import useStyles from "../../assets/jss/myStyles/homeContainerStyles";
import "swiper/swiper-bundle.css";
// import "swiper/components/effect-fade/effect-fade.min.css";
// import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import { useLightTopShadowStyles } from "@mui-treasury/styles/shadow/lightTop";

// Core Components
import { Grid, Paper, Typography } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import GameCard from "../GameCard/GameCard";
import LobbyTable from "../LobbyTable/LobbyTable";
import SwiperCore, { Navigation, Pagination } from "swiper/core";

SwiperCore.use([Navigation, Pagination]);

// Test data. Will grab it from another method
// Faces don't need to be mapped over just set them in an array and send as prop
const faces = [
  "https://i.pravatar.cc/300?img=1",
  "https://i.pravatar.cc/300?img=2",
  "https://i.pravatar.cc/300?img=3",
  "https://i.pravatar.cc/300?img=4",
  "https://i.pravatar.cc/300?img=5",
  "https://i.pravatar.cc/300?img=6",
  "https://i.pravatar.cc/300?img=7",
  "https://i.pravatar.cc/300?img=8",
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
      "https://images.unsplash.com/photo-1519810755548-39cd217da494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
  },
  {
    slug: "1001",
    name: "Battlefield V",
    image:
      "https://images.unsplash.com/photo-1519810755548-39cd217da494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
  },
  {
    slug: "2020",
    name: "Super Smash Bros. Ultimate",
    image:
      "https://images.unsplash.com/photo-1519810755548-39cd217da494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
  },
  {
    slug: "300482",
    name: "StarCraft II: Legacy of the Void",
    image:
      "https://images.unsplash.com/photo-1519810755548-39cd217da494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
  },
];

const categories = [
  {
    id: "fightingGames",
    genre: "Fighting Games",
    summary:
      "1 v 1 sounds fun? See how well you control nuech or grabble to your opponent is one with the ground. Showing off that new combo you have been labbing out or looking for a test partner or a couple then then try you hand over here.",
    img: "https://cdn.wallpapersafari.com/17/42/yIYjul.jpg",
  },
  {
    id: "shootingGames",
    genre: "Shooting Games",
    summary:
      "1 v 1 sounds fun? Showing off that new combo you have been labbing out or looking for a test partner or a couple then then try you hand over here.",
    img: "https://cdn.wallpapersafari.com/17/42/yIYjul.jpg",
  },
  {
    id: "strategyGames",
    genre: "Strategy Games",
    summary:
      "Test your intellect and strategic prowess against many other players. Set up lobbies for you vs your friend or King of the Hill type lobbies.",
    img: "https://cdn.wallpapersafari.com/17/42/yIYjul.jpg",
  },
  {
    id: "mmoGames",
    genre: "MMO Games",
    summary:
      "1 v 1 sounds fun? Showing off that new combo you have been labbing out or looking for a test partner or a couple then then try you hand over here.",
    img: "https://cdn.wallpapersafari.com/17/42/yIYjul.jpg",
  },
  {
    id: "partyGames",
    genre: "Party Games",
    summary:
      "1 v 1 sounds fun? Showing off that new combo you have been labing out or looking for a test partner or a couple then then try you hand over here.",
    img: "https://cdn.wallpapersafari.com/17/42/yIYjul.jpg",
  },
];

const rows = [
  {
    Restricted: true,
    Requests: "Looking for 5 to start up a game",
    Players: "3/5", // TODO: Needs to be dynamically updated
    Creator: "MasterChief",
    Language: "English",
    lobbyID: "OH1H3HA8AN9U",
  },
  {
    Restricted: true,
    Requests: "Looking for 6 to start up a game",
    Players: "2/7", // TODO: Needs to be dynamically updated
    Creator: "CmdrShepard",
    Language: "English",
    lobbyID: "OH19KMD3WN9U",
  },
  {
    Restricted: false,
    Requests: "Looking for 4 to start up a game",
    Players: "3/5", // TODO: Needs to be dynamically updated
    Creator: "MasterChief",
    Language: "English",
    lobbyID: "OH1H73P2WN9U",
  },
  {
    Restricted: true,
    Requests: "Looking for 3 to start up a game",
    Players: "1/4", // TODO: Needs to be dynamically updated
    Creator: "DeezNuts",
    Language: "English",
    lobbyID: "OHPS6N48HWN9U",
  },
  {
    Restricted: false,
    Requests: "Looking for 9 to start up a game",
    Players: "3/10", // TODO: Needs to be dynamically updated
    Creator: "NoobSlayer",
    Language: "English",
    lobbyID: "OH1H3492KL9U",
  },
];

// TODO: HAVE IMAGES FOR DIFFERENT SCREEN SIZES
// screen size <= md ~720px images
// screen size <= lg 1080px images
// screen size = xl 2Kpx images

// THIS IS JUST TEST DATA
const tableGames = [
  {
    gameName: "Among Us",
    gameSlug: "123",
    gameBackground:
      "https://images.wallpapersden.com/image/download/among-us_bGhpaW2UmZqaraWkpJRnZWltrWdlaW0.jpg",
  },
  {
    gameName: "Starcraft 2",
    gameSlug: "300482",
    gameBackground:
      "https://images.blz-contentstack.com/v3/assets/blt2ef8b4fee426fd3e/bltf647443249f7b7e0/5f468c730cfe4555ebb3a6df/Wallpaper-5-1920.jpg",
  },
  {
    gameName: "Halo Infinite",
    gameSlug: "182764",
    gameBackground: "https://wallpaperaccess.com/full/910169.jpg",
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

  const tabletView = (
    <>
      <div></div>
    </>
  );

  const desktopView = (
    <>
      <Grid
        container
        justify='center'
        alignItems='stretch'
        spacing={1}
        className={classes.root}
      >
        <Grid item xs={12} component='main'>
          <Swiper
            tag='section'
            wrapperTag='ul'
            id='genres'
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            navigation
          >
            {categories.map(({ id, genre, summary, img }) => (
              <SwiperSlide tag='li' key={id} id={id}>
                <Grid
                  item
                  sm={8}
                  md={7}
                  className={classes.carouselImg}
                  component='img'
                  src={img}
                  alt={genre}
                />
                <Grid item sm={4} md={5} component={Paper} elevation={6} square>
                  <div className={classes.carouselPaper}>
                    <Typography component='h2' variant='h4'>
                      {genre}
                    </Typography>
                    <Typography variant='subtitle1'>{summary}</Typography>
                  </div>
                </Grid>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
        <Grid item xs={12} className={classes.sectionTitle}>
          <Typography variant='h5'>Check out these lobbies</Typography>
        </Grid>
        {tableGames.map(({ gameName, gameSlug, gameBackground }) => (
          <Grid item lg={4}>
            <LobbyTable
              key={gameName}
              gameName={gameName}
              slug={gameSlug}
              gameBackground={gameBackground}
              lobbies={rows}
              imgStyle={classes.tableBackground}
              root={classes.tableDesktop}
              tableRowHover={classes.tableRow}
              size={"small"}
              main={false}
            />
          </Grid>
        ))}
        <br />
        <br />
        {/* Test Placements for game cards */}
        <Grid item xs={12} className={classes.sectionTitle}>
          <Typography variant='h5'>Recommended Games</Typography>
        </Grid>
        {lastPlayedGames.map(({ slug, name, image }) => (
          <Grid item xs={12} lg={2}>
            <GameCard
              key={slug}
              slug={slug}
              name={name}
              image={image}
              faces={faces}
              width={150}
              root={classNames(classes.cardSize, shadowStyles)}
              title={classes.cardTitle}
            />
          </Grid>
        ))}
        <br />
        <br />
        <Grid item xs={12}>
          <Typography variant='h5' className={classes.sectionTitle}>
            Jump Back into
          </Typography>
        </Grid>
        {lastPlayedGames.map(({ slug, name, image }) => (
          <Grid item xs={12} lg={2}>
            <GameCard
              key={slug}
              slug={slug}
              name={name}
              image={image}
              faces={faces}
              width={150}
              root={classNames(classes.cardSize, shadowStyles)}
              title={classes.cardTitle}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
  return <>{desktop ? desktopView : tabletView}</>;
}
