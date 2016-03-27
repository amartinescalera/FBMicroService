'use strict';

/**
 * @apiGroup Facebook
 * @api {get} /user/:token/me Get Me
 * @apiDescription Get user information from facebook. Return several data  (id,name,birthday,email,first_name)
 * @apiVersion 0.1.0
 * @apiName Facebook Information
 * @apiPermission all
 *
 * @apiParam {Number}       token       Send the token generated in facebook authentication
 *
 * @apiExample Example usage:
 * curl -i http://localhost/user/CAAJp5SmLmN8BAFAi6ZBCSH51RDDqhsqJH4z6uzYU4Unk3U45tjQrLw29g6ZBqB8FbNXGVPi70wKtHsBsiy/me
 *
 * @apiSuccess {Number}     id          Facebook Id
 * @apiSuccess {String}     name        User name.
 * @apiSuccess {Date}       birthday    User birthday.
 * @apiSuccess {String}     email       User email (Array of Strings).
 * @apiSuccess {String}     first_name  User first name
 * @apiSuccess {data []}    name, id    User friends information
 * @apiSuccess {data}       picture     User picture
 *
 * @apiError Secret_Id      Invalid Secret Id
 * @apiError Invalid_Token  Invalid or expired Token
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "NoAccessRight"
 *     }
 */
//function getMe() { return; }

/**
 * @apiGroup Facebook
 * @api {get} /user/:token/:user Get User
 * @apiDescription Get friend information from facebook. Return several data  (id,name,birthday,email,first_name)
 * @apiVersion 0.1.0
 * @apiName Facebook Information
 * @apiPermission all
 *
 * @apiParam {Number}       token       Send the token generated in facebook authentication
 *
 * @apiExample Example usage:
 * curl -i http://localhost/user/CAAJp5SmLmN8BAFAi6ZBCSH51RDDqhsqJH4z6uzYU4Unk3U45tjQrLw29g6ZBqB8FbNXGVPi70wKtHsBsiy/me
 *
 * @apiSuccess {Number}     id          Facebook Id
 * @apiSuccess {String}     name        User name.
 * @apiSuccess {Date}       birthday    User birthday.
 * @apiSuccess {String}     email       User email (Array of Strings).
 * @apiSuccess {String}     first_name  User first name
 * @apiSuccess {data []}    name, id    User friends information
 * @apiSuccess {data}       picture     User picture
 *
 * @apiError Secret_Id      Invalid Secret Id
 * @apiError Invalid_Token  Invalid or expired Token
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "NoAccessRight"
 *     }
 */
//function getUser() { return; }