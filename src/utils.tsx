export function formatParamURL(param: string) {
  return param.toLowerCase().replace(/ /g, "-");
}

export function formatPhoneNumber(phone: string) {
  return phone ? phone.replace(/\D/g, '') : phone;
}