"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

const TextTyped = ({ textArray }: any) => {
  // Create reference to store the DOM element containing the animation
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: textArray,
      typeSpeed: 90,
      loop: true,
      backSpeed: 50,
      backDelay: 200,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, [textArray]);

  return (
    <div>
      <span ref={el} />
    </div>
  );
};

export default TextTyped;
