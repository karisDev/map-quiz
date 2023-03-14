import { useState } from "react";
import applePark from "../assets/questions/apple-park.jpg";
import capitol from "../assets/questions/capitol.jpg";
import esb from "../assets/questions/esb.jpg";
import goldenGate from "../assets/questions/golden-gate.jpg";
import grandCanyon from "../assets/questions/grand-canyon.jpg";
import gta from "../assets/questions/gta.jpg";
import rushmore from "../assets/questions/rushmore.jpg";
import spaceNeedle from "../assets/questions/space-needle.jpg";
import statueOfLiberty from "../assets/questions/statue-of-liberty.webp";

const questionPool = [
  {
    question: "Statue of Liberty National Monument",
    answer: [40.6892, -74.0445],
    imgSrc: statueOfLiberty,
  },
  {
    question: "Golden Gate Bridge",
    answer: [37.8199, -122.4783],
    imgSrc: goldenGate,
  },
  {
    question: "Mount Rushmore National Memorial",
    answer: [43.8791, -103.4591],
    imgSrc: rushmore,
  },
  {
    question: "Maze bank tower",
    answer: [34.05082, -118.25437],
    imgSrc: gta,
  },
  {
    question: "Empire State Building",
    answer: [40.7484, -73.9857],
    imgSrc: esb,
  },
  {
    question: "United States Capitol",
    answer: [38.8895, -77.0091],
    imgSrc: capitol,
  },
  {
    question: "Grand Canyon",
    answer: [36.1069, -112.1126],
    imgSrc: grandCanyon,
  },
  {
    question: "Space Needle",
    answer: [47.6205, -122.3493],
    imgSrc: spaceNeedle,
  },
  {
    question: "Apple Park",
    answer: [37.335, -122.0087],
    imgSrc: applePark,
  },
];

const Question = ({ onRevealAnswer }) => {
  const [question, setQuestion] = useState(questionPool[0].question);

  const nextQuestion = () => {
    const index = questionPool.findIndex((q) => q.question === question);
    if (index === questionPool.length - 1) {
      setQuestion(questionPool[0].question);
    } else {
      setQuestion(questionPool[index + 1].question);
    }
  };

  const prevQuestion = () => {
    const index = questionPool.findIndex((q) => q.question === question);
    if (index === 0) {
      setQuestion(questionPool[questionPool.length - 1].question);
    } else {
      setQuestion(questionPool[index - 1].question);
    }
  };

  const revealAnswer = () => {
    const index = questionPool.findIndex((q) => q.question === question);
    onRevealAnswer(questionPool[index].answer);
  };

  return <div className="question">Question</div>;
};

export default Question;
