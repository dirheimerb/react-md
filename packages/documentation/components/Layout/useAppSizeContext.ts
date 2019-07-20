import { createContext, useContext, useEffect } from "react";
import {
  AppSize,
  useAppSizeContext as useAppSizeContextRMD,
  useToggle,
} from "@react-md/utils";

export const DefaultSize = createContext<AppSize>({
  isPhone: false,
  isTablet: false,
  isDesktop: true,
  isLargeDesktop: true,
  isLandscape: true,
});

let listener = false;

/**
 * This is a pretty bad hack to be honest... Since we can't guarentee that the
 * server side app size detection is correct for desktop and large desktops,
 * this is a way to make sure the initial SSR is used for hydration and will
 * re-render afterwords with the correct sizes. If this isn't done, the entire
 * app will be unmounted and broken.
 *
 * Some side notes:
 * - switching from Fragment to a <span> for some components made it so the
 *   entire app wasn't unmounted. I guess it stops unmounting at the last
 *   parent node.
 * - I might need to rethink the whole app size stuff for SSR since this
 *   is a terrible workaround
 */
export default function useAppSizeContext(): AppSize {
  const defaultSize = useContext(DefaultSize);
  const currentSize = useAppSizeContextRMD();
  const [toggled, , , toggle] = useToggle(false);
  useEffect(() => {
    if (typeof window === "undefined" || listener) {
      return;
    }

    // if this is the the first "render", wait for the initial hydration
    // to finish and then force a re-render so that the correct app size
    // can be used
    const frame = window.requestAnimationFrame(() => {
      listener = true;
      toggle();
    });

    return () => {
      if (process.env.NODE_ENV === "development") {
        // always force re-renering in dev mode because of hot-reloading
        listener = false;
      }
      window.cancelAnimationFrame(frame);
    };
    // only want to run on initial mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return toggled ? currentSize : defaultSize;
}
