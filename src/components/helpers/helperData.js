const v = {
  EMPTY: 'EMPTY',
  SHOW: 'SHOW',
  CREATE: 'CREATE',
  SAVING: 'SAVING', 
  ERROR_SAVING: 'ERROR_SAVING',
  CONFIRM: 'CONFIRM',
  DELETING: 'DELETING',
  ERROR_DELETING: 'ERROR_DELETING',
  EDIT: 'EDIT',
  UPDATING: 'UPDATING',
  ERROR_UPDATING: 'ERROR_UPDATE',
  EMPTY_SAVING: 'EMPTY_SAVING',
  OOPS: 'OOPS',
  SET_APPLICATION: 'setApplication', 
  SET_ASYNC: 'setAsync',
  SET_DAY: 'setDay',
  week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], 
  today: new Date()

}
module.exports = { v };