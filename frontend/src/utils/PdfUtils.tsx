import FieldDto from "@/interfaces/FieldDto";
import SignDto from "@/interfaces/SignDto";
import { jsPDF } from "jspdf";
import "svg2pdf.js";

export const downloadPdf = async (
    svg: SVGSVGElement,
    exportElement: HTMLElement,
    name: string,
) => {
    // 1. Calculate dimensions automatically from SVG or DOM element
    let pixelWidth = 0;
    let pixelHeight = 0;

    // Try reading from viewBox
    if (svg instanceof SVGSVGElement && svg.viewBox && svg.viewBox.baseVal) {
      pixelWidth = svg.viewBox.baseVal.width;
      pixelHeight = svg.viewBox.baseVal.height;
    }

    // Fallback 1: Try reading from explicit width/height attributes
    if (!pixelWidth || !pixelHeight) {
      pixelWidth = parseFloat(svg.getAttribute("width") || "0");
      pixelHeight = parseFloat(svg.getAttribute("height") || "0");
    }

    // Fallback 2: Fallback to the original HTML layout dimensions
    if (!pixelWidth || !pixelHeight) {
      pixelWidth = exportElement.offsetWidth;
      pixelHeight = exportElement.offsetHeight;
    }

    // 2. Convert pixels to inches (1 inch = 72 pixels)
    const svgWidthInches = pixelWidth / 72;
    const svgHeightInches = pixelHeight / 72;

    // 3. Initialize jsPDF using the custom inches
    const doc = new jsPDF({
      orientation: svgWidthInches > svgHeightInches ? "landscape" : "portrait",
      unit: "in",
      format: [svgWidthInches, svgHeightInches]
    });

    // 4. Render the SVG object onto the PDF as true vectors
    await doc.svg(svg, {
      x: 0,
      y: 0,
      width: svgWidthInches,
      height: svgHeightInches
    });

    // 5. Generate PDF blob and construct file download properties
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;

    // 6. Follow your exact custom prefix naming logic
    let prefix = exportElement.getAttribute("data-prefix");
    if (prefix) {
      prefix = prefix + "-";
    } else {
      prefix = "";
    }
    link.download = `${prefix}${name || "sign"}.pdf`;

    // 7. Trigger the browser download
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
};
