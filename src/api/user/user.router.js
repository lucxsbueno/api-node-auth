const router = require('express').Router();

const { checkToken } = require('../../auth/check.token');

/**
 *
 *
 *
 * User controller
 */
const { createUser, updateUser, deleteUser, findUserById, findAllUsers, searchUser, loadSession, signin } = require('./user.controller');

/**
 *
 * Signin or signup in application
 */
 router.post('/signin', signin);
 router.post('/signup', createUser);

 /**
  * 
  * 
  * load session
  */
router.post('/load-session', checkToken, loadSession);

/**
 *
 * Routes
 */
router.post('/search', checkToken, searchUser);
router.patch('/:id', checkToken, updateUser);
router.delete('/:id', checkToken, deleteUser)
router.get('/:id', checkToken, findUserById);
router.get('/', checkToken, findAllUsers);

module.exports = router;