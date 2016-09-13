from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
from urlparse import urlparse
import requests
import json

PORT = 8000

class RequestHandler(BaseHTTPRequestHandler):
  #Handler for the GET requests

  def do_OPTIONS(self):
    fullPath = 'http://api.sportradar.us' + self.path
    r = requests.get(fullPath)
    print r.json()
    self.send_response(200)
    self.send_header('Access-Control-Allow-Origin', '*')
    self.end_headers()
    self.wfile.write(r.json())
    return

  def do_GET(self):
    print self.path
    fullPath = 'http://api.sportradar.us' + self.path
    r = requests.get(fullPath)
    data = r.json()
    self.send_response(200)
    self.send_header('Content-type', 'application/json')
    self.send_header('Access-Control-Allow-Origin', '*')
    self.send_header('Access-Control-Allow-Headers', '*')
    self.send_header('Access-Control-Allow-Methods', '*')
    self.end_headers()
    self.wfile.write(json.dumps(data))
    return

try:
  #Create a web server and define the handler to manage the
  #incoming request
  server = HTTPServer(('', PORT), RequestHandler)
  print 'Started httpserver on port ' , PORT
  
  #Wait forever for incoming htto requests
  server.serve_forever()

except KeyboardInterrupt:
  print '^C received, shutting down the web server'
  server.socket.close()
