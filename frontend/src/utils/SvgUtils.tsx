import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import SignDto from '../interfaces/SignDto';
import FieldDto from '../interfaces/FieldDto';
import BladeSign from '../components/signs/BladeSign';
import CautionarySign from '../components/signs/CautionarySign';
import RecreationSiteBoundarySign from '../components/signs/RecreationSiteBoundarySign';
import WelcomeSign from '../components/signs/WelcomeSign';
import {elementToSVG} from 'dom-to-svg';
import opentype from "opentype.js";
const renderSignMarkup = (
  sign: SignDto,
  fields: Map<string, FieldDto>,
  metadata: Map<string, string>
) => {
  const slug = sign.category.slug?.toLowerCase();

  if (slug.includes('blade')) {
    return <BladeSign fields={fields} metadata={metadata} isRealSize />;
  }

  if (slug.includes('cautionary')) {
    return <CautionarySign fields={fields} metadata={metadata} isRealSize />;
  }

  if (slug.includes('boundary')) {
    return <RecreationSiteBoundarySign fields={fields} metadata={metadata} isRealSize />;
  }

  if (slug.includes('welcome')) {
    return <WelcomeSign fields={fields} metadata={metadata} isRealSize />;
  }

  return <div>Unsupported sign type</div>;
};
export const exportToSvg = async (
  sign: SignDto,
  fields: Map<string, FieldDto>,
  metadata: Map<string, string>,
  name: string
) => {
  // Create hidden container
  const element = document.createElement("div");
  element.style.position = "fixed";
  element.style.left = "-99999px";
  element.style.top = "0";
  element.style.width = "10000px";

  element.innerHTML = renderToStaticMarkup(
    renderSignMarkup(sign, fields, metadata)
  );

  document.body.appendChild(element);

  // Target exportable element
  const exportElement =
    document.querySelector(".exportable") || element;

  // Convert DOM → SVG
  const svg = elementToSVG(exportElement);

  // Convert text → vector paths (important for print)
  await convertTextToPaths(svg as unknown as SVGElement);
  //await convertTextToPaths(svg, "/fonts/2023_01_01_BCSans-Regular_2f.woff");

  // Serialize SVG
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);

  // Download
  const blob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${name || "sign"}.svg`;
  document.body.appendChild(link);
  link.click();

  link.remove();
  URL.revokeObjectURL(url);
  document.body.removeChild(element);
};

const loadFont = (url: string): Promise<opentype.Font> => {
  return new Promise((resolve, reject) => {
    opentype.load(url, (err, font) => {
      if (err || !font) {
        reject(err);
        return;
      }

      resolve(font);
    });
  });
};
export const convertTextToPaths = async (svg: SVGElement) => {
  const textElements = svg.querySelectorAll("text");

  if (!textElements.length) return;

  const fontCache = new Map<string, opentype.Font>();

  const getFont = async (weight: string | number) => {
    const numericWeight =
      typeof weight === "string"
        ? parseInt(weight) || (weight === "bold" ? 700 : 400)
        : weight;

    const fontPath =
      numericWeight >= 600
        ? "/fonts/2023_01_01_BCSans-Bold_2f.woff"
        : "/fonts/2023_01_01_BCSans-Regular_2f.woff";

    if (!fontCache.has(fontPath)) {
      const font = await loadFont(fontPath);
      fontCache.set(fontPath, font);
    }

    return fontCache.get(fontPath)!;
  };

  for (const text of textElements) {
    const tspans = text.querySelectorAll("tspan");

    const computed = window.getComputedStyle(text);

    const fontSize =
      parseFloat(text.getAttribute("font-size") || "") ||
      parseFloat(computed.fontSize || "16");

    const letterSpacing =
      parseFloat(text.getAttribute("letter-spacing") || "") ||
      parseFloat(computed.letterSpacing || "0") ||
      0;

    const lineHeight =
      parseFloat(text.getAttribute("line-height") || "") * fontSize ||
      parseFloat(computed.lineHeight || "") * fontSize ||
      fontSize * 0.9;

    const fill =
      text.getAttribute("fill") ||
      computed.fill ||
      "#000";

    const fontWeight =
      text.getAttribute("font-weight") ||
      computed.fontWeight ||
      "400";

    const font = await getFont(fontWeight);

    const group = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );

    tspans.forEach((tspan, index) => {
      const content = tspan.textContent || "";

      let x = parseFloat(tspan.getAttribute("x") || "0");

      let y =
        parseFloat(tspan.getAttribute("y") || "0");

      for (const char of content) {
        const glyph = font.charToGlyph(char);

        const glyphPath = glyph.getPath(x, y, fontSize);
        const d = glyphPath.toPathData(1);

        const pathElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );

        pathElement.setAttribute("d", d);
        pathElement.setAttribute("fill", fill);

        group.appendChild(pathElement);

        x +=
          ((glyph.advanceWidth || 0) * fontSize) /
            font.unitsPerEm +
          letterSpacing;
      }
    });

    text.replaceWith(group);
  }
};
