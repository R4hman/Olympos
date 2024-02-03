import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReusableButton from "../reusable/ReusableButton";
import { CustomContainer, theme } from "../../theme";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const data = [
  {
    id: 77,
    img: "/assets/flight.png",
    subtitle: "Turlarımızla dünyanın gözəlliklərinə yaxından baxın! Ailənizlə xoş anlar yaşamaq üçün ən yaxşı turlar bizimlədir! Təbiət qoynunda dinc anlar üçün indicə rezervasiya edin!",
    btnAction: "Turlara bax",
    title: "Turlar",
    styleSide: "left",
    url: "/turlar",
  },
  {
    id: 99,
    img: "/assets/hotel.png",
    subtitle: "Otellərimizdə rahatlıq sizin üçün nəzərdə tutulub. Evdən uzaqda, ev rahatlığında: Sizin üçün özəl olanı bizimlə tapın! Unudulmaz anlar üçün rezervasiya edin. Biz buradayıq, sizi gözləyirik!”",
    btnAction: "Otellərə bax",
    title: "Otellər",
    styleSide: "right",
    url: "/otellər",
  },
];

const ShowCard = () => {
  const cardRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [componentPosition, setComponentPosition] = useState(0);

  useEffect(() => {
    setComponentPosition(cardRef.current.getBoundingClientRect().top);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isPassed = scrollPosition > componentPosition;

  return (
    <Grid
      ref={cardRef}
      container
      sx={{
        // backgroundColor: "green",
        padding: "5rem 0 3rem 0",
        justifyContent: "center",
        // backgroundColor: isPassed ? "red" : null,
      }}
      spacing={6}
      columns={16}
    >
      {data.map((card, i) => (
        <Grid
          component={motion.div}
          initial={{ x: card.styleSide === "left" ? -250 : 250 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
          variant="p"
          key={card.id}
          item
        >
          <Card
            sx={{
              position: "relative",
              width: {
                xs: "350px",
                sm: "575px",
              },
              textAlign: "center",
              height: "559px",
            }}
          >
            <CardMedia
              sx={{ position: "absolute", inset: 0 }}
              component="img"
              image={card.img}
              // width="100"
              height="559px"
              alt="flight image"
            ></CardMedia>

            <CardContent
              sx={{
                zIndex: 1,
                padding: "0 4rem",
                position: "absolute",
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Typography
                // sx={{ color: "red", zIndex: "fab" }}
                color="white"
                variant="h4"
                bottom="0"
                gutterBottom
                fontWeight="bold"
              >
                {card.title}
              </Typography>
              <Typography
                // sx={{ color: "red", zIndex: "fab" }}
                color="white"
                variant="h6"
                bottom="0"
                gutterBottom
              >
                {card.subtitle}
              </Typography>
              <CardActions
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ReusableButton
                  width={144}
                  height={48}
                  bgColor={theme.palette.primary.main}
                >
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                    to={card.url}
                  >
                    {card.btnAction}
                  </Link>
                </ReusableButton>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ShowCard;
