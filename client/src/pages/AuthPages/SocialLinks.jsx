import React from "react";
import Button from "../../components/CustomButtons/Button.js";
import API from "../../utils/API";

// Need to bring in styling and Icons

export default function SocialLinks(props) {
  return (
    <>
      <Button
        color='twitter'
        size='lg'
        href='#'
        target='_blank'
        rel='noopener noreferrer'
        fullWidth
        onClick={(e) => {
          API.twitterPassport(e, props.type);
          props.method("non-local");
        }}
      >
        <i className={"fab fa-twitter"} /> Connect with Twitter
      </Button>
      <br />
      <Button
        color='facebook'
        size='lg'
        href='#'
        target='_blank'
        rel='noopener noreferrer'
        fullWidth
        onClick={(e) => {
          API.facebookPassport(e, props.type);
          props.method("non-local");
        }}
      >
        <i className={"fab fa-facebook-square"} /> Connect with FaceBook
      </Button>
      <br />
      <Button
        color='google'
        size='lg'
        href='#'
        target='_blank'
        rel='noopener noreferrer'
        fullWidth
        onClick={(e) => {
          API.googlePassport(e, props.type);
        }}
      >
        <i className={"fab fa-google"} /> Connect with Google
      </Button>
      <br />
    </>
  );
}
