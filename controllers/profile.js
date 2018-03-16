const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
      .then(user => {
          if (user.length > 0) {
            res.json(user[0])
          } else {
              res.status(404).json('User not found.')
          }      
        })
      .catch(err => res.json(err))
    }

    module.exports = {
        handleProfileGet
    }