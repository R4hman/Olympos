import {
  Box,
  Grid,
  IconButton,
  List,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { theme } from "../../theme";
import { v4 as uuidv4 } from "uuid";

import FacebookIcon from "@mui/icons-material/Facebook";

import InstagramIcon from "@mui/icons-material/Instagram";
import SendEmailFromClient from "./SendEmailFromClient";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";
import FooterRegionList from "./FooterRegionList";
const destinations = [
  { name: "Quba", url: "https://az.wikipedia.org/wiki/Quba" },
  { name: "Qusar", url: "https://az.wikipedia.org/wiki/Qusar" },
  {
    name: "Şahdağ",
    url: "https://az.wikipedia.org/wiki/%C5%9Eahda%C4%9F_(zirv%C9%99)",
  },
  { name: "Balakən", url: "https://az.wikipedia.org/wiki/Balak%C9%99n_rayonu" },
  { name: "Zaqatala", url: "https://az.wikipedia.org/wiki/Zaqatala_rayonu" },
  { name: "Qax", url: "https://az.wikipedia.org/wiki/Qax" },
  { name: "Şəki", url: "https://az.wikipedia.org/wiki/%C5%9E%C9%99ki" },
  {
    name: "Qəbələ",
    url: "https://az.wikipedia.org/wiki/Q%C9%99b%C9%99l%C9%99",
  },
  { name: "Lənkəran", url: "https://az.wikipedia.org/wiki/L%C9%99nk%C9%99ran" },
  { name: "Lerik", url: "https://az.wikipedia.org/wiki/Lerik_rayonu" },
  { name: "Astara", url: "https://az.wikipedia.org/wiki/Astara_rayonu" },
  { name: "Tufandağ", url: "https://az.wikipedia.org/wiki/Tufanda%C4%9F" },
];

const sxMuiList = {
  width: "50%",
  textAlign: "center",
};

const sxButtonSubscribe = {
  padding: "8px 16px",
  backgroundColor: "#112211",
  color: "#ffffff",
  borderRadius: "5px",
  textTransform: "capitalize",
  fontFamily: "Montserrat",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "17px",
  letterSpacing: "0em",
  textAlign: "left",
  width: "104px",
  height: "56px",

  "&:hover": {
    backgroundColor: "#112211",
  },
};

const Footer = () => {
  const isMedium = useMediaQuery("(max-width: 900px)");
  const isMobile = useMediaQuery("(max-width: 500px)");

  return (
    <Box
      backgroundColor={theme.palette.primary.main}
      padding="14rem 0 4rem 0"
      position="relative"
      // mt="10rem"
      mt={isMedium ? "28rem " : "10rem"}
    >
      <Grid
        container
        // display="grid"
        // gridTemplateColumns="repeat(12, 1fr)"
        // columnGap="7rem"
        sx={{
          borderRadius: "20px",

          transform: "translate(-50%, -50%)",
        }}
        width="84%"
        backgroundColor={theme.palette.primary.light}
        margin="0 auto"
        position="absolute"
        left="50%"
        top={isMedium ? "-20%" : "5%"}
        // columnGap="5rem"
      >
        <Grid item xs={12} md={6} sx={{ padding: "24px" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "44px",
              fontWeight: 700,
              lineHeight: "54px",
              letterSpacing: "0em",
              textAlign: "left",
              color: "black",
            }}
            gutterBottom
          >
            Turlardan <br /> xəbərdar ol
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "25.26px",
              letterSpacing: "0em",
              textAlign: "left",
              color: "black",
            }}
            gutterBottom
          >
            Həmən abunə olun!
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "20px",
              letterSpacing: "0em",
              textAlign: "left",
              color: "black",
            }}
            gutterBottom
          >
            Yeni turlardan və otellərdən , endirimlərdən ilk siz xəbərdar olun.
          </Typography>
          {/* footer */}
          <SendEmailFromClient sxButtonSubscribe={sxButtonSubscribe} />
          {/* <Stack direction="row" spacing={2}>
            <TextField
              label="Your email address here"
              sx={{ backgroundColor: "white", width: "473px", height: "56px" }}
            />

            <Button sx={sxButtonSubscribe}>Subscribe</Button>
          </Stack> */}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!isMobile && (
            <img
              src="/public/assets/footer-img.png"
              alt=""
              style={{ bottom: 0 }}

              // height="100%"
            />
          )}
        </Grid>
      </Grid>
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        width="85%"
        margin="0 auto"
        color="black"
      >
        <Box
          gridColumn="span 1"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <Typography variant="h6" gutterBottom>
            Logo
          </Typography> */}
          <Box>
            <IconButton sx={{ padding: "0", marginRight: "0.5rem" }}>
              <Link
                to="https://www.facebook.com/olympostravel.az/"
                target="blank"
              >
                <FacebookIcon sx={{ color: "#4267B2" }} />
              </Link>
            </IconButton>
            <IconButton sx={{ padding: "0", marginRight: "0.5rem" }}>
              <Link
                to="https://api.whatsapp.com/send?phone=994708255188"
                target="blank"
              >
                <WhatsAppIcon sx={{ color: "#25D366" }} />
              </Link>
            </IconButton>

            <IconButton sx={{ padding: "0", marginRight: "0.5rem" }}>
              <Link
                to="https://www.instagram.com/olympostravel.az/"
                target="blank"
              >
                <InstagramIcon sx={{ color: "#833AB4" }} />
              </Link>
            </IconButton>
          </Box>
        </Box>
        <Box gridColumn="span 1">
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "700",
              lineHeight: "20px",
              letterSpacing: "0em",
              textAlign: "left",
            }}
          >
            Bölgələr
          </Typography>
          <List sx={sxMuiList}>
            {destinations.slice(0, 4).map((destination) => (
              <FooterRegionList destination={destination} key={uuidv4()} />
            ))}
          </List>
        </Box>
        <Box gridColumn="span 1">
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "700",
              lineHeight: "20px",
              letterSpacing: "0em",
              textAlign: "left",
            }}
          >
            Bölgələr haqqında
          </Typography>
          <List sx={sxMuiList}>
            {destinations.slice(4, 8).map((destination) => (
              <FooterRegionList destination={destination} key={uuidv4()} />
            ))}
          </List>
        </Box>
        <Box gridColumn="span 1">
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "700",
              lineHeight: "20px",
              letterSpacing: "0em",
              textAlign: "left",
            }}
          >
            Gəzməli yerlər
          </Typography>
          <List sx={sxMuiList}>
            {destinations.slice(8, 12).map((destination) => (
              <FooterRegionList destination={destination} key={uuidv4()} />
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
