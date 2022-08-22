import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";

export default function VocaList() {
  const [vocas, setVocas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/vocas")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data, "data");
        setVocas(data);
      });
  }, []);

  if (vocas.length === 0) {
    return <span>Loading...</span>;
  }

  function del(voca) {
    if (window.confirm("delete?")) {
      fetch(`http://localhost:3001/vocas/${voca.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          alert("삭제완료");
          setVocas([...vocas.slice(0, voca.id - 1), ...vocas.slice(voca.id)]);
        }
      });
    }
  }

  return (
    <div className="flex justify-center mt-8">
      <div>
        {vocas.map((voca) => (
          <div className="flex border-b w-96 justify-between" key={voca.id}>
            <Link to={`/voca/${voca.id}`}>
              <div className="flex my-5 items-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-violet-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <div className="pl-2">{voca.voca}</div>
              </div>
            </Link>
            <div className="px-3 flex items-center">
              <button
                className="border-l pl-5 pt-2 h-8 border-gray-400 text-xs text-gray-400 hover:text-red-400"
                onClick={(e) => del(voca)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
