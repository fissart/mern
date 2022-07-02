import React, { useEffect, useRef, useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import ReactHTMLParser from 'react-html-parser';
import RDWMathJax from '../rdw-mathjax/rdw-mathjax';
import { content } from '../rdw-mathjax/configsmathjax';
import "../rdw-mathjax/Latex.css";

function App() {

  const node = useRef();
  const [rawDraftContentState, setRawDraftContentState] = useState(null);
  const [json, setJSON] = useState('');

  useEffect(() => {
    // Some async task (ie. getting editor data from DB)
    setTimeout(() => {
      setRawDraftContentState(content);
      setJSON(JSON.stringify(content));
    }, 1000);
  }, []);

  useEffect(() => {
    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, node.current]);
  });

  const onContentStateChange = (rawDraftContentState) => {
    setJSON(JSON.stringify(rawDraftContentState));
  console.log(rawDraftContentState.blocks[0].text);
  }

  return (
    <div className="container border p-1">
      <RDWMathJax
        rawDraftContentState={rawDraftContentState}
        onContentStateChange={onContentStateChange}
      />
      <div className="container border p-1">
        <h5>Resultado</h5>
        <hr />
        <div className="preview">
          <div ref={node} key={Math.random()}>
            {json && ReactHTMLParser(draftToHtml(JSON.parse(json)))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

