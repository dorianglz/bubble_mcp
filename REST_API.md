# Bubble REST API

API REST simple pour interagir avec Bubble.io via HTTP. Idéal pour l'Agent Builder de GPT.

## 🚀 Endpoints

### Health Check
```bash
GET /health
```

### Get Schema
```bash
GET /schema
```
Retourne la structure complète de votre app Bubble.

### List Records
```bash
POST /list
Content-Type: application/json

{
  "dataType": "user",
  "limit": 100,
  "cursor": 0
}
```

### Get Single Record
```bash
POST /get
Content-Type: application/json

{
  "dataType": "user",
  "id": "1234567890"
}
```

### Create Record
```bash
POST /create
Content-Type: application/json

{
  "dataType": "custom.organization",
  "data": {
    "name": "My Company",
    "status": "active"
  }
}
```

### Update Record
```bash
POST /update
Content-Type: application/json

{
  "dataType": "custom.organization",
  "id": "1234567890",
  "data": {
    "status": "inactive"
  }
}
```

### Delete Record
```bash
POST /delete
Content-Type: application/json

{
  "dataType": "custom.organization",
  "id": "1234567890"
}
```

### Execute Workflow
```bash
POST /workflow
Content-Type: application/json

{
  "workflowName": "send-email",
  "data": {
    "to": "user@example.com",
    "subject": "Hello"
  }
}
```

## 🛠️ Installation Locale

```bash
# Clone le repo
git clone https://github.com/nocoderoi/bubble_mcp.git
cd bubble_mcp

# Install dependencies
npm install

# Configure .env
cp .env.example .env
# Édite .env avec tes credentials Bubble

# Build
npm run build

# Start API
npm run api
```

L'API sera disponible sur http://localhost:3000

## 🐳 Déploiement Docker

```bash
# Build l'image
docker-compose build

# Start le service
docker-compose up -d

# Check les logs
docker-compose logs -f

# Stop le service
docker-compose down
```

## 🌐 Déploiement VPS

### Sur votre VPS

```bash
# Clone le projet
cd /opt
git clone https://github.com/yourusername/bubble_mcp.git
cd bubble_mcp

# Configure environment
cp .env.example .env
nano .env  # Édite avec tes credentials

# Build et start avec Docker
docker-compose up -d

# Vérifier
curl http://localhost:3000/health
```

### Avec Nginx (reverse proxy)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🤖 Utilisation avec GPT Agent Builder

1. Déploie l'API sur un VPS avec HTTPS
2. Dans GPT Agent Builder, va dans "Actions"
3. Clique "Create new action"
4. Importe le schéma OpenAPI (voir `openapi.yaml`)
5. Configure l'URL de base : `https://your-domain.com`
6. Teste les endpoints

Ton agent GPT pourra maintenant interroger ta base Bubble directement !

## 📝 Variables d'environnement

```env
# Bubble API
BUBBLE_API_URL=https://your-app.bubbleapps.io
BUBBLE_API_TOKEN=your-bubble-api-token

# API Configuration
API_PORT=3000
NODE_ENV=production
```

## 🔒 Sécurité

**Production** : Ajoute de l'authentification !

```typescript
// Exemple middleware auth
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});
```

## 🐛 Debug

```bash
# Logs Docker
docker-compose logs -f

# Test endpoints
curl http://localhost:3000/health
curl http://localhost:3000/schema

# Test with data
curl -X POST http://localhost:3000/list \\
  -H 'Content-Type: application/json' \\
  -d '{"dataType":"user","limit":1}'
```
