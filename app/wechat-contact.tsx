"use client";

import { useRef } from "react";

export function WechatContact() {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="contact-item"
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        <span>WECHAT</span>
        <strong>扫一扫，加个微信</strong>
        <b>查看二维码 ↗</b>
      </button>
      <dialog
        ref={dialog}
        className="wechat-dialog"
        aria-labelledby="wechat-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="wechat-dialog-body">
          <button
            className="dialog-close"
            type="button"
            aria-label="关闭微信二维码"
            autoFocus
            onClick={() => dialog.current?.close()}
          >
            ×
          </button>
          <span className="eyebrow">SAY HELLO</span>
          <h2 id="wechat-title">微信联系</h2>
          <img
            src="/wechat-qr.jpg"
            alt="李忆沛的微信二维码，使用微信扫一扫添加"
            width="699"
            height="704"
          />
          <p>用微信扫一扫，或保存图片后在微信中识别。</p>
          <a
            className="text-link"
            href="/wechat-qr.jpg"
            download="李忆沛-微信二维码.jpg"
          >
            保存二维码 <span aria-hidden="true">↓</span>
          </a>
        </div>
      </dialog>
      <noscript>
        <a className="qr-fallback" href="/wechat-qr.jpg">
          打开微信二维码图片 ↗
        </a>
      </noscript>
    </>
  );
}
