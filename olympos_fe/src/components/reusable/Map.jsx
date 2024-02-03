import { Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { SectionTitle } from "../../theme";

const Map = ({ mapPosition }) => {
  // const lat = JSON.parse(mapPosition?.lat);

  return (
    <Box sx={{ height: "100%" }}>
      <SectionTitle
        sx={{
          m: "2.5rem 0",
        }}
      >
        Location Map
      </SectionTitle>
      <MapContainer
        // sx={{ height: "100%", backgroundColor: "red" }}
        center={[mapPosition.lat, mapPosition.lng]}
        zoom={13}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={[mapPosition?.lat, mapPosition?.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default Map;
