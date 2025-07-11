# n8n Client Onboarding Workflow Setup Guide

## 📋 Prerequisites

Before importing the workflow, ensure you have:

1. **n8n instance** (cloud or self-hosted)
2. **GoHighLevel account** with API access
3. **Google Drive account** with API access
4. **GitHub account** with repository access
5. **Cursor.sh API access** (if available)

## 🔧 Step-by-Step Setup

### 1. Import the Workflow

1. Open your n8n instance
2. Go to **Workflows** → **Import from File**
3. Upload `client-onboarding-workflow.json`
4. The workflow will be imported with placeholder credentials

### 2. Configure Credentials

#### GoHighLevel Credentials
1. Go to **Settings** → **Credentials**
2. Click **Add Credential**
3. Select **GoHighLevel API**
4. Enter your GoHighLevel API key
5. Test the connection
6. Note the credential ID for the workflow

#### Google Drive Credentials
1. Go to **Settings** → **Credentials**
2. Click **Add Credential**
3. Select **Google Drive OAuth2**
4. Follow the OAuth2 setup process
5. Grant necessary permissions (Drive access)
6. Note the credential ID

#### GitHub Credentials
1. Go to **Settings** → **Credentials**
2. Click **Add Credential**
3. Select **GitHub OAuth2**
4. Follow the OAuth2 setup process
5. Grant repository access permissions
6. Note the credential ID

### 3. Update Workflow Credentials

Replace the placeholder credential IDs in the workflow:

```json
"credentials": {
  "goHighLevelApi": {
    "id": "REPLACE_WITH_YOUR_GOHIGHLEVEL_CREDENTIAL_ID",
    "name": "GoHighLevel API"
  }
}
```

Do this for all credential references in the workflow.

### 4. Configure Environment Variables

Add these environment variables in n8n:

```bash
# Cursor.sh API (if available)
CURSOR_API_KEY=your_cursor_api_key_here

# GitHub configuration
GITHUB_USERNAME=your_github_username
GITHUB_REPO_NAME=client-prototypes

# GoHighLevel configuration
GOHIGHLEVEL_PIPELINE_ID=your_pipeline_id
GOHIGHLEVEL_PROTOTYPE_STAGE_ID=prototype_in_progress_stage_id
GOHIGHLEVEL_DELIVERED_STAGE_ID=prototype_delivered_stage_id
GOHIGHLEVEL_EMAIL_TEMPLATE_ID=your_success_email_template_id
GOHIGHLEVEL_ERROR_TEMPLATE_ID=your_error_email_template_id

# Google Drive configuration
GOOGLE_DRIVE_FOLDER_ID=your_google_drive_folder_id
```

### 5. Update Workflow Parameters

#### GoHighLevel Nodes
- **Pipeline ID**: Replace `your-pipeline-id` with your actual pipeline ID
- **Stage IDs**: Replace stage IDs with your actual stage IDs
- **Email Template IDs**: Replace with your actual email template IDs

#### Google Drive Nodes
- **Parent Folder ID**: Replace `your-google-drive-folder-id` with your actual folder ID

#### GitHub Nodes
- **Repository Name**: Update if you want to use a different repository name
- **Branch Strategy**: Modify if you want different branching logic

### 6. Test the Workflow

#### Test Webhook
1. Activate the workflow
2. Copy the webhook URL from the Webhook Trigger node
3. Test with sample data:

```json
{
  "clientName": "Test Client",
  "projectName": "Test Project",
  "projectDescription": "A test project for workflow validation",
  "clientEmail": "test@example.com",
  "clientPhone": "+1234567890"
}
```

#### Test Individual Nodes
1. Test each credential connection
2. Verify API permissions
3. Check error handling paths

### 7. Configure Error Handling

#### Cursor.sh Fallback
If Cursor.sh API is not available, the workflow includes fallback HTML/CSS/JS templates. You can customize these in the "Process Wireframe" node.

#### Retry Logic
Add retry nodes for critical operations:
- GitHub API calls
- GoHighLevel API calls
- External service calls

### 8. Monitoring Setup

#### Execution Logging
The workflow includes execution logging. Consider:
- Setting up webhook notifications for failed executions
- Creating a dashboard for workflow metrics
- Setting up alerts for long execution times

#### Performance Monitoring
Track these metrics:
- Total execution time
- Success rate per step
- API response times
- Error frequency

## 🚀 Production Deployment

### 1. Security Considerations
- Use environment variables for all sensitive data
- Implement rate limiting
- Set up proper webhook authentication
- Monitor API usage

### 2. Scaling Considerations
- Consider parallel processing for independent operations
- Implement queue management for high volume
- Set up load balancing if needed

### 3. Backup Strategy
- Export workflow configurations regularly
- Backup credential configurations
- Document custom modifications

## 🔍 Troubleshooting

### Common Issues

#### Credential Errors
- Verify API keys are correct
- Check OAuth2 token expiration
- Ensure proper permissions are granted

#### API Rate Limits
- Implement delays between API calls
- Use exponential backoff for retries
- Monitor API usage quotas

#### Workflow Failures
- Check execution logs for specific errors
- Verify data format matches expectations
- Test individual nodes in isolation

### Debug Mode
Enable debug mode in n8n to see detailed execution information:
1. Go to **Settings** → **Workflows**
2. Enable **Debug Mode**
3. Run test executions
4. Review detailed logs

## 📞 Support

If you encounter issues:
1. Check n8n documentation
2. Review API documentation for each service
3. Test individual components
4. Check execution logs for specific error messages

## 🎯 Next Steps

After successful setup:
1. Create client intake forms
2. Set up email templates in GoHighLevel
3. Configure GitHub Pages for your repository
4. Test with real client data
5. Monitor and optimize performance 