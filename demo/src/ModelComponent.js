import React from 'react';
import HeatMap from './components/heatmap/HeatMap'
import Collapsible from 'react-collapsible'
import { API_ROOT } from './api-config';
import {PaneLeft, PaneRight} from './components/Pane'
import Button from './components/Button'
import ModelIntro from './components/ModelIntro'

/*******************************************************************************
 * Some conveniences: a list of examples that you can get to quickly, and a
 * title and description for the model you're demoing.
 *
 * The examples need to have the fields that match your model's inputs.
*******************************************************************************/

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


const parserExamples = [
    {
      table: "Season\tLevel\tDivision\tSection\tPosition\tMovements\n" +
             "1993\tTier 3\tDivision 2\tÖstra Svealand\t1st\tPromoted\n" +
             "1994\tTier 2\tDivision 1\tNorra\t11th\tRelegation Playoffs\n" +
             "1995\tTier 2\tDivision 1\tNorra\t4th\t\n" +
             "1996\tTier 2\tDivision 1\tNorra\t11th\tRelegation Playoffs - Relegated\n" +
             "1997\tTier 3\tDivision 2\tÖstra Svealand\t3rd\t\n" +
             "1998\tTier 3\tDivision 2\tÖstra Svealand\t7th\t\n" +
             "1999\tTier 3\tDivision 2\tÖstra Svealand\t3rd\t\n" +
             "2000\tTier 3\tDivision 2\tÖstra Svealand\t9th\t\n" +
             "2001\tTier 3\tDivision 2\tÖstra Svealand\t7th\t\n" +
             "2002\tTier 3\tDivision 2\tÖstra Svealand\t2nd\t\n" +
             "2003\tTier 3\tDivision 2\tÖstra Svealand\t3rd\t\n" +
             "2004\tTier 3\tDivision 2\tÖstra Svealand\t6th\t\n" +
             "2005\tTier 3\tDivision 2\tÖstra Svealand\t4th\tPromoted\n" +
             "2006*\tTier 3\tDivision 1\tNorra\t5th\t\n" +
             "2007\tTier 3\tDivision 1\tSödra\t14th\tRelegated",
      question: "What is the only year with the 1st position?",
    },
];

const title = "Your Model Name";
const description = (
  <span>
  If you want a description of what this demo is showing, you can put that here.  Or just leave this
  description empty if you don't need it.
  </span>
);


/*******************************************************************************
  <ModelInput /> Component
*******************************************************************************/

class ModelInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleListChange = this.handleListChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleListChange(e) {
    if (e.target.value !== "") {
      this.table.value = parserExamples[e.target.value].table
      this.question.value = parserExamples[e.target.value].question
    }
  }

  handleTableChange(e) {
    this.setState({
      tableValue: e.target.value,
    });
  }

  handleQuestionChange(e) {
    this.setState({
      questionValue: e.target.value,
    });
  }

  onClick() {
    const { runModel } = this.props;
    runModel({table: this.table.value, question: this.question.value});
  }

  render() {

    const { outputState, runModel } = this.props;

    return (
      <div className="model__content">
      <ModelIntro title={title} description={description} />
        <div className="form__instructions"><span>Enter text or</span>
          <select disabled={outputState === "working"} onChange={this.handleListChange}>
              <option value="">Choose an example...</option>
              {parserExamples.map((example, index) => {
                return (
                    <option value={index} key={index}>{example.table.substring(0,60) + "..."}</option>
                );
              })}
          </select>
        </div>
        <div className="form__field">
          <label>Table</label>
          <textarea ref={(x) => this.table = x} type="text" autoFocus="true" disabled={outputState === "working"}></textarea>
        </div>
        <div className="form__field">
          <label>Question</label>
          <input ref={(x) => this.question = x} type="text" disabled={outputState === "working"} />
        </div>
          <div className="form__field form__field--btn">
          <Button enabled={outputState !== "working"} onClick={this.onClick} />
        </div>
      </div>
      );
    }
}


/*******************************************************************************
  <ModelOutput /> Component
*******************************************************************************/

