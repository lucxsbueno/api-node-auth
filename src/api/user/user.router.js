const router = require('express').Router();

const { checkToken } = require('../../auth/check.token');

/**
 *
 *
 *
 * User controller
 */
const { createUser, updateUser, deleteUser, findUserById, findAllUsers, signin } = require('./user.controller');

/**
 *
 *
 * Routes
 */
router.post('/', createUser);
router.patch('/:id', checkToken, updateUser);
router.delete('/:id', checkToken, deleteUser)
router.get('/:id', checkToken, findUserById);
router.get('/', checkToken, findAllUsers);

/**
 *
 * Signin on application
 */
router.post('/signin', signin);

module.exports = router;