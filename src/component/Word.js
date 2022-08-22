import { useState } from "react";

export default function Word({ word: w }) {
  const [word, setWord] = useState(w);
  const [isShow, setIsShow] = useState(false);
  const [isDone, setIsDone] = useState(word.isDone);
  const [isCheck, setIsCheck] = useState(word.isCheck);
  const [currentWord, setCurrentWord] = useState(word.jap);

  function toggleShow() {
    setIsShow(!isShow);
  }

  function toggleDone() {
    console.log("isDone...?");
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...word,
        isDone: !isDone,
      }),
    }).then((res) => {
      if (res.ok) {
        setIsDone(!isDone);
      }
    });
  }

  function toggleCheck() {
    console.log("isCheck...?");
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...word,
        isCheck: !isCheck,
      }),
    }).then((res) => {
      if (res.ok) {
        setIsCheck(!isCheck);
      }
    });
  }

  function del() {
    if (window.confirm("delete?")) {
      fetch(`http://localhost:3001/words/${word.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          // id를 대충 0으로 바꾼후 밑에서 id가 0이라면 return null;
          setWord({ id: 0 });
        }
      });
    }
  }

  function changeLan() {
    currentWord === word.jap ? setCurrentWord(word.kor) : setCurrentWord(word.jap);
  }

  if (word.id === 0) {
    // null을 return 함으로써 xml를 return 하지 않아 그리지 않음.
    return null;
  }

  return (
    <div>
      <div className={`border-2 w-full rounded ${isDone ? "bg-gray-100" : ""}`}>
        <div className="flex flex-row pt-3 px-3 justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 hover:text-yellow-400 ${
              isCheck ? "text-yellow-200" : "text-gray-400"
            }`}
            fill={isCheck ? "rgb(254 240 138)" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            onClick={toggleCheck}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 hover:text-sky-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            onClick={toggleDone}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        {word.jap === currentWord ? (
          <div className="py-10 mb-5" onClick={changeLan}>
            {currentWord}
          </div>
        ) : (
          <div className="py-10 mb-5" onClick={changeLan}>
            {currentWord}
          </div>
        )}
      </div>
    </div>
  );
}
