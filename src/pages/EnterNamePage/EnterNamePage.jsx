import { useState } from "react";
import "./enterNamePage.scss";

const EnterNamePage = ({ nameSubmit, initialRoomId }) => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState(initialRoomId || "");

  return (
    <>
      <div className="enterName_bg">
        <svg
          preserveAspectRatio="none"
          id="visual"
          viewBox="0 0 540 960"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
        >
          <rect x="0" y="0" width="540" height="960" fill="#001220"></rect>
          <defs>
            <linearGradient id="grad1_0" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="30%" stopColor="#fbae3c" stopOpacity="1"></stop>
              <stop offset="70%" stopColor="#fbae3c" stopOpacity="1"></stop>
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="grad1_1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="30%" stopColor="#fbae3c" stopOpacity="1"></stop>
              <stop offset="70%" stopColor="#96446e" stopOpacity="1"></stop>
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="grad1_2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="30%" stopColor="#001220" stopOpacity="1"></stop>
              <stop offset="70%" stopColor="#96446e" stopOpacity="1"></stop>
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="grad2_0" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="30%" stopColor="#fbae3c" stopOpacity="1"></stop>
              <stop offset="70%" stopColor="#fbae3c" stopOpacity="1"></stop>
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="grad2_1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="30%" stopColor="#96446e" stopOpacity="1"></stop>
              <stop offset="70%" stopColor="#fbae3c" stopOpacity="1"></stop>
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="grad2_2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="30%" stopColor="#96446e" stopOpacity="1"></stop>
              <stop offset="70%" stopColor="#001220" stopOpacity="1"></stop>
            </linearGradient>
          </defs>
          <g transform="translate(540, 0)">
            <path
              d="M0 432C-87.6 427.7 -175.2 423.3 -216 374.1C-256.8 324.9 -250.7 230.8 -278.9 161C-307.1 91.2 -369.5 45.6 -432 0L0 0Z"
              fill="#3d3056"
            ></path>
            <path
              d="M0 288C-58.4 285.1 -116.8 282.2 -144 249.4C-171.2 216.6 -167.1 153.9 -185.9 107.3C-204.7 60.8 -246.4 30.4 -288 0L0 0Z"
              fill="#e1685e"
            ></path>
            <path
              d="M0 144C-29.2 142.6 -58.4 141.1 -72 124.7C-85.6 108.3 -83.6 76.9 -93 53.7C-102.4 30.4 -123.2 15.2 -144 0L0 0Z"
              fill="#fbae3c"
            ></path>
          </g>
          <g transform="translate(0, 960)">
            <path
              d="M0 -432C83.7 -425.4 167.4 -418.8 216 -374.1C264.6 -329.4 278.2 -246.7 308.3 -178C338.5 -109.3 385.2 -54.7 432 0L0 0Z"
              fill="#3d3056"
            ></path>
            <path
              d="M0 -288C55.8 -283.6 111.6 -279.2 144 -249.4C176.4 -219.6 185.4 -164.5 205.5 -118.7C225.6 -72.9 256.8 -36.4 288 0L0 0Z"
              fill="#e1685e"
            ></path>
            <path
              d="M0 -144C27.9 -141.8 55.8 -139.6 72 -124.7C88.2 -109.8 92.7 -82.2 102.8 -59.3C112.8 -36.4 128.4 -18.2 144 0L0 0Z"
              fill="#fbae3c"
            ></path>
          </g>
        </svg>
      </div>
      <div className="enterName_wrapper">
        <form
          className="enterName"
          onSubmit={(e) => {
            e.preventDefault();
            nameSubmit(name, roomId);
          }}
        >
          <h1>English quiz</h1>
          <label htmlFor="roomCode">Room code</label>
          <input
            autoComplete="false"
            id="roomCode"
            placeholder="Room code"
            value={roomId}
            disabled={initialRoomId ? true : false}
            required
            onChange={(e) => setRoomId(e.target.value)}
          />
          <label htmlFor="teamName">Team name</label>
          <input
            autoComplete="false"
            id="teamName"
            placeholder="Write your team name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button type="submit">Enter a quiz</button>
        </form>
      </div>
    </>
  );
};

export default EnterNamePage;
