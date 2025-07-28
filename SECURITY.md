# 🔐 Security Guidelines

## ⚠️ CRITICAL: Credential Management

This project integrates with several services that require sensitive credentials. **Follow these guidelines to keep your data secure.**

### 🚨 Never Commit These to Git:

- ❌ OAuth2 Client IDs and Secrets
- ❌ API Keys (GoHighLevel, Cursor, GitHub tokens)
- ❌ Passwords or authentication tokens
- ❌ Personal email addresses or phone numbers
- ❌ Any file named `.env` or containing real credentials

### ✅ Safe to Commit:

- ✅ Pipeline IDs and Stage IDs (these are resource identifiers, not secrets)
- ✅ Location IDs (operational configuration)
- ✅ Placeholder values like `your_api_key_here`
- ✅ Documentation and setup guides
- ✅ Example configurations with dummy data

## 🛡️ Security Best Practices

### 1. Environment Variables

**Use environment variables for all sensitive data:**

```bash
# Copy environment-variables.example to .env
cp environment-variables.example .env

# Edit .env with your actual credentials
# The .env file is automatically ignored by Git
```

### 2. n8n Credential Manager

**Store credentials in n8n's secure credential manager:**

1. Go to Settings → Credentials
2. Create credentials for each service
3. Never reference credentials directly in workflows
4. Use credential references instead: `{{ $credentials.myCredential }}`

### 3. GoHighLevel OAuth2 Security

**When creating your OAuth2 app:**

- ✅ Use minimal required scopes only
- ✅ Set proper redirect URL: `https://oauth.n8n.cloud/oauth2/callback`
- ✅ Regularly rotate Client Secrets if compromised
- ✅ Monitor app access logs in GoHighLevel

**Required scopes (minimum):**

```
locations.readonly
contacts.readonly
contacts.write
opportunities.readonly
opportunities.write
users.readonly
```

### 4. GitHub Security

**For GitHub integration:**

- ✅ Use Personal Access Tokens (PAT) with minimal permissions
- ✅ Set token expiration dates
- ✅ Only grant repository access needed
- ✅ Store tokens in n8n credential manager

### 5. File Security

**These files should never contain real credentials:**

```
❌ ghl-config-reference.md (only examples/placeholders)
❌ client-onboarding-workflow.json (use credential references)
❌ test-ghl-api.js (prompts for input, never hardcoded)
❌ frontend-upload/script.js (use placeholders, not real API keys)
```

### 6. Frontend API Key Security

**For the frontend audio transcriber app:**

- ✅ **Development**: Use `script-local.js` for real API keys (gitignored)
- ✅ **Template**: Use `config.example.js` as a template
- ✅ **Placeholders**: Keep `script.js` with placeholder values only
- ❌ **Never commit**: Real Assembly AI API keys or n8n webhook URLs

**Frontend API Key Best Practices:**

```bash
# Copy template and add real credentials (this file is gitignored)
cp frontend-upload/config.example.js frontend-upload/script-local.js

# Edit script-local.js with your actual API keys
# Use script-local.js for development
# Keep script.js with placeholders for version control
```

**⚠️ Production Warning**: Frontend API keys are visible to users. For production:

- Use server-side proxy for API calls
- Implement rate limiting and authentication
- Consider backend-only transcription processing

## 🔍 Security Checklist Before Git Push

- [ ] No real API keys in any files
- [ ] No OAuth2 Client IDs/Secrets in files
- [ ] No Assembly AI API keys in frontend JavaScript files
- [ ] No n8n webhook URLs in frontend JavaScript files
- [ ] All `.env` files are in `.gitignore`
- [ ] Only placeholder/example values in documentation
- [ ] Workflow files use credential references, not hardcoded values
- [ ] Personal information removed (emails, phone numbers)
- [ ] Frontend apps use placeholder values in committed code

## 🚨 If Credentials Are Compromised

**If you accidentally commit credentials:**

1. **Immediately revoke the credentials:**

   - GoHighLevel: Developer Portal → My Apps → Regenerate Secret
   - GitHub: Settings → Developer Settings → Revoke token
   - Cursor: Generate new API key

2. **Remove from Git history:**

   ```bash
   # Remove sensitive file from Git history
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch path/to/sensitive/file' \
   --prune-empty --tag-name-filter cat -- --all

   # Force push to rewrite history
   git push origin --force --all
   ```

3. **Update credentials everywhere:**
   - n8n credential manager
   - Environment variables
   - Documentation (if references exist)

## 🔐 Production Security

**For production deployments:**

- ✅ Use HTTPS everywhere
- ✅ Implement proper webhook authentication
- ✅ Set up monitoring and alerting
- ✅ Regular credential rotation
- ✅ Access logging and audit trails
- ✅ Backup encryption

## 📞 Security Questions?

If you're unsure about any security aspect:

1. Check the [OAuth2 Setup Guide](oauth2-setup-guide.md)
2. Review [n8n Security Documentation](https://docs.n8n.io/hosting/security/)
3. Consult [GoHighLevel Security Best Practices](https://help.gohighlevel.com/)

---

**Remember: When in doubt, don't commit it. Better safe than sorry!** 🛡️