class ModelOutput extends React.Component {
  render() {
    const { answer, logicalForm, actions, linking_scores, feature_scores, similarity_scores, entities, question_tokens } = this.props;

    return (
      <div className="model__content">
        <div className="form__field">
          <label>Answer</label>
          <div className="model__content__summary">{ answer } Logical form execution (to actually get an answer) not yet supported</div>
        </div>

        <div className="form__field">
          <label>Logical Form</label>
          <div className="model__content__summary">{ logicalForm }</div>
        </div>

        <div className="form__field">
          <Collapsible trigger="Model internals (beta)">
            <Collapsible trigger="Predicted actions">
              {actions.map((action, action_index) => (
                <Collapsible key={"action_" + action_index} trigger={action['predicted_action']}>
                  <ActionInfo action={action} question_tokens={question_tokens}/>
                </Collapsible>
              ))}
            </Collapsible>
            <Collapsible trigger="Entity linking scores">
                <HeatMap xLabels={question_tokens} yLabels={entities} data={linking_scores} xLabelWidth="250px" />
            </Collapsible>
            <Collapsible trigger="Entity linking scores (features only)">
                <HeatMap xLabels={question_tokens} yLabels={entities} data={feature_scores} xLabelWidth="250px" />
            </Collapsible>
            <Collapsible trigger="Entity linking scores (similarity only)">
                <HeatMap xLabels={question_tokens} yLabels={entities} data={similarity_scores} xLabelWidth="250px" />
            </Collapsible>
          </Collapsible>
        </div>
      </div>
    );
  }
}


class ActionInfo extends React.Component {
  render() {
    const { action, question_tokens } = this.props;
    const question_attention = action['question_attention'].map(x => [x]);
    const considered_actions = action['considered_actions'];
    const action_probs = action['action_probabilities'].map(x => [x]);

    return (
      <div>
        <div className="heatmap">
          <HeatMap xLabels={['Prob']} yLabels={considered_actions} data={action_probs} xLabelWidth="250px" />
        </div>
        <div className="heatmap">
          <HeatMap xLabels={['Prob']} yLabels={question_tokens} data={question_attention} xLabelWidth="70px" />
        </div>
      </div>
    )
  }
}


/*******************************************************************************
  <McComponent /> Component
*******************************************************************************/

class ModelComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        outputState: "empty",  // valid values: "working", "empty", "received", "error"
        requestData: null,
        responseData: null
      };

      this.runModel = this.runModel.bind(this);
    }

    runModel(inputs) {
      this.setState({outputState: "working"});

      fetch(`${API_ROOT}/predict`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs)
      }).then((response) => {
        return response.json();
      }).then((json) => {
        this.setState({requestData: inputs, responseData: json, outputState: 'received'})
      }).catch((error) => {
        this.setState({outputState: "error"});
        console.error(error);
      });
    }

    render() {
      const { outputState, requestData, responseData } = this.state;

      const table = requestData && requestData.table;
      const question = requestData && requestData.question;
      const answer = responseData && responseData.answer;
      const logicalForm = responseData && responseData.logical_form;
      const actions = responseData && responseData.predicted_actions;
      const linking_scores = responseData && responseData.linking_scores;
      const feature_scores = responseData && responseData.feature_scores;
      const similarity_scores = responseData && responseData.similarity_scores;
      const entities = responseData && responseData.entities;
      const question_tokens = responseData && responseData.question_tokens;

      return (
        <div className="pane-container">
          <div className="pane model">
            <PaneLeft>
              <ModelInput runModel={this.runModel}
                          outputState={this.state.outputState}
                          table={table}
                          question={question}/>
            </PaneLeft>
            <PaneRight outputState={outputState}>
              <ModelOutput answer={answer}
                           logicalForm={logicalForm}
                           actions={actions}
                           linking_scores={linking_scores}
                           feature_scores={feature_scores}
                           similarity_scores={similarity_scores}
                           entities={entities}
                           question_tokens={question_tokens}
              />
            </PaneRight>
          </div>
        </div>
      );

    }
}

export default ModelComponent;
