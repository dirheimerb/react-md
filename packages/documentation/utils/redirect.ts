import { NextFunctionComponent } from "next";
import Router from "next/router";

export interface IRedirectConfig {
  concat?: boolean;
  statusCode?: number;
}

/**
 * Creates a component that will redirect with nextjs. This should be
 * used from te `pages` folder.
 */
export default function redirect(
  to: string,
  { concat = true, statusCode = 302 }: IRedirectConfig = {}
) {
  const Redirect: NextFunctionComponent = () => null;

  Redirect.getInitialProps = ({ res, pathname }) => {
    const indexPath = concat ? `${pathname}/${to}` : to;

    if (res) {
      res.writeHead(302, {
        Location: indexPath,
      });
      res.end();
    } else {
      Router.replace(indexPath);
    }

    return {};
  };

  return Redirect;
}
