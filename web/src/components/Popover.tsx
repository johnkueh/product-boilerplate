import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
  content: React.ReactNode;
}

const Popover: React.FC<Props> = ({ children, content }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative" onMouseLeave={() => setShow(false)}>
      <div onMouseEnter={() => setShow(true)}>{children}</div>
      {show && (
        <div className="text-xs leading-none h-auto right-0 z-30 bg-white text-gray-800 text-left rounded p-3 absolute shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
