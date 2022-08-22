import useFetch from "../hooks/useFetch";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateWord({ countWord, wordData }) {
  const japRef = useRef(null);
  const korRef = useRef(null);
  const setWord = {
    kor: korRef,
    jap: japRef,
  };

  function changeWordData() {
    wordData(setWord);
  }

  return (
    <div>
      {countWord &&
        countWord.map((word, i) => (
          <div className="flex pt-2" key={i}>
            <div className="pr-2 text-sm">{i}</div>
            <textarea
              type="text"
              placeholder="computer"
              ref={japRef}
              className="border rounded-md h-14 w-64 p-2 mr-8"
              onChange={changeWordData}
            ></textarea>

            <textarea
              type="text"
              placeholder="컴퓨터"
              ref={korRef}
              className="h-14 w-96 border rounded-md p-2"
              onChange={changeWordData}
            ></textarea>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2 hover:text-red-700 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              onClick={(e) => del(word)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg> */}
          </div>
        ))}
    </div>
  );
}

// const days = useFetch("http://localhost:3001/days");
//   const engRef = useRef(null);
//   const korRef = useRef(null);
//   const dayRef = useRef(null);
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//   function onSubmit(e) {
//     e.preventDefault();
//     // console.log(engRef.current.value, korRef.current.value, dayRef.current.value);

//     if (!isLoading) {
//       setIsLoading(true);
//       fetch("http://localhost:3001/words", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           day: dayRef.current.value,
//           eng: engRef.current.value,
//           kor: korRef.current.value,
//           isDone: false,
//         }),
//       }).then((res) => {
//         if (res.ok) {
//           alert("생성이 완료 되었습니다.");
//           navigate(`/day/${dayRef.current.value}`);
//           setIsLoading(false);
//         }
//       });
//     }
//   }

//   return (
//     <form onSubmit={onSubmit}>
//       <div className="input_area">
//         <label>Eng</label>
//         <input type="text" placeholder="computer" ref={engRef}></input>
//       </div>
//       <div className="input_area">
//         <label>Kor</label>
//         <input type="text" placeholder="컴퓨터" ref={korRef}></input>
//       </div>
//       <div className="input_area">
//         <label>Day</label>
//         <select ref={dayRef}>
//           {days.map((day) => (
//             <option key={day.id} value={day.day}>
//               {day.day} day
//             </option>
//           ))}
//         </select>
//       </div>
//       <button
//         style={{
//           opacity: isLoading ? 0.3 : 1,
//         }}
//       >
//         {isLoading ? "Saving..." : "save"}
//       </button>
//     </form>
//   );
