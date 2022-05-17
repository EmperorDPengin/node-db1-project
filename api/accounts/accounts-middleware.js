const Accounts = require('./accounts-model');
const yup = require('yup');

module.exports = {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload
}

const accountSchema = yup.object().shape({
  name: yup
    .string("name of account must be a string")
    .trim()
    .typeError("name of account must be a string")
    .required("name and budget are required")
    .min(2, "name of account must be between 3 and 100")
    .max(199, "name of account must be between 3 and 100"),
  budget: yup
    .number("budget of account must be a number")
    .typeError("budget of account must be a number")
    .nullable(false, "must be a number")
    .required("name and budget are required" )
    .positive()
    .min(0, "budget of account is too large or too small")
    .max(1000000, "budget of account is too large or too small")
    
})


 function checkAccountPayload(req, res, next) {
  // DO YOUR MAGIC
  accountSchema.validate(req.body,
    {
      strict: true,
      stripUnknown: true
    })
      .then(validate => {
        req.body = validate;
        next();
      })
      .catch(err => {
        next({ status: 400, message: err.message})
      })
}

function checkAccountNameUnique(req, res, next) {
  // DO YOUR MAGIC
  Accounts.getAll()
    .then(accounts => {
      let foundAccounts = accounts.filter(account =>  account.name === req.body.name)
      if(foundAccounts.length < 1) {
        next();
      } else {
        next({ status: 400, message: 'that name is taken'});
      }
    })
    .catch(next);
}

function checkAccountId(req, res, next) {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id)
    .then(accountById => {
      if(accountById){
        req.account = accountById;
        next();
      }else {
        next({ status: 404, message: "account not found"})
      }
    })
    .catch(next);

}
