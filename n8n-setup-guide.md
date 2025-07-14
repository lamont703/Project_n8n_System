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

#### GoHighLevel OAuth2 App Setup

**IMPORTANT**: Before creating credentials in n8n, you must first create an OAuth2 app in GoHighLevel.

##### Step 1: Create OAuth2 App in GoHighLevel

1. **Access Developer Portal**

   - Visit [developers.gohighlevel.com](https://developers.gohighlevel.com)
   - Login with your GoHighLevel account

2. **Create New Application**

   - Navigate to **"My Apps"** → **"Create App"**
   - Enter your app details:
     - **App Name**: `n8n Integration` (or your preferred name)
     - **App Description**: `n8n workflow automation integration`

3. **Configure OAuth Settings**

   - Set **Distribution Type** to **"Sub-Account"**
   - **OAuth Redirect URL**:
     ```
     https://oauth.n8n.cloud/oauth2/callback
     ```
   - **Required Scopes**: Add these scopes:
     - `locations.readonly`
     - `contacts.readonly`
     - `contacts.write`
     - `opportunities.readonly`
     - `opportunities.write`
     - `users.readonly`

4. **Save and Get Credentials**
   - Click **"Create App"**
   - Copy the **Client ID** (long alphanumeric string)
   - Copy the **Client Secret** (long alphanumeric string)
   - **Keep these secure** - you'll need them for n8n

##### Step 2: Configure n8n GoHighLevel Credentials

1. Go to **Settings** → **Credentials** in n8n
2. Click **Add Credential**
3. Select **HighLevel OAuth2** (not the legacy API key option)
4. Fill in the OAuth2 details:
   - **Client ID**: Paste from your GoHighLevel app
   - **Client Secret**: Paste from your GoHighLevel app
   - **Scope**: Enter exactly:
     ```
     locations.readonly contacts.readonly contacts.write opportunities.readonly opportunities.write users.readonly
     ```
5. Click **"Connect my account"**
6. **Authorize in GoHighLevel**:
   - You'll be redirected to GoHighLevel
   - Choose your location/sub-account
   - Grant the requested permissions
   - You'll be redirected back to n8n
7. **Test the connection** and note the credential ID

##### Requirements:

- **GoHighLevel Plan**: Unlimited plan ($297/month) required for OAuth2 API access
- **API Version**: Uses GoHighLevel API v2.0 (recommended over deprecated v1.0)

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

### 4.1. Production Account Details & IDs

**IMPORTANT**: These are the actual production values for the GoHighLevel account integration. Use these exact IDs in your n8n workflow configuration.

#### GoHighLevel Account Information

```bash
# Account Details (Verified via API Test)
ACCOUNT_NAME="Inner G Complete Agency"
LOCATION_ID="QLyYYRoOhCg65lKW9HDX"
PIPELINE_ID="uR2CMkTiwqoUOYuf8oGR"
```

#### Software Development Pipeline Structure

**Pipeline Name**: Software Development Pipeline  
**Pipeline ID**: `uR2CMkTiwqoUOYuf8oGR`

**Stage Configuration** (Use these exact stage IDs in your workflows):

| Stage # | Stage Name                      | Stage ID                               |
| ------- | ------------------------------- | -------------------------------------- |
| 1       | New Lead                        | `6c36dbcf-5711-4759-bbb8-182527cb0758` |
| 2       | Discovery Call                  | `94d76438-fa70-4282-a4df-ad5286a6bf76` |
| 3       | Initial Prototype               | `84de19a4-2f96-4932-ab9c-8ddf4ba29a45` |
| 4       | Prototype Review Meeting        | `e336a05d-cf8b-40d6-9ab7-f7952199e18e` |
| 5       | Prototype Update Round          | `bc431d28-10b2-4c0f-bf80-71744c202eb0` |
| 6       | Final Prototype Review          | `af821356-d6a6-4c6b-a379-36c0ea30e2b6` |
| 7       | Technical Developer Review      | `f7791bd6-bb2d-49ab-9f86-bdd486570564` |
| 8       | Cost Analysis & Timeline Review | `397db6fe-f6fa-41eb-82a2-7d14f3b09aca` |
| 9       | Contract & Proposal             | `52ed5cd7-4539-4e65-93ef-29d5fa14e3c2` |
| 10      | Development Roadmap             | `f0a8c85c-944b-452c-bd8e-e619d10f3150` |
| 11      | Product Delivery                | `5762923f-6951-4dc9-b19e-81fee9d4675a` |

#### Common Stage Usage in Workflows

**For Client Onboarding Automation:**

- **New Contact Creation**: Use stage `6c36dbcf-5711-4759-bbb8-182527cb0758` (New Lead)
- **After Discovery Call**: Move to `94d76438-fa70-4282-a4df-ad5286a6bf76` (Discovery Call)
- **Prototype Generation**: Move to `84de19a4-2f96-4932-ab9c-8ddf4ba29a45` (Initial Prototype)
- **Final Delivery**: Move to `5762923f-6951-4dc9-b19e-81fee9d4675a` (Product Delivery)

#### Account Statistics (API Verified)

- **Total Contacts**: 1,120 contacts available
- **Custom Fields**: 70 custom fields configured
- **API Status**: ✅ Fully operational
- **Last Verified**: API tested successfully on workflow setup

### 5. Update Workflow Parameters

#### GoHighLevel Nodes

- **Pipeline ID**: Replace `your-pipeline-id` with `uR2CMkTiwqoUOYuf8oGR`
- **Location ID**: Replace `your-location-id` with `QLyYYRoOhCg65lKW9HDX`
- **Stage IDs**: Use the stage IDs from the table above based on your workflow needs:
  - For new leads: `6c36dbcf-5711-4759-bbb8-182527cb0758`
  - For prototype stage: `84de19a4-2f96-4932-ab9c-8ddf4ba29a45`
  - For delivery stage: `5762923f-6951-4dc9-b19e-81fee9d4675a`
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
