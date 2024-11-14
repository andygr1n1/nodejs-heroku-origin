Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/srv642680.hstgr.cloud/fullchain.pem
Key is saved at: /etc/letsencrypt/live/srv642680.hstgr.cloud/privkey.pem
This certificate expires on 2025-02-12.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Since Let’s Encrypt certificates expire every 90 days, ensure that Certbot is set up to renew them automatically. You can test renewal with:

```
sudo certbot renew --dry-run
```

```
ls -l /etc/letsencrypt/live/srv642680.hstgr.cloud/
```

## regenerate

```
sudo certbot certonly --nginx -d srv642680.hstgr.cloud
```

## permissions

```
sudo chmod -R 755 /etc/letsencrypt/live/
sudo chmod -R 755 /etc/letsencrypt/archive/
```

## verify simlinks

```
ls -l /etc/letsencrypt/live/srv642680.hstgr.cloud/
```

## test

```
openssl x509 -in /etc/letsencrypt/live/srv642680.hstgr.cloud/fullchain.pem -text -noout
```

## docker

```
docker-compose -f docker-compose-prod.yaml up -d --build
docker-compose -f docker-compose-prod.yaml down
```
