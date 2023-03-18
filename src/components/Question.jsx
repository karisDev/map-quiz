import { useState } from "react";
import capitol from "../assets/questions/capitol.jpg";
import esb from "../assets/questions/esb.jpg";
import esb2 from "../assets/questions/esb2.jpg";
import goldenGate from "../assets/questions/golden-gate.jpg";
import goldenGate2 from "../assets/questions/golden-gate2.jpg";

import grandCanyon from "../assets/questions/grand-canyon.jpg";
import applePark from "../assets/questions/apple-park.jpg";
import applePark2 from "../assets/questions/apple-park2.jpg";
import gta from "../assets/questions/gta.jpg";
import gta2 from "../assets/questions/gta2.jpg";
import rushmore from "../assets/questions/rushmore.jpg";
import rushmore2 from "../assets/questions/rushmore2.png";
import spaceNeedle from "../assets/questions/space-needle.jpg";
import statueOfLiberty from "../assets/questions/statue-of-liberty.webp";
import boeing from "../assets/questions/boeing.jpg";
import boeing2 from "../assets/questions/boeing2.jpg";
import apollo from "../assets/questions/apollo.webp";
import apollo2 from "../assets/questions/apollo2.jpg";
import mcdonalds from "../assets/questions/mcdonalds.jpg";
import mcdonalds2 from "../assets/questions/mcdonalds2.jpg";
import declaration from "../assets/questions/declaration.jpg";
import declaration2 from "../assets/questions/declaration2.webp";
import burningMan from "../assets/questions/burning-man.jpg";
import burningMan2 from "../assets/questions/burning-man2.jpg";

const questionPool = [
  {
    question: "The signing of the Declaration of Independence",
    answer: [39.94961, -75.150282],
    questionImg: declaration,
    popupImg: declaration2,
    popupText:
      "July 2, 1776 was an actual independence day, when 56 men signed it. But declaration was officially drafted two days later, on July 4. And now people mistakenly celebrate July 4 as an independence day.",
  },
  {
    question:
      "Neil Armstrong's landing after the first-ever flight to the moon.",
    answer: [13.316667, -169.15],
    questionImg: apollo,
    popupImg: apollo2,
    popupText:
      "They were rescued by USS Hornet. Today this mission would cost around $288.1 billion US dollars.",
  },
  {
    question: "The Empire State Building",
    answer: [40.7484, -73.9857],
    questionImg: esb,
    popupImg: esb2,
    popupText:
      "102-story skyscrapper when people were still using horses and bird feathers",
  },
  {
    question: "The very first McDonald's",
    answer: [33.942757, -118.130767],
    questionImg: mcdonalds,
    popupImg: mcdonalds2,
    popupText:
      "It was a BBQ drive-thru only restaurant, serving military personnel.",
  },
  {
    question: "The Golden Gate Bridge",
    answer: [37.8199, -122.4783],
    questionImg: goldenGate,
    popupImg: goldenGate2,
    popupText:
      "The most photographed bridge in the world, was designed by a man, who had no prior experience in designing bridges, but was a showman and a promoter",
  },
  {
    question: "Hollywood Sign",
    answer: [34.1341, -118.3217],
    questionImg: gta,
    popupImg: gta2,
    popupText:
      "The sign was originally built in 1923 to advertise a real estate development. It was originally supposed to read 'Hollywoodland'",
  },
  {
    question: "The Burning Man festival",
    answer: [40.7829, -119.2057],
    questionImg: burningMan,
    popupImg: burningMan2,
    popupText:
      "This event has a no-money policy, everything is absolutely free. All the artwork and restaurants are made by visitors. Was an insipration for the first-ever Google Doodle",
  },
  {
    question: "Space Needle",
    answer: [47.6205, -122.3493],
    questionImg: spaceNeedle,
    popupImg: spaceNeedle,
    popupText:
      "This building is actually a private property of one family. On April fools, 911 lines were completely blocked because someone said it was collapsed",
  },
  {
    question: "Mount Rushmore National Memorial",
    answer: [43.8791, -103.4591],
    questionImg: rushmore,
    popupImg: rushmore2,
    popupText:
      "Some people criticized the project as a waste of taxpayer money during the Great Depression. Was never finnished because of the lack of funding",
  },
  {
    question: "Boeing Everett Factory",
    answer: [47.9283, -122.2498],
    questionImg: boeing,
    popupImg: boeing2,
    popupText:
      "The largest building in the world by volume (13.3 million cubic meters). Can fit 12 Boeing 747s at a time",
  },
  {
    question: "Apple park",
    answer: [37.335, -122.0087],
    questionImg: applePark,
    popupImg: applePark2,
    popupText:
      "It runs on 100% renewable energy thanks to a roof fully covered in solar panels. The average salary inside this complex is $150,000",
  },
];

const Question = ({ onRevealAnswer, resetState }) => {
  const [question, setQuestion] = useState(questionPool[0]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const nextQuestion = () => {
    const nextQuestionIndex = questionPool.indexOf(question) + 1;
    if (nextQuestionIndex < questionPool.length) {
      setQuestion(questionPool[nextQuestionIndex]);
    }
  };

  const prevQuestion = () => {
    const prevQuestionIndex = questionPool.indexOf(question) - 1;
    if (prevQuestionIndex >= 0) {
      setQuestion(questionPool[prevQuestionIndex]);
    }
  };

  const revealAnswer = () => {
    onRevealAnswer({
      lat: question.answer[0],
      lng: question.answer[1],
    });
  };

  return (
    <>
      <div
        className={`questionPopupWrapper ${isPopupOpen ? "" : "hidden"}`}
        onClick={() => setIsPopupOpen(false)}
      >
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          <h2 className="popup__title">{question.question}</h2>
          <p className="popup__text">{question.popupText}</p>
          <img src={question.popupImg} alt="image" className="popup__img" />
        </div>
      </div>
      <div className="question">
        <div className="question__header">
          <h2 className="question__title">{question.question}</h2>
        </div>
        <div className="question__body">
          <img
            className="question__img"
            src={question.questionImg}
            alt={question.question}
          />
        </div>
        <div className="question__footer">
          <button
            className="question__btn"
            onClick={prevQuestion}
            disabled={questionPool.indexOf(question) === 0}
          >
            Prev
          </button>
          <button className="question__btn" onClick={revealAnswer}>
            Reveal answer
          </button>
          <button
            className="question__btn"
            onClick={() => setIsPopupOpen(true)}
          >
            Details
          </button>
          <button className="question__btn" onClick={resetState}>
            Reset map
          </button>
          <button
            className="question__btn"
            onClick={nextQuestion}
            disabled={
              questionPool.indexOf(question) === questionPool.length - 1
            }
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Question;
