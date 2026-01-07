import React, { useState, useEffect } from 'react'
import HTMLFlipBook from "react-pageflip";
import cover from "./pages/cover.jpg";
import backcover from "./pages/backcover.jpg";

const pages = import.meta.glob("./pages/page-*.jpg", { eager: true, import: "default" });

const pageKeys = Object.keys(pages).sort((a, b) => {
  const na = Number(a.match(/page-(\d+)/)[1]);
  const nb = Number(b.match(/page-(\d+)/)[1]);
  return na - nb;
});

function Book() {

  const [bookSize, setBookSize] = useState({ width: 600, height: 848 });

  useEffect(() => {
    const updateSize = () => {
      const height = Math.round(window.innerHeight * 0.86); // 60vh
      const width = Math.round(height * (600 / 848));      // keep proportion
      setBookSize({ width, height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const srcs = [cover, ...pageKeys.map((k) => pages[k])];
    let done = 0;

    srcs.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        done++;
        if (done === srcs.length) setLoading(false);
      };
      img.src = src;
    });
  }, []);


  return (
    <>

      {loading && (
        <div className="loader-overlay">
          <div className="spinner" />
        </div>
      )}


      <HTMLFlipBook
        width={bookSize.width}
        height={bookSize.height}
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