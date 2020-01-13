import "./App.css";
import "tui-image-editor/dist/tui-image-editor.css";
import React, { useEffect } from "react";
import ImageEditor from "@toast-ui/react-image-editor";
const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");
const download = require("downloadjs");

const myTheme = {
  "menu.backgroundColor": "white",
  "common.backgroundColor": "#151515",
  "downloadButton.backgroundColor": "white",
  "downloadButton.borderColor": "white",
  "downloadButton.display": "none",
  "downloadButton.color": "black",
  "menu.normalIcon.path": icond,
  "menu.activeIcon.path": iconb,
  "menu.disabledIcon.path": icona,
  "menu.hoverIcon.path": iconc
};

function App() {
  const imageEditor = React.createRef();

  useEffect(() => {
    document.querySelector(".tui-image-editor-header-logo").style.display =
      "none";
  }, []);

  const saveImageToDisk = () => {
    // const imageEditorInst = imageEditor.current.imageEditorInst;
    const imageEditorInst = imageEditor.current.getInstance();
    const data = imageEditorInst.toDataURL();
    if (data) {
      const mimeType = data.split(";")[0];
      const extension = data.split(";")[0].split("/")[1];
      download(data, `image.${extension}`, mimeType);
    }
  };
  return (
    <>
      <div style={{ textAlign: "center", margin: 50 }}>
        <button
          onClick={saveImageToDisk}
          style={{
            outline: "none",
            border: "none",
            padding: 20,
            backgroundColor: "#2196f3",
            color: "#fff",
            width: 200,
            borderRadius: 50,
            textTransform: "uppercase",
            cursor: "pointer",
            fontSize: "1rem"
          }}
        >
          Save to disk <i className="fas fa-download" />
        </button>
      </div>
      <ImageEditor
        includeUI={{
          loadImage: {
            path: "adult.jpg",
            name: "sampleImage"
          },
          theme: myTheme,
          menu: ["crop", "flip", "rotate", "draw", "shape", "text", "filter"],

          initMenu: "filter",
          uiSize: {
            width: "100%",
            height: `calc(100vh + 160px)`
          },
          menuBarPosition: "bottom",
          menuBarTop: "none"
        }}
        cssMaxHeight={window.innerHeight}
        cssMaxWidth={window.innerWidth}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70
        }}
        usageStatistics={true}
        ref={imageEditor}
      />
    </>
  );
}

export default App;
