import React, { useEffect, useState } from 'react';
import SignDto from '../interfaces/SignDto';
import FieldDto from '../interfaces/FieldDto';
import BladeSign from '../components/signs/BladeSign';
import CautionarySign from '../components/signs/CautionarySign';
import RecreationSiteBoundarySign from '../components/signs/RecreationSiteBoundarySign';
import WelcomeSign from '../components/signs/WelcomeSign';
import {elementToSVG} from 'dom-to-svg';
import opentype from "opentype.js";
import { createRoot } from 'react-dom/client';
import InformationSign from '@/components/signs/InformationSign';
import RegulatorySign from '@/components/signs/RegulatorySign';
import NumberPost from '@/components/signs/NumberPost';
import FacilitySign from '@/components/signs/FacilitySign';
export const renderSignMarkup = (
  sign: SignDto,
  fields: Map<string, FieldDto>,
  metadata: Map<string, string>,
  isRealSize = false
) => {
  const slug = sign.category.slug?.toLowerCase();

    if(slug?.includes('camp-sign-number-post')) {
      return <NumberPost fields={fields} metadata={metadata} />;
    }

  if(slug?.includes('regulatory')) {
    return <RegulatorySign fields={fields} metadata={metadata} isRealSize />;
  }

  if(slug?.includes('information')) {
    return <InformationSign fields={fields} metadata={metadata} isRealSize />;
  }
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
  if(slug.includes('facility')){
    return <FacilitySign fields={fields} metadata={metadata} isRealSize />
  }

  return <div>Unsupported sign type</div>;
};
const waitForAllSvgs = (root: HTMLElement) => {
  return new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      const containers = root.querySelectorAll(".svg-container");
      const loaded = root.querySelectorAll(".svg-container svg");

      console.log(
        `SVG containers: ${containers.length}, Loaded SVGs: ${loaded.length}`
      );

      if (
        containers.length > 0 &&
        containers.length === loaded.length
      ) {
        clearInterval(interval);
        resolve();
      }
    }, 50);
  });
};
export const InlineSVG = ({
  src,
  width,
  height,
  className,
}: {
  src: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}) => {
  const [svg, setSvg] = useState("");

  useEffect(() => {
    fetch(src,{ method: "GET", mode: "cors"})
      .then((res) => res.text())
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "image/svg+xml");
        const svgEl = doc.querySelector("svg");

        if (svgEl) {
          if (width) svgEl.setAttribute("width", '100%');
          if (height) svgEl.setAttribute("height", '100%');

          // Ensure viewBox exists
          if (!svgEl.getAttribute("viewBox")) {
            const w = svgEl.getAttribute("width");
            const h = svgEl.getAttribute("height");
            if (w && h) {
              svgEl.setAttribute("viewBox", `0 0 ${w} ${h}`);
            }
          }
        }
        setSvg(svgEl?.outerHTML || data);
      });
  }, [src]);

  return (
    <span
        className='svg-container'
      style={{width, height}}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
export const loadSvg = async (src: string) => {
  const res = await fetch(src);
  return await res.text();
};
export const exportToSvg = async (
  sign: SignDto,
  fields: Map<string, FieldDto>,
  metadata: Map<string, string>,
  name: string
) => {
  // 1. Create real DOM container
  const element = document.createElement("div");

  element.style.position = "fixed";
  element.style.left = "0";
  element.style.top = "0";
  element.style.width = "10000px";

  document.body.appendChild(element);

  // 2. Mount REAL React tree (NOT static markup)
  const root = createRoot(element);

  root.render(renderSignMarkup(sign, fields, metadata,true));

  // 3. Wait for browser paint + async SVG injections
  await new Promise((resolve) => requestAnimationFrame(resolve));

  // (optional but more stable)
  await new Promise((resolve) => setTimeout(resolve, 100));

  // 4. Now DOM is real → SVGs can exist
  const exportElements = element.querySelectorAll(".exportable");

  if (!exportElements.length) {
    throw new Error("Export element not found");
  }

  const serializer = new XMLSerializer();

  for (let index = 0; index < exportElements.length; index += 1) {
    const exportElement = exportElements[index] as HTMLElement;

    // 5. Convert DOM → SVG
    const svg = elementToSVG(exportElement);

    // 6. Convert text → paths
    await convertTextToPaths(svg as unknown as SVGElement);

    // 7. Serialize SVG
    const svgString = serializer.serializeToString(svg);

    // 8. Download
    const blob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    let prefix = exportElement.getAttribute("data-prefix");
    if(prefix) {
      prefix = prefix+"-";
    }
    else{
      prefix = "";
    }
    link.download = `${prefix}${name || "sign"}.svg`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  // 9. Cleanup React + DOM
  root.unmount();
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

        console.log(`${content} ${x} ${y}`);

      for (const char of content) {
        const glyph = font.charToGlyph(char);
        const shiftY =  0.325 * fontSize;
        console.log(`${char} ${fontSize} ${font.unitsPerEm} ${shiftY}`);
        const glyphPath = glyph.getPath(x, y - shiftY, fontSize);
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
