import { useRef, useState } from "react";
import CreateWord from "./CreateWord";
import { useNavigate } from "react-router-dom";

export default function CreateVoca() {
  const [currentId, setCurrentId] = useState(null);
  const titleRef = useRef(null);
  const [countWord, setCountWord] = useState([{ index: 1, id: null }]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const navigate = useNavigate();
  const [word, setWord] = useState({
    kor: "",
    jap: "",
  });
  const wordData = (data) => {
    setWord(data);
  };

  function saveTitle() {
    // title 저장
    if (!currentTitle) {
      if (titleRef.current.value.trim()) {
        fetch("http://localhost:3001/vocas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            voca: titleRef.current.value,
          }),
        })
          .then((res) => {
            if (res.ok) {
              setCurrentTitle(titleRef.current.value);
              alert("title이 저장되었습니다.");
              return res.json();
            }
          })
          .then((data) => {
            setCurrentId(data.id);
          });
      } else {
        alert("title을 입력해주세요");
      }
    }

    if (currentTitle && titleRef.current.value.trim()) {
      fetch(`http://localhost:3001/vocas/${currentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voca: titleRef.current.value,
        }),
      }).then((res) => {
        if (res.ok) {
          setCurrentTitle(titleRef.current.value);
          alert("title이 수정되었습니다.");
        }
      });
    }
  }

  async function addWord() {
    if (!currentTitle) {
      alert("title을 입력후 save 버튼 눌러 저장하시오");
      return;
    }

    if (word.jap.current.value.trim() && word.kor.current.value.trim()) {
      // 단어저장
      await fetch("http://localhost:3001/words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jap: word.jap.current.value,
          kor: word.kor.current.value,
          isDone: false,
          voca: currentId,
          isCheck: false,
        }),
      })
        .then((res) => {
          if (res.ok) {
            alert("생성이 완료 되었습니다.");
            return res.json();
          }
        })
        .then((data) => {
          countWord[countWord.length - 1].id = data.id;

          // child component 추가
          let countArray = [...countWord];
          let counter = countArray.slice(-1)[0].index;
          counter += 1;
          countArray.push({ index: counter, id: null });
          setCountWord(countArray);
          console.log(countArray);
        });
    } else {
      alert("빈칸에 입력해");
    }
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  function linkHome() {
    if (window.confirm("다 저장했어?")) {
      navigate("/");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="bg-cyan-300 h-40 p-10">
        <div className="flex px-20  items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mr-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="rgb(255 255 255)"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <input
            type="text"
            placeholder="단어장 이름을 입력해주세요"
            className="bg-inherit text-slate-500 text-4xl py-3 w-full border-b-2 border-slate-400"
            ref={titleRef}
          ></input>

          <button
            className="border-2 border-cyan-400 rounded-full px-3 hover:border-cyan-700 bg-white"
            onClick={saveTitle}
          >
            save
          </button>
        </div>
        <div className="text-white pt-2">+ 버튼을 누르면 저장</div>
      </div>

      <div className="flex justify-evenly mt-7 font-semibold py-1">
        <div className="border-b border-gray-400 py-1">일어</div>
        <div className="border-b border-gray-400 py-1">의미</div>

        <button
          className="border-2 border-cyan-400 rounded-full px-3 hover:border-cyan-700 bg-white"
          onClick={linkHome}
        >
          돌아가기
        </button>
      </div>
      <div className="flex justify-center mt-7 items-start ">
        <CreateWord countWord={countWord} wordData={wordData} />
      </div>
      <div className="flex justify-evenly mt-7 py-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="rgb(139 92 246)"
          viewBox="0 0 24 24"
          stroke="rgb(255 255 255)"
          strokeWidth="2"
          onClick={addWord}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </form>
  );
}
