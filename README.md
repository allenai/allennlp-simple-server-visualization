# Stand-alone demo with nice visualizations

This is a pared-down version of the AllenNLP demo intended for use with a single model.  The basic
idea here is that you copy the code in the `demo/` directory, modify two files to create a UI
that's specific to your model, then run the demo using `npm`, hooking up to the AllenNLP simple
server.

For a more detailed explanation for how to make this work with your model, see the AllenNLP
tutorial on visualizing your model (TODO - not yet written).  Here is a very brief outline of the
steps involved:

1. Get a simple text in / text out demo of your model running by following the [Predictor
   tutorial in
AllenNLP](https://github.com/allenai/allennlp/blob/master/tutorials/getting_started/making_predictions_and_creating_a_demo.md).
 We'll be sending requests to this server using a separate UI, so once it works, just keep that
server up (it needs to be running on port 8000).
2. Install `npm`.
3. Copy this repo somewhere.
4. Run `npm install` and then `npm start` (from the `demo/` directory) and then head to
   `localhost:3000` in a browser to be sure that you see a basic UI that says "Your Model Name".
5. Modify `src/ModelInput.js` and `src/ModelOutput.js` to create input fields for your model's
   inputs and visualizations for your model's outputs.  There are `TODOs` everywhere in those two
files where we anticipate you might want to make changes.  Using `npm start` to run a server means
that your browser will automatically reload the page every time you make a change to those files,
so you should be seeing live updates as you go.
6. Try out an example by hitting "Run" - if you've hooked up your inputs and outputs correctly,
   you should see your simple server get a request, and you should see the results displayed.
