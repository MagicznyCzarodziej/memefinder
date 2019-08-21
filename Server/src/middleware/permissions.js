export default class PermissionsMiddleware {
  check(permissionName) {
    return function (req, res, next) {
      const { user } = res.locals;
      if (!user.permissions.includes(permissionName)) {
        return res.status(401).send({
          data: {
            error: {
              code: 'INSUFFICIENT_PERMISSIONS',
              message: `${permissionName} permission is required`,
            },
          },
        });
      }
      next();
    }
  }
};
