export const maskCpf = (value: string) => {
  let v = value.replace(/\D/g, '')
  if (v.length <= 11) {
    v = v.replace(/(\d{3})(\d)/, '$1.$2')
    v = v.replace(/(\d{3})(\d)/, '$1.$2')
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }
  return v
}

export const maskPhone = (value: string) => {
  let v = value.replace(/\D/g, '')
  if (v.length <= 11) {
    v = v.replace(/(\d{2})(\d)/, '($1) $2')
    v = v.replace(/(\d{5})(\d)/, '$1-$2')
  }
  return v
}
