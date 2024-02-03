import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const LightBoxGallery = ({ photos }) => {
  const [tempImg, setTempImg] = useState("");
  const [model, setModel] = useState(false);

  const handleImg = (img) => {
    setTempImg(img);
    setModel(true);
  };
  return (
    <>
      <div className={model ? "model open" : "model"}>
        <img
          src={tempImg}
          style={{ width: "900px", height: "900px", objectFit: "contain" }}
          alt="hotel img"
        />
        <CloseIcon sx={{ color: "red" }} onClick={() => setModel(false)} />
      </div>
      <div className="gallery">
        {photos.map((photo, i) => (
          <div className="pics" key={i * 4688 + i * 89}>
            <img
              onClick={() => handleImg(photo)}
              src={photo}
              style={{ width: "250px", height: "250px", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default LightBoxGallery;
