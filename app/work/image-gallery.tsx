"use client";

import { useRef, useState } from "react";

export type GalleryImage = { src: string; alt: string; caption: string; width: number; height: number };

export function ImageGallery({ images, label }: { images: GalleryImage[]; label: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const current = images[selected];
  const move = (step: number) => setSelected((index) => (index + step + images.length) % images.length);
  return <>
    <div className={`image-collection ${images.length === 1 ? "single-image" : ""}`} aria-label={label}>
      {images.map((item, index) => <figure key={item.src}>
        <button type="button" aria-label={`放大查看：${item.caption}`} aria-haspopup="dialog" onClick={() => { setSelected(index); dialog.current?.showModal(); }}>
          <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" />
          <span className="image-zoom" aria-hidden="true">查看全图 ↗</span>
        </button>
        <figcaption>{item.caption}</figcaption>
      </figure>)}
    </div>
    <dialog className="image-dialog" ref={dialog} aria-label={label} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={(event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    }}>
      <button className="image-close" type="button" onClick={() => dialog.current?.close()} aria-label="关闭大图">关闭 ×</button>
      <img src={current.src} alt={current.alt} width={current.width} height={current.height} />
      <div className="image-dialog-footer">
        {images.length > 1 && <button type="button" onClick={() => move(-1)} aria-label="上一张">←</button>}
        <p>{current.caption} <span>{selected + 1} / {images.length}</span></p>
        {images.length > 1 && <button type="button" onClick={() => move(1)} aria-label="下一张">→</button>}
      </div>
    </dialog>
  </>;
}
