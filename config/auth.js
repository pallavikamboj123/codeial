  
module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
          console.log('inside isauthenticated');
        return next();
      }
      console.log('outside isauthenticated');
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/sign-up');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
          console.log('inside not is authenticated');
        return next();
      }
      console.log('outside not is authenticated');
      res.redirect('/messages');      
    }
  };