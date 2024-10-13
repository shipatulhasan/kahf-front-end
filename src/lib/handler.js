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
const platformUrls = {
  github: 'github.com',
  youtube: 'youtube.com'
}

export const isValidUrl = (url, platform) => {
  try {
    const parsedUrl = new URL(url)
    if (
      platform != 'custom' &&
      !parsedUrl.hostname.includes(platformUrls[platform])
    ) {
      return {
        valid: false,
        message: `It's not a valid ${platform} link.`
      }
    }

    return { valid: true, message: '' }
  } catch (_) {
    return { valid: false, message: 'The URL format is invalid.' }
  }
}
