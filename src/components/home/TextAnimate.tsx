"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

const TextTyped = () => {
  // Create reference to store the DOM element containing the animation
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "سلام من یک برنامه نویس هستم.",
        "من یک توسعه دهنده جاوا اسپر",
        "من یک توسعه دهنده جاوا اسکریپت هستم!",
      ],
      typeSpeed: 90,
      loop: true,
      backSpeed: 50,
      backDelay: 200,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div>
      <span className="text-dark400_light900" ref={el} />
    </div>
  );
};

export default TextTyped;
