import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Word from "./Word";

export default function Voca() {
  const { vocaId } = useParams();
  const words = useFetch(`http://localhost:3001/words?voca=${vocaId}`);
  const vocaName = useFetch(`http://localhost:3001/vocas/${vocaId}`);

  return (
    <div>
      <div className="bg-cyan-300 h-40 p-10">
        <div className="flex px-24">
          <h2 className="font-sans font-semibold text-2xl text-white">
            {vocaName.voca}
          </h2>
        </div>
        <div className="flex px-24 pt-5 text-white text-sm">
          카드를 클릭하여 공부하세요. 중요한 단어는 별을 누르고, 다 외운 단어는
          체크하세요
        </div>
      </div>
      {/* {words.length === 0 && <sapn>Loading...</sapn>} */}
      <div>
        <div className="grid gap-4 grid-cols-4 px-56 pt-8">
          {words.map((word) => (
            <Word word={word} key={word.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
