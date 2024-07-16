const ctrlWrapper = (controller) => {
  const func = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  // console.log('ctrlWrapper');
  return func;
};

export default ctrlWrapper;
