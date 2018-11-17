import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export type ListElement = HTMLUListElement | HTMLOListElement;

export interface IListProps extends React.HTMLAttributes<ListElement> {
  /**
   * The role to apply to the list. This should really be one of:
   * - list
   * - tree
   * - navigation
   * - menu
   * - listbox
   *
   * but any value will be supported in case I forgot a use-case for lists.
   */
  role?: string;
  style?: React.CSSProperties;

  /**
   * An optional className to apply.
   */
  className?: string;

  /**
   * Boolean if the "dense" spec should be applied to the list. this will just reduce
   * the vertical padding a bit by default.
   */
  dense?: boolean;

  /**
   * Boolean if the list has a specific order. This will update the list to be
   * rendered as a `<ol>` instead of `<ul>`.
   */
  ordered?: boolean;

  /**
   * Boolean if the list should be positioned inline (horizontally) instead of vertically.
   */
  inline?: boolean;

  /**
   * The children to render within the list. This should normally be the `ListItem` component, but
   * it can also be links or any other element.
   */
  children?: React.ReactNode;

  /**
   * An optional forwareded ref. This is really "private" but it is being documented so that it is know
   * that applying a `ref` to a `List` will return the actual ul or ol element instead of the component
   * instance.
   */
  forwardedRef?: React.Ref<ListElement>;
}

export interface IListDefaultProps {
  role: "list";
  dense: boolean;
  inline: boolean;
  ordered: boolean;
}

export type ListWithDefaultProps = IListProps & IListDefaultProps;

/**
 * The `List` component is an extremely simple wrapper around the `ol` and `ul` elements that will not
 * render the normal list styles. This should normally be used along with the `Listitem` or `ListItemLink`
 * components.
 */
class List extends React.Component<IListProps> {
  public static propTypes = {
    role: PropTypes.string,
    dense: PropTypes.bool,
    inline: PropTypes.bool,
    ordered: PropTypes.bool,
  };

  public static defaultProps: IListDefaultProps = {
    role: "list",
    dense: false,
    inline: false,
    ordered: false,
  };

  public render() {
    const { className, dense, inline, ordered, children, forwardedRef, ...props } = this
      .props as ListWithDefaultProps;

    return React.createElement(
      ordered ? "ol" : "ul",
      {
        ...props,
        ref: forwardedRef,
        className: cn(
          "rmd-list",
          {
            "rmd-list--dense": dense,
            "rmd-list--inline": inline,
          },
          className
        ),
      },
      children
    );
  }
}

export default React.forwardRef<ListElement, IListProps>((props, ref) => (
  <List {...props} forwardedRef={ref} />
));