"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentStyle = exports.contentType = exports.contentComponent = exports.contentIndex = exports.camelCaseName = void 0;
const camelCaseName = (componentName) => componentName.charAt(0).toLowerCase() + componentName.slice(1);
exports.camelCaseName = camelCaseName;
const contentIndex = (componentName) => {
    return `export { default as ${componentName} } from "./${componentName}";\n`;
};
exports.contentIndex = contentIndex;
const contentComponent = (componentName) => {
    return `import { ${componentName}Props } from "./${componentName}.types";
import styles from "./${componentName}.module.scss";

// ${componentName} component
const ${componentName} = (props: ${componentName}Props) => {
  // destructuring props
  const {
    // base props
    // variant props
    // modifier props
    // other props
  } = props;

  // other variables/functions/handlers

  // render
  return <div className={styles.${(0, exports.camelCaseName)(componentName)}}></div>;
};

// export
export default ${componentName};`;
};
exports.contentComponent = contentComponent;
const contentType = (componentName) => {
    return `/**
 * @author erelcolak
 * @interface ${componentName}Props
 * @description Prop definitions for ${componentName} component
 */
export interface ${componentName}Props {
  // element props
  // variant props
  // modifier props
  // other props
}`;
};
exports.contentType = contentType;
const contentStyle = (componentName) => {
    return `@use "variables" as *;
@use "mixins" as *;

// Elements
.${(0, exports.camelCaseName)(componentName)} {
}

// Variants
// alignVariant
// colorVariant
// styleVariant
// sizeVariant

// Modifiers

// Interactions
`;
};
exports.contentStyle = contentStyle;
//# sourceMappingURL=utils.js.map