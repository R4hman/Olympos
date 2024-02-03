import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AnimatePresence, motion } from "framer-motion";

export default function BasicModal({
  children,
  setShowInput,
  openOrClose,
  setTableData,
  tableIsExist,
  modalWidth,
}) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    maxWidth: modalWidth ? modalWidth : 600,
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
    outline: "none",
    border: "none",
  };

  const handleCloseModal = () => {
    setShowInput(false);
    tableIsExist ? setTableData(null) : null;
  };

  const backdropAnimation = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const modalAnimation = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
    },
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        <Modal
          component={motion.div}
          variants={backdropAnimation}
          initial="hidden"
          animate="visible"
          exit="hidden"
          open={openOrClose}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box component={motion.div} variants={modalAnimation} sx={style}>
            <Box sx={{}}>{children}</Box>
          </Box>
        </Modal>
      </AnimatePresence>
    </div>
  );
}
