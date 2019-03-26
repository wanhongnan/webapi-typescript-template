rem PRIVATE KEY
openssl genrsa -out key.pem 2048
rem CERTIFICATE REQUEST
openssl req -new -sha256 -key key.pem -out csr.pem
rem CERTIFICATE
openssl x509 -req -in csr.pem -signkey key.pem -out cert.pem
