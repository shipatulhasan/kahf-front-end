export const createUser = async (req, res) => {
  try {
  } catch (err) {
    console.log(err)
  }
}
export const getUser = async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      message: 'Hello'
    })
  } catch (err) {
    console.log(err)
  }
}
