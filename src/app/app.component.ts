import { Component, ViewChild } from "@angular/core";
import { filter, take } from "rxjs/operators";
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor
} from "@materia-ui/ngx-monaco-editor";

@Component({
  selector: "my-app",
  templateUrl: `./app.component.html`,
  styleUrls: [`./app.component.css`]
})
export class AppComponent {
  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent: MonacoEditorComponent;
  editorOptions: MonacoEditorConstructionOptions = {
    theme: "myCustomTheme",
    language: "yaml",
    roundedSelection: true,
    autoIndent: true
  };
  code = this.getCode();

  constructor(private monacoLoaderService: MonacoEditorLoaderService) {
    this.monacoLoaderService.isMonacoLoaded$
      .pipe(
        filter(isLoaded => isLoaded),
        take(1)
      )
      .subscribe(() => {
        monaco.editor.defineTheme("myCustomTheme", {
          base: "vs-dark", // can also be vs or hc-black
          inherit: true, // can also be false to completely replace the builtin rules
          rules: [
            {
              token: "comment",
              foreground: "ffa500",
              fontStyle: "italic underline"
            },
            { token: "comment.js", foreground: "008800", fontStyle: "bold" },
            { token: "comment.css", foreground: "0000ff" } // will inherit fontStyle from `comment` above
          ],
          colors: {}
        });
      });
  }

  editorInit(editor: MonacoStandaloneCodeEditor) {
    // monaco.editor.setTheme('vs');
    editor.setSelection({
      startLineNumber: 1,
      startColumn: 1,
      endColumn: 50,
      endLineNumber: 3
    });
  }

  getCode() {
    return (
      // tslint:disable-next-line: max-line-length
      `men: [John Smith, Bill Jones]
women:
  - Mary Smith
  - Susan Williams`
    );
  }
}
