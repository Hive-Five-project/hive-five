import { useCallback, useEffect, useState } from 'react';

type UseBoolHook = [
  boolean,
  () => void,
  () => void,
  () => void,
] & {
  value: boolean
  on: () => void
  off: () => void
  toggle: () => void
};

export default function useBool(defaultValue: boolean): UseBoolHook {
  const [value, setValue] = useState<boolean>(defaultValue);
  const toggle = () => setValue(!value);
  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);

  const hook = [value, toggle, on, off] as UseBoolHook;

  // https://twitter.com/ThisIsMissEm/status/1514446878338863118?s=20&t=HwvuY2t293qe6K0UkxA_NA
  hook.value = value;
  hook.toggle = toggle;
  hook.on = on;
  hook.off = off;

  return hook;
}

/**
 * useBool with automatic call to off after a timeout
 */
export function useBoolWithTimeout(defaultValue: boolean, timeout: number): UseBoolHook {
  const bool = useBool(defaultValue);

  useEffect(() => {
    if (bool.value) {
      const t = setTimeout(() => bool.off(), timeout);

      return () => clearTimeout(t);
    }
  }, [bool, timeout]);

  return bool;
}

type UseOpenedHook = [
  boolean,
  () => void,
  () => void,
  () => void,
] & {
  opened: boolean
  close: () => void
  open: () => void
  toggle: () => void
};


export function useOpened(defaultValue: boolean): UseOpenedHook {
  const [opened, toggle, open, close] = useBool(defaultValue);

  const hook = [opened, close, open, toggle] as UseOpenedHook;

  // https://twitter.com/ThisIsMissEm/status/1514446878338863118?s=20&t=HwvuY2t293qe6K0UkxA_NA
  hook.opened = opened;
  hook.close = close;
  hook.open = open;
  hook.toggle = toggle;

  return hook;
}

type UseCollapsedHook = [
  boolean,
  () => void,
  () => void,
  () => void,
] & {
  collapsed: boolean
  close: () => void
  open: () => void
  toggle: () => void
};

export function useCollapsed(defaultValue: boolean): UseCollapsedHook {
  const [collapsed, toggle, open, close] = useBool(defaultValue);

  const hook = [collapsed, open, close, toggle] as UseCollapsedHook;

  // https://twitter.com/ThisIsMissEm/status/1514446878338863118?s=20&t=HwvuY2t293qe6K0UkxA_NA
  hook.collapsed = collapsed;
  hook.close = close;
  hook.open = open;
  hook.toggle = toggle;

  return hook;
}

