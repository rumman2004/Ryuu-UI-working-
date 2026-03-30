// frontend/src/utils/downloadZip.js

import JSZip    from "jszip";
import { saveAs } from "file-saver";

export const downloadComponentZip = (component, language) => {
  const zip     = new JSZip();
  const variant = component.codeVariants.find((v) => v.language === language);

  if (!variant) return;

  const folder = zip.folder(component.slug);

  if (language === "react") {
    folder.file(`${component.name}.jsx`, variant.code);
    if (variant.cssCode) folder.file(`${component.name}.css`, variant.cssCode);
  } else {
    folder.file("index.html", variant.code);
    if (variant.cssCode) folder.file("styles.css",  variant.cssCode);
    if (variant.jsCode)  folder.file("script.js",   variant.jsCode);
  }

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, `${component.slug}.zip`);
  });
};