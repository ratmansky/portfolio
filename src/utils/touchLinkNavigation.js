export const HOVER_LINK_FILL_MS = 520;
export const HOVER_LINK_FILL_REDUCED_MS = 180;

export function isTouchLikeDevice() {
  return window.matchMedia('(hover: none), (pointer: coarse)').matches;
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getFillDurationMs() {
  return prefersReducedMotion() ? HOVER_LINK_FILL_REDUCED_MS : HOVER_LINK_FILL_MS;
}

export function findHoverLinkTarget(element) {
  if (element.classList.contains('hover-link')) {
    return element;
  }

  return element.querySelector('.hover-link');
}

export function triggerFillAnimation(hoverTarget) {
  hoverTarget.classList.add('hover-link--filled');
}

export function clearFillAnimation(hoverTarget) {
  hoverTarget?.classList.remove('hover-link--filled');
}

export function releaseLinkFocus(linkElement) {
  if (!linkElement) {
    return;
  }

  const activeElement = document.activeElement;

  if (activeElement && linkElement.contains(activeElement)) {
    activeElement.blur();
    return;
  }

  if (typeof linkElement.blur === 'function') {
    linkElement.blur();
  }
}

let touchLinkCleanupInitialized = false;

export function initTouchLinkNavigationCleanup() {
  if (touchLinkCleanupInitialized || typeof window === 'undefined') {
    return;
  }

  touchLinkCleanupInitialized = true;

  window.addEventListener('pageshow', () => {
    document.querySelectorAll('.hover-link--filled').forEach((element) => {
      element.classList.remove('hover-link--filled');
    });

    if (!isTouchLikeDevice()) {
      return;
    }

    const activeElement = document.activeElement;

    if (
      activeElement instanceof HTMLElement &&
      activeElement.closest('.project-item-link, a.hover-link')
    ) {
      activeElement.blur();
    }
  });
}

export function waitForFillThen(callback, hoverTarget) {
  if (!hoverTarget || prefersReducedMotion()) {
    callback();
    return;
  }

  let done = false;

  const finish = () => {
    if (done) {
      return;
    }

    done = true;
    hoverTarget.removeEventListener('transitionend', onTransitionEnd);
    clearTimeout(fallbackTimer);
    clearFillAnimation(hoverTarget);
    callback();
  };

  const onTransitionEnd = (event) => {
    if (event.target !== hoverTarget) {
      return;
    }

    if (event.propertyName === 'background-position') {
      finish();
    }
  };

  hoverTarget.addEventListener('transitionend', onTransitionEnd);
  const fallbackTimer = setTimeout(finish, getFillDurationMs() + 80);
}

export function shouldDelayLinkNavigation(event) {
  if (!isTouchLikeDevice()) {
    return false;
  }

  return !(
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}
