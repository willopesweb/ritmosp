export function formatParamURL(param: string) {
  return param.toLowerCase().replace(/ /g, "-");
}