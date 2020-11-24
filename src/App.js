import { useEffect, useState } from 'react'; 

import Froala from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import Froalaeditor from 'froala-editor';

import Html2Pdf from 'html2pdf.js';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css'; 
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/plugins/print.min.js';

import 'html2pdf.js/dist/html2pdf.bundle.js'

function App() { 
  const [model, setModel] = useState("test content");

  useEffect(()=> {

    setModel(`<h2>Welcome to the HTML editor!</h2>
    <p>Just type the HTML and it will be shown below.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <a href="http://www.clesto.com">Clesto.com</a></p>
    <img src="https://www.google.se/images/google_80wht.gif" alt="Google logo"> 
    <ul>
      <li>Nulla facilisi.</li>
      <li>Pellentesque habitant morbi</li>
      <li>Quisque vel justo.</li>
      <li>Nullam posuere purus sed arcu.</li>
    </ul>
    `);

    // var script = document.createElement('script');
    //  script.type = 'application/javascript';
    //  script.src = 'https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js';
    //  document.head.appendChild(script);

  });

  const alertName = () => { 

    var element = document.getElementById('testId');
    var options = {
      filename: 'my-file.pdf'
    };
 
    var exporter = new Html2Pdf(model, options);
    //Html2Pdf.getPdf(options);

  };

  Froalaeditor.DefineIcon('clear', {NAME: 'remove', SVG_KEY: 'remove'});
    Froalaeditor.RegisterCommand('clear', {
      title: 'Test HTML',
      focus: false,
      undo: true,
      refreshAfterCallback: true,
      callback: function () {
      alertName();
      }
    });

  return ( 
    
    <div className="App">

      <div id="testId"> test içerik </div>

    <Froala
      //ref={ref}
      model={model}
      onModelChange={setModel}
      tag="textarea"
      config={{
        attribution: false,
        placeholder: "Start typing...",
        toolbarButtons: ['getPDF','clear'],
        // toolbarButtons: {
        //   moreMisc: {
        //     buttons: [
        //       "undo",
        //       "redo",
        //       "fullscreen",
        //       "print",
        //       "getPDF",
        //       "spellChecker",
        //       "selectAll",
        //       "html",
        //       "help"
        //     ],
        //     align: "left",
        //     buttonsVisible: 2
        //   },
        //   moreText: {
        //     buttons: [
        //       "bold",
        //       "italic",
        //       "underline",
        //       "strikeThrough",
        //       "subscript",
        //       "superscript",
        //       "fontFamily",
        //       "fontSize",
        //       "textColor",
        //       "backgroundColor",
        //       "inlineClass",
        //       "inlineStyle",
        //       "clearFormatting"
        //     ]
        //   },
        //   moreParagraph: {
        //     buttons: [
        //       "alignLeft",
        //       "alignCenter",
        //       "formatOLSimple",
        //       "alignRight",
        //       "alignJustify",
        //       "formatOL",
        //       "formatUL",
        //       "paragraphFormat",
        //       "paragraphStyle",
        //       "lineHeight",
        //       "outdent",
        //       "indent",
        //       "quote"
        //     ]
        //   },
        //   moreRich: {
        //     buttons: [
        //       "insertLink",
        //       "insertImage",
        //       "insertVideo",
        //       "insertTable",
        //       "emoticons",
        //       "fontAwesome",
        //       "specialCharacters",
        //       "embedly",
        //       "insertFile",
        //       "insertHR"
        //     ]
        //   }
        // },
        pluginsEnabled: [
          'align',
          'charCounter',
          'codeBeautifier',
          'codeView',
          'colors',
          'draggable',
          'embedly',
          'emoticons',
          'entities',
          'file',
          'fontAwesome',
          'fontFamily',
          'fontSize',
          'fullscreen',
          'image',
          'imageTUI',
          'imageManager',
          'inlineStyle',
          'inlineClass',
          'lineBreaker',
          'lineHeight',
          'link',
          'lists',
          'paragraphFormat',
          'paragraphStyle',
          'quickInsert',
          'quote',
          'save',
          'table',
          'url',
          'video',
          'wordPaste',
        ]
      }}
    />
    <br /> 
    <br /> 
    <FroalaEditorView model={model} />
  </div>
  );
}

export default App;
