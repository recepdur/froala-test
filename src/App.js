import React from 'react';
import { useEffect, useState } from 'react';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import Editor from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import 'froala-editor/js/plugins.pkgd.min.js';
import Froalaeditor from 'froala-editor';

// import './html2pdf.bundle.js'
// import Html2Pdf from 'html2pdf.js';
// import { jsPDF } from "jspdf";
// import { html2canvas } from 'html2canvas';
// import domtoimage from 'dom-to-image'; 

function App() {
  const [model, setModel] = useState("test content");

  useEffect(() => {
    setModel(`<h2>HTML Edit&ouml;r Kullanımı</h2>
    <ul>
  <li>Metni <strong>istediğiniz </strong><em>gibi</em> <span style="background-color: #f1c40f;">formatlayabilirsiniz.</span></li>
  <li><a href="https://kuveytturk.com.tr/" target="_blank" rel="noopener">Link </a>verebilirsiniz.</li>
  <li>Resim ekleyebilir, boyutlarını değiştirebilirsiniz.</li>
  </ul >
  <p><img src="http://localapps.kuveytturk.com.tr/BOastore/mailing/02/KTLogo.png" alt="Kuveyt Türk logo" width="150" height="70" /></p>
  <ul>
  <li>Tablo ekleyip d&uuml;zenleyebilirsiniz.</li>
  </ul>
  <table style="border-collapse: collapse; width: 59.6567%; height: 44px;" border="1">
  <tbody>
  <tr style="height: 22px;">
  <td style="width: 33.3333%; height: 22px;">Kolon-1</td>
  <td style="width: 33.3333%; height: 22px;">Kolon-2</td>
  <td style="width: 33.3333%;">Kolon-3</td>
  </tr>
  <tr style="height: 22px;">
  <td style="width: 33.3333%; height: 22px;">1</td>
  <td style="width: 33.3333%; height: 22px;">2</td>
  <td style="width: 33.3333%; height: 22px;">3</td>
  </tr>
  <tr>
  <td style="width: 33.3333%;">a</td>
  <td style="width: 33.3333%;">b</td>
  <td style="width: 33.3333%;">c</td>
  </tr>
  </tbody>
  </table>`);
    // var script = document.createElement('script');
    // script.type = 'application/javascript';
    // script.src = 'https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js';
    // document.head.appendChild(script);
  });

  const convertPdf = () => {

    // const input = document.getElementById('printDiv');
    // const pdf = new jsPDF();
    // if (pdf) {
    //   html2canvas(input, {
    //     useCORS: true
    //   })
    //     .then(canvas => {
    //       const imgData = canvas.toDataURL('image/png');
    //       console.log(imgData); //Maybe blank, maybe full image, maybe half of image
    //       pdf.addImage(imgData, 'PNG', 10, 10);
    //       pdf.save('download.pdf');
    //     });
    // }

    // const input = document.getElementById('printDiv');
    // html2canvas(input, {
    //   onrendered: function (canvas) {

    //     var imgData = canvas.toDataURL('image/png');
    //     console.log('Report Image URL: ' + imgData);
    //     var doc = new jsPDF('p', 'mm', [297, 210]); //210mm wide and 297mm high

    //     doc.addImage(imgData, 'PNG', 10, 10);
    //     doc.save('sample.pdf');
    //   }
    // });

    //const input = document.getElementById('divToOfferInfo');
    // const pdf = new jsPDF();
    // if (pdf) {
    //   domtoimage.toPng("model")
    //     .then(imgData => {
    //       pdf.addImage(imgData, 'PNG', 10, 10);
    //       pdf.save('download.pdf');
    //     });
    // }


    // var options = {
    //   margin: 10,
    //   filename: 'myfile.pdf',
    //   image: { type: 'png', quality: 0.98 },
    //   html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
    //   jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    // };
    // var exporter = new Html2Pdf(model, options);
  };

  const convertWord = (htmlContent) => {

    var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    var footer = "</body></html>";
    var sourceHTML = header + htmlContent + footer;

    var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'document.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  // <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.1.2/css/material-design-iconic-font.min.css" />
  Froalaeditor.DefineIconTemplate('material_design', '<i class="zmdi zmdi-[NAME]"></i>');
  Froalaeditor.DefineIcon('testIcon', { NAME: 'home zmdi-hc-fw', template: 'material_design' });

  Froalaeditor.RegisterCommand('testCommand', {
    title: 'Pdf',
    icon: 'testIcon',
    focus: false,
    undo: true,
    refreshAfterCallback: true,
    callback: function () {
      convertWord(this.html.get());
    }
  });

  Froalaeditor.RegisterCommand('convertPdf', {
    title: 'Convert Pdf',
    icon: 'insertFile',
    focus: false,
    undo: true,
    refreshAfterCallback: true,
    callback: function () {
      convertPdf();
    }
  });

  return (
    <div className="App">
      {/* <div id="printDiv">
        <h2>Hello World</h2>
      </div> */}
      <Editor
        model={model}
        onModelChange={setModel}
        tag="textarea"
        config={{
          attribution: false,
          placeholder: "Start typing...",
          toolbarButtons: {
            moreMisc: {
              buttons: [
                'getPDF',
                'testCommand',
                'convertPdf',
                "undo",
                "redo",
                "fullscreen",
                "print",
                "spellChecker",
                "selectAll",
                "html",
                "help"
              ],
              align: "left",
              buttonsVisible: 3
            },
            moreText: {
              buttons: [
                "bold",
                "italic",
                "underline",
                "strikeThrough",
                "subscript",
                "superscript",
                "fontFamily",
                "fontSize",
                "textColor",
                "backgroundColor",
                "inlineClass",
                "inlineStyle",
                "clearFormatting"
              ]
            },
            moreParagraph: {
              buttons: [
                "alignLeft",
                "alignCenter",
                "formatOLSimple",
                "alignRight",
                "alignJustify",
                "formatOL",
                "formatUL",
                "paragraphFormat",
                "paragraphStyle",
                "lineHeight",
                "outdent",
                "indent",
                "quote"
              ]
            },
            moreRich: {
              buttons: [
                "insertLink",
                "insertImage",
                "insertVideo",
                "insertTable",
                "emoticons",
                "fontAwesome",
                "specialCharacters",
                "embedly",
                "insertFile",
                "insertHR"
              ]
            }
          },
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
      {/* <FroalaEditorView model={model} /> */}
    </div>
  );
}

export default App;
