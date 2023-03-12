import * as React from "react";
import { FC } from "react";

const Footer:FC = () => {
  const [value, setValue] = React.useState(0);

  return (
    <footer>
      <h4 className="text-center mt-3 mb-3">Made by Soloviov Ivan</h4>
    </footer>
  );
};
export default Footer;
