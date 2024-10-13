export const validateField = (name, value) => {
  let error = ''
  if (!value) {
    error = `${name} is required`
  }
  return error
}
export const handleError = (e, setErrors) => {
  const { name, value } = e.target
  const error = validateField(name, value)

  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: error
  }))
}
