/**
 * Generates an optimized SVG shortcode with optional attributes.
 *
 * @param {string} svgName - The name of the SVG file (without the .svg extension).
 * @param {string} [ariaName=''] - The ARIA label for the SVG.
 * @param {string} [className=''] - The CSS class name for the SVG.
 * @param {string} [styleName=''] - The inline style for the SVG.
 * @returns {Promise<string>} The optimized SVG shortcode.
 */

import { optimize } from "svgo";
import { readFileSync } from "node:fs";

export const svgShortcode = async (
  svgName,
  ariaName = "",
  className = "",
  styleName = "",
) => {
  const fileName = svgName.toLowerCase();
  const filePath = `./src/assets/svg/${fileName}.svg`;
  const svgData = readFileSync(filePath, "utf8");

  const { data } = await optimize(svgData);

  return data.replace(
    /<svg(.*?)>/,
    `<svg$1 ${ariaName ? `aria-label="${ariaName}"` : 'aria-hidden="true"'} ${
      className ? `class="${className}"` : ""
    } ${styleName ? `style="${styleName}"` : ""} >`,
  );
};
