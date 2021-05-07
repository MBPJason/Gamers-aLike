import { container, containerFluid, title } from "../../material-kit-react";

const homePageStyle = {
  container: {
    zIndex: "1",
    color: "#FFFFFF",
    ...container,
  },
  containerFluid: {
    zIndex: "1",
    color: "#FFFFFF",
    ...containerFluid,
  },
  title: {
    ...title,
  },
};

export default homePageStyle;
