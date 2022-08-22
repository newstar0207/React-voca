import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex h-16 border-b justify-around">
      <Link
        to="/"
        className="flex items-center font-sans font-bold text-xl tracking-wide "
      >
        <h2 className="text-gray-600">CARD</h2>
        <h2 className="pl-2 text-cyan-400">単語</h2>
      </Link>
      <div className="flex font-semibold text-sm tracking-wide text-violet-500 items-center">
        <Link to="create_word" className="mx-5 flex items-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          단어장 검색
        </Link>
        <Link to="create_voca" className="mx-5 flex items-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          단어장 추가
        </Link>
      </div>
      <div className="flex items-center">프로필 나중에 만들예졍</div>
    </div>
  );
}
