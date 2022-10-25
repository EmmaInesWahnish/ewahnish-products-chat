import usersService from '../Models/Users.js';

export const testRoute = async (req, res,) => {
  res.json({ message: `Soy una ruta de prueba ;)` })
}

export const uploadRoute = async (req, res, next) => {

  let url = '/uploads/' + req.file.originalname
  let avatar = {
    avatar: url
  }

  let file = req.file
  if (!file) {
    const error = new Error('Error subiendo archivo')
    error.httpStatusCode = 400
    return next(error)
  }
  await usersService.findOneAndUpdate({_id:req.session.user.id}, avatar, {returnOriginal: false})
  res.redirect('/')
}
