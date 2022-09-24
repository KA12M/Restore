import React, { useEffect } from "react";
import { Button } from "@mui/material";
import Slider from "react-slick";
import { changeScreen } from "../../app/store/home.slice";
import { useAppDispatch } from "../../app/store/store.config";

const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeScreen());

    return () => {
      dispatch(changeScreen());
    };
  }, [dispatch]);

  const setScreen = () => {
    dispatch(changeScreen());
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h2> Single Item</h2>
      <Button onClick={setScreen}>fullscreen</Button>
      <Slider {...settings}>
        {[1, 2, 3, 4, 5].map((item, i) => (
          <img
            key={i}
            src={"https://picsum.photos/200/300?" + i}
            alt=""
            height={360}
          />
        ))}
      </Slider>
    </div>
  );
};

export default HomePage;
