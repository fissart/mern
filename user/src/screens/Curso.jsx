import React, { Component } from 'react'
import Navigation from "./Navigation"
import { EditorState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createMathjaxPlugin from 'draft-js-mathjax-plugin'
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
const mathjaxPlugin = createMathjaxPlugin(/* optional configuration object */)
const plugins = [
  mathjaxPlugin,
]

export default class MyEditor extends Component {

  state = {
    editorState: EditorState.createEmpty(),
  }
  onChange = (editorState) => {
    console.log(editorState);
    this.setState({
      editorState,
    })
  }

  render() {
    return (
      <>
      <Navigation/>
        <Editor
          className="border"
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
        />
        <div>wwwwwwwww www</div>
        <InlineMath>\int_0^\infty x^2 dx</InlineMath>
        <BlockMath>\int_0^\infty x^2 dx</BlockMath>
      </>
    )
  }
}