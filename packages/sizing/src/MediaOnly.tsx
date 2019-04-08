import { FunctionComponent, ReactElement } from "react";
import { useAppSizeContext } from "./AppSize";

export interface MediaOnlyProps {
  /**
   * The children to display.
   */
  children: ReactElement | null;

  /**
   * An optional fallback element to show when the media queries do not match.
   */
  fallback?: ReactElement | null;
}

type DefaultProps = Required<Pick<MediaOnlyProps, "fallback">>;
type WithDefaultProps = MediaOnlyProps & DefaultProps;

/**
 * A simple component that will render the children only when the app is considered
 * in mobile mode via the `AppSizeContext`. A mobile view will be true for both phones
 * and tablets.
 */
export const MobileOnly: FunctionComponent<MediaOnlyProps> = props => {
  const { children, fallback } = props as WithDefaultProps;
  const { isPhone, isTablet } = useAppSizeContext();
  if (isPhone || isTablet) {
    return children;
  }

  return fallback;
};

/**
 * A simple component that will render the children only when the app is considered
 * in phone mode via the `AppSizeContext`.
 */
export const PhoneOnly: FunctionComponent<MediaOnlyProps> = props => {
  const { children, fallback } = props as WithDefaultProps;
  const { isPhone } = useAppSizeContext();
  if (isPhone) {
    return children;
  }

  return fallback;
};

/**
 * A simple component that will render the children only when the app is considered
 * in tablet mode via the `AppSizeContext`.
 */
export const TabletOnly: FunctionComponent<MediaOnlyProps> = props => {
  const { children, fallback } = props as WithDefaultProps;
  const { isTablet } = useAppSizeContext();
  if (isTablet) {
    return children;
  }

  return fallback;
};

/**
 * A simple component that will render the children only when the app is considered
 * in desktop mode via the `AppSizeContext`.
 */
export const DesktopOnly: FunctionComponent<MediaOnlyProps> = props => {
  const { children, fallback } = props as WithDefaultProps;
  const { isDesktop } = useAppSizeContext();
  if (isDesktop) {
    return children;
  }

  return fallback;
};

const defaultProps: DefaultProps = {
  fallback: null,
};

MobileOnly.defaultProps = defaultProps;
PhoneOnly.defaultProps = defaultProps;
TabletOnly.defaultProps = defaultProps;
DesktopOnly.defaultProps = defaultProps;
