import webapp2
from google.appengine.ext.webapp import template

class NotFound(webapp2.RequestHandler):
  def get(self):
    self.error(404)
    self.response.out.write(template.render('404.html', {}))

app = webapp2.WSGIApplication([
    ('/.*', NotFound)
], debug=True)