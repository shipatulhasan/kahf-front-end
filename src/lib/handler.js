export const validateField = (name, value) => {
  let error = ''
  if (!value) {
    error = `${name} is required`
  } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
    error = 'Enter a valid email address'
  }
  return error
}
export const handleBlur = (e, setErrors) => {
  const { name, value } = e.target
  const error = validateField(name, value)

  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: error
  }))
}
