import React, { useState } from "react";

export default function Search() {
  const { keyword, setKeyword } = useState("");
  const { genre, setGenre } = useState();

  return (
    <>
      <header>
        <form>
          <input type="text" />
        </form>
      </header>
      <section>검색결과</section>
    </>
  );
}
