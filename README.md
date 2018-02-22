# Stand-alone demo with nice visualizations

This is a pared-down version of the AllenNLP demo intended for use with a single model.  The basic
idea here is that you copy the code in the `demo/` directory, modify two files to create a UI
that's specific to your model, then run the demo using `npm`, hooking up to the AllenNLP simple
server.

For a more detailed explanation for how to make this work with your model, see the [AllenNLP
tutorial on visualizing your model](https://github.com/allenai/allennlp/blob/master/tutorials/how_to/visualizing_model_internals.md).  Here is a very brief outline of the
steps involved:

1. Get a simple text in / text out demo of your model running by following the [Predictor
   tutorial in
AllenNLP](https://github.com/allenai/allennlp/blob/master/tutorials/getting_started/making_predictions_and_creating_a_demo.md).
 We'll be using this server as the backend for our demo, so once it works, just keep that server up
(it needs to be running on port 8000).
2. Install `npm`.
3. Copy this repo somewhere.
4. Run `npm install` and then `npm start` (from the `demo/` directory) and then head to
   `localhost:3000` in a browser to be sure that you see a basic UI that says "Your Model Name".
5. Modify `src/ModelInput.jsx` to create input fields for your model's inputs and add some example
   inputs for the dropdown select box.  There are `TODOs` in that file for every place that needs
to be modified for your model.
6. Modify `src/ModelOutput.jsx` to produce whatever visualizations you like with your model's
   outputs.  There are also `TODOs` in this file showing what places need modification, and some
examples for how to visualize attention matrices or plain text output.
7. Try out an example by hitting "Run" - if you've hooked up your inputs and outputs correctly,
   you should see your simple server get a request (i.e., you should see some output on the
console where that server is running), and you should see the results displayed.

As you're doing steps 5 and 6, because we're using `npm start` to run the server, you should be
seeing live updates as you go.  `npm` will recompile your javascript and reload your browser
window every time you make a change to your files.
