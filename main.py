from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qsl

import json

host = "localhost"
port = 8080


class SimpleServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        query = urlparse(self.path).query
        query_components = dict(parse_qsl(query))
        self.wfile.write(bytes(json.dumps(query_components), encoding='utf8'))


if __name__ == "__main__":
    webServer = HTTPServer((host, port), SimpleServer)
    print(f'Server started at http://{host}:{port}')

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
