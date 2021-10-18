import React, {
  DOMAttributes,
  forwardRef,
  HTMLAttributes,
  ReactNode,
} from "react";
import cn from "classnames";

import { highlightCode } from "components/Markdown/utils";

import styles from "./CodeBlock.module.scss";
import Code from "./Code";
import LineNumbers from "./LineNumbers";

export interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  /**
   * An optional code language. This should be one of:
   * - js
   * - jsx
   * - javascript
   * - ts
   * - tsx
   * - typescript
   * - css
   * - scss
   * - markup
   * - markdown
   * - bash
   * - shell
   * - git
   * - diff
   * - json
   * - properties
   *
   * And whatever the default Prism languages are. Update the `.babelrc` to add
   * additional languages for the `prismjs` plugin.
   */
  language?: string;

  /**
   * Boolean if the code should be highlighted using Prism
   */
  highlight?: boolean;

  /**
   * Boolean if line numbers should be displayed with the code.
   */
  lineNumbers?: boolean;

  /**
   * This should normally be a string of code to display, but can also be any
   * renderable thing. The {@link highlight} prop will only work for string
   * `children`.
   */
  children: ReactNode;
}

/**
 * Renders a code block with highlighted code using PrismJS.
 */
export default forwardRef<HTMLPreElement, CodeBlockProps>(function CodeBlock(
  {
    className,
    language = "markdown",
    children,
    highlight = true,
    lineNumbers = false,
    suppressHydrationWarning = false,
    ...props
  },
  ref
) {
  const code = typeof children === "string" ? children : "";

  let dangerouslySetInnerHTML: DOMAttributes<HTMLElement>["dangerouslySetInnerHTML"];
  if (code && highlight) {
    dangerouslySetInnerHTML = {
      __html: highlightCode(code, language),
    };
  }

  return (
    <pre
      {...props}
      ref={ref}
      className={cn(
        styles.block,
        lineNumbers && styles.counted,
        `language-${language}`,
        className
      )}
      suppressHydrationWarning={suppressHydrationWarning}
    >
      {lineNumbers && code && <LineNumbers code={code} />}
      <Code
        inline={!highlight || !code}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        suppressHydrationWarning={suppressHydrationWarning}
      >
        {dangerouslySetInnerHTML ? undefined : children}
      </Code>
    </pre>
  );
});
