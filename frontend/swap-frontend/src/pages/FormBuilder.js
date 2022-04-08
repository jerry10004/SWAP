import $ from "jquery";
import React, { Component, createRef } from "react";
import ReactDOM from "react-dom";
import { Save } from "react-feather";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = [
  {
    type: "header",
    subtype: "h1",
    label: "formBuilder in React",
  },
  {
    type: "paragraph",
    label: "This is a demonstration of formBuilder running in a React project.",
  },
];

/* 
The order of the imports and requires is very important, especially in the online enviornment.
The two jQuery libraries must be imported using Node's require(), and not ES6 import.
Also, these two requires MUST come after setting the global jQuery and $ symbols.

In my Babel/Webpack project, the type and order of the imports is a little less sensitive.
For my project, the following alternative works:

    import $ from 'jquery';
    import React from 'react';
    import ReactDOM from 'react-dom';
    import 'jquery-ui-sortable';

    window.jQuery = $;
    window.$ = $;

    require('formBuilder');
*/

class FormBuilder extends Component {
  //fb = createRef();
  componentDidMount() {
    //$(this.fb.current).formBuilder({ formData });

    var fbTemplate = document.getElementById("fb-editor");
    var options = {
      disabledActionButtons: ["save", "clear", "data"],
    };
    const formBuilder = $(fbTemplate).formBuilder(options, { formData });

    // const fbEditor = document.getElementById("build-wrap");
    // const formBuilder = $(fbEditor).formBuilder({ formData });

    document.getElementById("saveData").addEventListener("click", () => {
      console.log("external save clicked");
      const result = formBuilder.actions.save();
      console.log("result:", result);
    });
    document.getElementById("clear-all-fields").onclick = function () {
      if (window.confirm("Do you want to remove all fields?") == true) {
        formBuilder.actions.clearFields();
      }
    };
  }
  render() {
    return (
      <div>
        <div id="fb-editor" ref={this.fb} />
        {/* <div id="build-wrap"></div> */}
        <div class="saveDataWrap">
          <button id="clear-all-fields" type="button">
            Clear Fields
          </button>
          <button id="saveData" type="button">
            External Save Button
          </button>
        </div>
      </div>
    );
  }
}

// ReactDOM.render(<FormBuilder />, document.getElementById("root"));
export default FormBuilder;
