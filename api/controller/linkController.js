import Link from '../model/Link.js'

export const addLinks = async (req, res) => {
  try {
    const { links } = req.body

    const bulkOperations = links.map((link) => ({
      updateOne: {
        filter: { user: req.user, platform: link.platform },
        update: { $set: link },
        upsert: true
      }
    }))
    const data = await Link.bulkWrite(bulkOperations)
    res.status(201).json({
      message: 'Links updated successfully',
      data
    })
  } catch (error) {
    next(error)
  }
}

export const getLinks = async (req, res, next) => {
  try {
    const data = await Link.find({ user: req.user })
    res.status(200).json({ message: 'success', data })
  } catch (error) {
    next(error)
  }
}
