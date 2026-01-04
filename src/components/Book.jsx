import React, { useState, useEffect } from 'react'
import HTMLFlipBook from "react-pageflip";
import cover from "./pages/cover.jpg";
import backcover from "./pages/backcover.jpg";

const pages = import.meta.glob("./pages/page-*.jpg", {
  eager: true,
  import: "default"
});

function Book() {

  const [page, setPage] = useState(0);

  return (
  <>
    <HTMLFlipBook
      width={600}
      height={848}
      maxShadowOpacity={0.2}
      drawShadow={false}
      showCover={true}
      onStateChange={(e) => {
        if (typeof e?.page === "number") {
          setPage(e.page);
        }
      }}
      size='fixed'
    >
      <div className="page" style={{ background: 'transparent' }}>
        <div className="page-content cover">
          <img
            src={cover}
            alt="cover page"
            className="pageimage"
          />
        </div>
      </div>

      {Object.keys(pages)
        .sort((a, b) => {
          const na = Number(a.match(/page-(\d+)/)[1]);
          const nb = Number(b.match(/page-(\d+)/)[1]);
          return na - nb;
        })
        .map((key) => (
          <div className="page" key={key}>
            <div className="page-content cover">
              <img src={pages[key]} alt="" className="pageimage" />
            </div>
          </div>
        ))
      }

      <div className="page" style={{ background: 'transparent' }}>
        <div className="page-content cover">
          <img
            src={backcover}
            alt="back page"
            className="pageimage"
          />
        </div>
      </div>

    </HTMLFlipBook>
    
  </>

  );
  
}

export default Book