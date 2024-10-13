import jwt from 'jsonwebtoken'

export const requestAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ message: 'Not authenticated' })

    const decoded = jwt.verify(
      token,
      'eb8035fc3d727419045e83dab614eff57c79e10d'
    )
    req.user = decoded.user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}
