# SSL Certificates Directory

This directory should contain your SSL/TLS certificates for HTTPS.

## 🔐 Obtaining SSL Certificates

### Option 1: Let's Encrypt (Recommended - FREE)

Let's Encrypt provides free SSL certificates that are trusted by all major browsers.

#### Using Certbot (Automated)

1. Install Certbot:
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install certbot

# CentOS/RHEL
sudo yum install certbot
```

2. Stop nginx temporarily (if running):
```bash
docker-compose stop frontend nginx-proxy
```

3. Obtain certificate:
```bash
sudo certbot certonly --standalone \
  -d uixom.com \
  -d www.uixom.com \
  -d api.uixom.com \
  --agree-tos \
  --email tu-email@dominio.com
```

4. Copy certificates to this directory:
```bash
sudo cp /etc/letsencrypt/live/uixom.com/fullchain.pem ./nginx/ssl/
sudo cp /etc/letsencrypt/live/uixom.com/privkey.pem ./nginx/ssl/
sudo chmod 644 ./nginx/ssl/*.pem
```

5. Restart services:
```bash
docker-compose up -d
```

#### Automatic Renewal

Let's Encrypt certificates expire after 90 days. Set up automatic renewal:

```bash
# Add to crontab
sudo crontab -e

# Add this line (renews certificates daily and reloads nginx if renewed)
0 0 * * * certbot renew --quiet --deploy-hook "docker-compose -f /path/to/uixom/docker-compose.yml restart frontend nginx-proxy"
```

### Option 2: Cloudflare SSL (Recommended for simplicity)

If you use Cloudflare as your DNS provider:

1. Go to Cloudflare Dashboard → SSL/TLS → Origin Server
2. Click "Create Certificate"
3. Download the certificate and private key
4. Save as:
   - `fullchain.pem` - Certificate
   - `privkey.pem` - Private Key
5. Set SSL/TLS encryption mode to "Full (strict)"

### Option 3: Commercial SSL Certificate

If you purchased an SSL certificate from a provider (GoDaddy, Namecheap, etc.):

1. Download the certificate files from your provider
2. You should have:
   - Certificate file (usually `.crt` or `.pem`)
   - Private key (usually `.key` or `.pem`)
   - CA bundle/chain (optional, but recommended)
3. Rename and place them here:
   - `fullchain.pem` - Your certificate + CA bundle combined
   - `privkey.pem` - Your private key

## 📁 Required Files

After obtaining your certificate, this directory should contain:

```
nginx/ssl/
├── fullchain.pem    # Full certificate chain (required)
├── privkey.pem      # Private key (required)
└── README.md        # This file
```

## 🔒 Security

**IMPORTANT:**
- Never commit `privkey.pem` to Git
- Keep your private key secure
- Set appropriate file permissions:
  ```bash
  chmod 644 fullchain.pem
  chmod 600 privkey.pem
  ```

## ✅ Testing Your SSL Configuration

After setting up SSL, test your configuration:

1. **Online Tools:**
   - https://www.ssllabs.com/ssltest/
   - https://www.immuniweb.com/ssl/

2. **Command Line:**
```bash
# Check certificate expiration
openssl x509 -in fullchain.pem -noout -dates

# Test SSL connection
openssl s_client -connect uixom.com:443 -servername uixom.com
```

3. **Browser:**
   - Visit https://uixom.com
   - Click the padlock icon
   - Verify certificate details

## 🆘 Troubleshooting

### Certificate Not Found
```
Error: cannot load certificate
```
**Solution:** Ensure files are named exactly `fullchain.pem` and `privkey.pem`

### Permission Denied
```
Error: Permission denied
```
**Solution:**
```bash
sudo chown $USER:$USER nginx/ssl/*.pem
chmod 644 nginx/ssl/fullchain.pem
chmod 600 nginx/ssl/privkey.pem
```

### Certificate Expired
**Solution:** Renew your certificate and replace the files

### Mixed Content Warnings
**Solution:** Ensure all resources (images, CSS, JS) are loaded via HTTPS

## 📚 Additional Resources

- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Certbot Documentation](https://certbot.eff.org/docs/)
- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)
- [SSL Best Practices](https://github.com/ssllabs/research/wiki/SSL-and-TLS-Deployment-Best-Practices)

## 🔄 Certificate Renewal Checklist

- [ ] Verify certificate expiration date
- [ ] Renew certificate before expiration
- [ ] Copy new certificates to this directory
- [ ] Restart nginx: `docker-compose restart frontend nginx-proxy`
- [ ] Test HTTPS connection
- [ ] Verify SSL rating on SSLLabs
