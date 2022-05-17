const router = require('express').Router();
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware');
const Accounts = require('./accounts-model');


router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
 Accounts.getAll()
  .then(accs => {
    res.status(200).json(accs);
  })
  .catch(next);
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account);
})

router.post('/',checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.create(req.body)
  .then( createdAccount => {
    res.status(201).json(createdAccount);
  })
  .catch(next);

})

router.put('/:id',checkAccountId, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id, req.body)
  .then( updatedAccount => {
    res.status(200).json(updatedAccount);
  })
  .catch(next)
});

router.delete('/:id',checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
    .then(deletedAccount => {
      res.status(200).json(deletedAccount);
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
    prodmessage: err.message,
  })
})



module.exports = router;
