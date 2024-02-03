import { useEffect, useState } from "react";
import { FlexBetween } from "../theme";
import ReusableButton from "../components/reusable/ReusableButton";
import { useMediaQuery } from "@mui/material";

export const usePrevNextButtons = (next, setNext, postsPerPage, data) => {
  const [postsToShow, setPostsToShow] = useState([]);

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [next]);

  // const loopWithSlice = useCallback(
  //   (start, end) => {
  //     console.log("start: " + start, end);
  //     const slicedPosts = data?.slice(start, end);
  //     setPostsToShow(slicedPosts);
  //   },
  //   [data]
  // );
  const loopWithSlice = (start, end) => {
    const slicedPosts = data?.slice(start, end);
    setPostsToShow(slicedPosts);
  };

  const handlePrevBtn = () => {
    const newNext = next - postsPerPage;
    if (newNext >= 0) {
      loopWithSlice(newNext, next);
      setNext(newNext);
    }
  };

  const handleNextBtn = () => {
    const newNext = next + postsPerPage;
    if (newNext <= data?.length) {
      loopWithSlice(newNext, newNext + postsPerPage);
      setNext(newNext);
    }
  };

  const PrevNextButtons = () => {
    return (
      <div>
        {data?.length && data?.length > postsPerPage ? (
          <FlexBetween sx={{ mb: "2rem" }}>
            <ReusableButton
              width={isMobile && 100}
              disabled={next <= 0}
              onClick={handlePrevBtn}
              bgColor="black"
              color="white"
              type="prevNextBtn"
            >
              Əvvəlki
            </ReusableButton>
            <ReusableButton
              width={isMobile && 100}
              disabled={next + postsPerPage >= data?.length}
              onClick={handleNextBtn}
              bgColor="black"
              color="white"
              type="prevNextBtn"
            >
              Növbəti
            </ReusableButton>
          </FlexBetween>
        ) : (
          <div></div>
        )}
      </div>
    );
  };

  return { PrevNextButtons, postsToShow, handleNextBtn, handlePrevBtn };
};
