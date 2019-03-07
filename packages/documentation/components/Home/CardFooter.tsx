import React, { FunctionComponent, Fragment, ReactNode } from "react";
import { buttonThemeClassNames } from "@react-md/button";
import { Divider } from "@react-md/divider";

import LinkUnstyled from "components/LinkUnstyled";

export interface ICardFooterProps {
  href: string;
  children: ReactNode;
}

const CardFooter: FunctionComponent<ICardFooterProps> = ({
  href,
  children,
}) => (
  <Fragment>
    <Divider />
    <footer className="home__card-footer">
      <LinkUnstyled
        href={href}
        className={buttonThemeClassNames({ themeType: "outline" })}
      >
        {children}
      </LinkUnstyled>
    </footer>
  </Fragment>
);

export default CardFooter;
