import { useEffect, useState } from "react";
export const StringToHtml = ({ str }) => {
  const [html, setHtml] = useState("");
  useEffect(() => {
    setHtml(str);
  }, [html, str]);
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};
