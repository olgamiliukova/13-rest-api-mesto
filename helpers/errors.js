/* eslint-disable consistent-return */
const resolvers = {
  casterror(message, res) {
    return res.status(400).send({
      message,
    });
  },
  validationerror(message, res) {
    return res.status(400).send({
      message,
    });
  },
};

module.exports = (err, res) => {
  if (!(err instanceof Error)) {
    return err;
  }

  if (!err.name || !(err.name.toLowerCase() in resolvers)) {
    console.error(err);
    return res.status(500).send({
      message: 'Server Error',
    });
  }

  return resolvers[err.name.toLowerCase()](err.message, res);
};
