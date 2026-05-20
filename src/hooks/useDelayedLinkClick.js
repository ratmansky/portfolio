import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  clearFillAnimation,
  findHoverLinkTarget,
  releaseLinkFocus,
  shouldDelayLinkNavigation,
  triggerFillAnimation,
  waitForFillThen,
} from '../utils/touchLinkNavigation';

export default function useDelayedLinkClick() {
  const navigate = useNavigate();
  const pendingRef = useRef(false);
  const activeHoverTargetRef = useRef(null);

  useEffect(() => {
    return () => {
      clearFillAnimation(activeHoverTargetRef.current);
      activeHoverTargetRef.current = null;
      pendingRef.current = false;
    };
  }, []);

  return useCallback(
    (event, { to, href, isExternal }) => {
      if (!shouldDelayLinkNavigation(event)) {
        return;
      }

      if (pendingRef.current) {
        event.preventDefault();
        return;
      }

      const hoverTarget = findHoverLinkTarget(event.currentTarget);
      if (!hoverTarget) {
        return;
      }

      event.preventDefault();
      pendingRef.current = true;
      activeHoverTargetRef.current = hoverTarget;
      triggerFillAnimation(hoverTarget);

      const navigateAfterFill = () => {
        clearFillAnimation(hoverTarget);
        releaseLinkFocus(event.currentTarget);
        activeHoverTargetRef.current = null;
        pendingRef.current = false;

        if (to) {
          navigate(to);
          return;
        }

        if (!href) {
          return;
        }

        if (isExternal) {
          window.open(href, '_blank', 'noopener,noreferrer');
          return;
        }

        window.location.assign(href);
      };

      waitForFillThen(navigateAfterFill, hoverTarget);
    },
    [navigate],
  );
}
