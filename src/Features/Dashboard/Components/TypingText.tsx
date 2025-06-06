import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;        // typing speed in ms
  deleteSpeed?: number;  // deleting speed in ms
  pause?: number;        // pause before deleting or retyping
  className?: string;
}

function TypingText({
  text,
  speed = 100,
  deleteSpeed = 50,
  pause = 1000,
  className,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && index <= text.length) {
      // Typing forward
      timer = setTimeout(() => {
        setDisplayedText(text.substring(0, index));
        setIndex(index + 1);
      }, speed);
    } else if (isDeleting && index >= 0) {
      // Deleting backward
      timer = setTimeout(() => {
        setDisplayedText(text.substring(0, index));
        setIndex(index - 1);
      }, deleteSpeed);
    }

    // When typing is done, pause then start deleting
    if (index === text.length + 1 && !isDeleting) {
      timer = setTimeout(() => setIsDeleting(true), pause);
    }

    // When deleting is done, pause then start typing again
    if (index === -1 && isDeleting) {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setIndex(0);
      }, pause);
    }

    return () => clearTimeout(timer);
  }, [index, isDeleting, text, speed, deleteSpeed, pause]);

  return <p className={className}>{displayedText}</p>;
}

export default TypingText;

