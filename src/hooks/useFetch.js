import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data, "data");
        setData(data);
      });
  }, []);

  return data;
}

//useEffect 예제 -
/**
 * const [data, setData] = useState([]);
 *
 * 아래처럼 괄호에 data가 들어가게 되면 최초 랜더링 시 + data가 변경될 때마다 실행됨
 * useEffect(() => {
 *  axios.get()'aa').then((res) => setData(res.data.product));
 * },
[data]);
 * 
 * 아래처럼 빈 괄호일 때는 페이지 랜더링될 때 딱 한번만 실행됨
* useEffect(() => {
 *  axios.get()'aa').then((res) => setData(res.data.product));
 * }, []);
 *
 */
