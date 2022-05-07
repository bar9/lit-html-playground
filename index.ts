import {html, render, TemplateResult} from "lit-html";

const body = document.querySelector('body');

debugger;

/**
 * 1. Rendering html
 */

const myTemplate = () => html`
    <div class="container">
        <p>A simple template (paragraph in a container)</p>
    </div>
`;

render( myTemplate(), body);

/**
 * 2. template with options
 */
const myDynamicTemplate = (content: String) => html`
    <div class="container">
        <p>${content}</p>
    </div>
`;

// FAIL: this overwrites the first render call
render( myDynamicTemplate("This text was passed to the render function"), body);

// how do I render one after the other and keep both?
render( myTemplate(), body);

// still no luck.

/**
 * 3. render to new element
 */
const renderNew = (template: TemplateResult, container: HTMLElement) => {
    const newElem = document.createElement('div');
    container.appendChild(newElem);
    render(template, newElem);
}

renderNew(myDynamicTemplate("try it again"), body); //this worked!
render(myDynamicTemplate("overwrite"), body); //overwrite
renderNew(myDynamicTemplate("try it again"), body);
renderNew(myDynamicTemplate("try it again"), body);
renderNew(myDynamicTemplate("try it again"), body);
renderNew(myTemplate(), body);

// !!! seems like render is behaving like setting innerHTML (but it leaves scripts)
// TODO maybe with other settings?
