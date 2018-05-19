import React from "react";

const Noteit = props => (
  <div>
    <embed id="iframez" src="https://www.wikipedia.org/" />
    <div id="options-box">
      <input checked="checked" name="highlight" type="radio" value="true" />Highlighter<br/>
      <input name="highlight" type="radio" value="true" />UnHighlighter
      <br />
      <button>Save</button>
    </div>
  </div>
);

export default Noteit;
