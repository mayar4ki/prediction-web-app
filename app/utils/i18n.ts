export function translate(key: string, args?: Record<string, unknown>) {
  const { $i18n } = useNuxtApp();
  return $i18n.t(key, args as Record<string, unknown>);
}
