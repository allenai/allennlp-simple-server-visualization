import React from 'react';
import Button from './components/Button'
import ModelIntro from './components/ModelIntro'


// TODO: if you want to have some quickly-accessible examples, you can add them here.  You can then
// auto-populate your input fields by selecting an example from the select box.

const examples = [
  {
    field1: "field 1 input for example 1",
    field2: "field 2 input for example 1"
  },
  {
    field1: "field 1 input for example 2",
    field2: "field 2 input for example 2"
  },
  {
    field1: "field 1 input for example 3",
    field2: "field 2 input for example 3"
  }
];

// TODO: This determines what text shows up in the select box for each example.
function summarizeExample(example) {
  return example.field1.substring(0, 60);
}

// TODO: You can give a model name and description that show up in your demo.
const title = "Your Model Name";
const description = (
  <span>
  If you want a description of what this demo is showing, you can put that here.  Or just leave this
  description empty if you don't need it.
  </span>
);

class ModelInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleListChange = this.handleListChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleListChange(e) {
    if (e.target.value !== "") {
      // TODO: This gets called when the select box gets changed.  You want to set the values of
      // your input boxes with the content in your examples.
      this.field1.value = examples[e.target.value].field1
      this.field2.value = examples[e.target.value].field2
    }
  }

  onClick() {
    const { runModel } = this.props;

    // TODO: You need to map the values in your input boxes to json values that get sent to your
    // predictor.
    runModel({field1: this.field1.value, field2: this.field2.value});
  }

  render() {

    const { outputState } = this.props;

    return (
      <div className="model__content">
        <ModelIntro title={title} description={description} />
        <div className="form__instructions"><span>Enter text or</span>
          <select disabled={outputState === "working"} onChange={this.handleListChange}>
              <option value="">Choose an example...</option>
              {examples.map((example, index) => {
                return (
                    <option value={index} key={index}>{summarizeExample(example) + "..."}</option>
                );
              })}
          </select>
        </div>

       {/*
         * TODO: This is where you add your input fields.  You shouldn't have to change any of the
         * code in render() above here.  We're giving a couple of example inputs here, one for a
         * larger piece of text, like a paragraph (the `textarea`) and one for a shorter piece of
         * text, like a question (the `input`).
         */}

        <div className="form__field">
          <label>Table</label>
          <textarea ref={(x) => this.field1 = x} type="text" autoFocus="true"></textarea>
        </div>
        <div className="form__field">
          <label>Question</label>
          <input ref={(x) => this.field2 = x} type="text"/>
        </div>

       {/* You also shouldn't have to change anything below here. */}

        <div className="form__field form__field--btn">
          <Button enabled={outputState !== "working"} onClick={this.onClick} />
        </div>
      </div>
    );
  }
}

export default ModelInput;
