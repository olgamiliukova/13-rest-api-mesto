/* eslint-disable consistent-return */
const resolvers = {
  casterror(message, res) {
    return res.status(400).send({
      message,
    });
  },
  validationerror(message, res) {
    return res.status(412).send({
      message,
    });
  },
};

module.exports = (err, res) => {
  if (err instanceof Promise || !(err instanceof Error)) {
    return err;
  }

  if (!err.name || !(err.name.toLowerCase() in resolvers)) {
    console.log(err);
    return res.status(500).send({
      message: 'Server Error',
    });
  }

  return resolvers[err.name.toLowerCase()](err.message, res);
};
