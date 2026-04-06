export const camelCaseName = (componentName: string) => componentName.charAt(0).toLowerCase() + componentName.slice(1);

export const contentIndex = (componentName: string) => {
  return `export { default as ${componentName} } from "./${componentName}";\n`;
};

export const contentComponent = (componentName: string) => {
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
  return <div className={styles.${camelCaseName(componentName)}}></div>;
};

// export
export default ${componentName};`;
};

export const contentType = (componentName: string) => {
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

export const contentStyle = (componentName: string) => {
  return `@use "variables" as *;
@use "mixins" as *;

// Elements
.${camelCaseName(componentName)} {
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
