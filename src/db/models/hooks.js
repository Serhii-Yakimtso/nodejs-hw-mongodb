export const mongooseSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

export const setUpdatesSettings = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
