# GoHighLevel Configuration Quick Reference

## 📋 Copy-Paste Configuration Values

This document contains all the verified GoHighLevel account details and IDs for quick reference during development.

### Account Information

```bash
ACCOUNT_NAME="Inner G Complete Agency"
LOCATION_ID="QLyYYRoOhCg65lKW9HDX"
PIPELINE_ID="uR2CMkTiwqoUOYuf8oGR"
PIPELINE_NAME="Software Development Pipeline"
```

### Pipeline Stage IDs

#### All Stages (Copy individual IDs as needed)

```bash
# Stage 1: New Lead
NEW_LEAD_STAGE_ID="6c36dbcf-5711-4759-bbb8-182527cb0758"

# Stage 2: Discovery Call
DISCOVERY_CALL_STAGE_ID="94d76438-fa70-4282-a4df-ad5286a6bf76"

# Stage 3: Initial Prototype
INITIAL_PROTOTYPE_STAGE_ID="84de19a4-2f96-4932-ab9c-8ddf4ba29a45"

# Stage 4: Prototype Review Meeting
PROTOTYPE_REVIEW_MEETING_STAGE_ID="e336a05d-cf8b-40d6-9ab7-f7952199e18e"

# Stage 5: Prototype Update Round
PROTOTYPE_UPDATE_ROUND_STAGE_ID="bc431d28-10b2-4c0f-bf80-71744c202eb0"

# Stage 6: Final Prototype Review
FINAL_PROTOTYPE_REVIEW_STAGE_ID="af821356-d6a6-4c6b-a379-36c0ea30e2b6"

# Stage 7: Technical Developer Review
TECHNICAL_DEVELOPER_REVIEW_STAGE_ID="f7791bd6-bb2d-49ab-9f86-bdd486570564"

# Stage 8: Cost Analysis & Timeline Review
COST_ANALYSIS_TIMELINE_REVIEW_STAGE_ID="397db6fe-f6fa-41eb-82a2-7d14f3b09aca"

# Stage 9: Contract & Proposal
CONTRACT_PROPOSAL_STAGE_ID="52ed5cd7-4539-4e65-93ef-29d5fa14e3c2"

# Stage 10: Development Roadmap
DEVELOPMENT_ROADMAP_STAGE_ID="f0a8c85c-944b-452c-bd8e-e619d10f3150"

# Stage 11: Product Delivery
PRODUCT_DELIVERY_STAGE_ID="5762923f-6951-4dc9-b19e-81fee9d4675a"
```

### Most Common Stage IDs for Workflows

```javascript
// JavaScript/JSON format for n8n workflows
const COMMON_STAGES = {
  newLead: "6c36dbcf-5711-4759-bbb8-182527cb0758",
  discoveryCall: "94d76438-fa70-4282-a4df-ad5286a6bf76",
  initialPrototype: "84de19a4-2f96-4932-ab9c-8ddf4ba29a45",
  finalPrototypeReview: "af821356-d6a6-4c6b-a379-36c0ea30e2b6",
  contractProposal: "52ed5cd7-4539-4e65-93ef-29d5fa14e3c2",
  productDelivery: "5762923f-6951-4dc9-b19e-81fee9d4675a",
};
```

### n8n Environment Variables Template

```bash
# GoHighLevel Production Configuration
GOHIGHLEVEL_LOCATION_ID="QLyYYRoOhCg65lKW9HDX"
GOHIGHLEVEL_PIPELINE_ID="uR2CMkTiwqoUOYuf8oGR"
GOHIGHLEVEL_NEW_LEAD_STAGE_ID="6c36dbcf-5711-4759-bbb8-182527cb0758"
GOHIGHLEVEL_PROTOTYPE_STAGE_ID="84de19a4-2f96-4932-ab9c-8ddf4ba29a45"
GOHIGHLEVEL_DELIVERY_STAGE_ID="5762923f-6951-4dc9-b19e-81fee9d4675a"
```

### JSON Configuration for n8n Nodes

#### Create Contact Node Configuration

```json
{
  "resource": "contact",
  "operation": "create",
  "locationId": "QLyYYRoOhCg65lKW9HDX",
  "additionalFields": {
    "pipelineId": "uR2CMkTiwqoUOYuf8oGR",
    "pipelineStageId": "6c36dbcf-5711-4759-bbb8-182527cb0758"
  }
}
```

#### Update Pipeline Stage Node Configuration

```json
{
  "resource": "contact",
  "operation": "update",
  "contactId": "={{ $json.contactId }}",
  "updateFields": {
    "pipelineId": "uR2CMkTiwqoUOYuf8oGR",
    "pipelineStageId": "84de19a4-2f96-4932-ab9c-8ddf4ba29a45"
  }
}
```

### API Endpoints Reference

```bash
# Base URL
BASE_URL="https://rest.gohighlevel.com/v1"

# Common endpoints
CONTACTS_ENDPOINT="/contacts/"
PIPELINES_ENDPOINT="/pipelines/"
LOCATIONS_ENDPOINT="/locations/"
CUSTOM_FIELDS_ENDPOINT="/custom-fields/"
```

### Account Statistics

- **Total Contacts**: 1,120
- **Custom Fields**: 70 configured
- **API Status**: ✅ Verified working
- **Pipeline Stages**: 11 total stages
- **Last API Test**: Successful

### Usage Examples

#### Moving a contact through the pipeline:

1. **New Lead**: `6c36dbcf-5711-4759-bbb8-182527cb0758`
2. **After Discovery**: `94d76438-fa70-4282-a4df-ad5286a6bf76`
3. **Prototype Created**: `84de19a4-2f96-4932-ab9c-8ddf4ba29a45`
4. **Project Delivered**: `5762923f-6951-4dc9-b19e-81fee9d4675a`

#### Quick Stage ID Lookup by Number:

- Stage 1: `6c36dbcf-5711-4759-bbb8-182527cb0758`
- Stage 2: `94d76438-fa70-4282-a4df-ad5286a6bf76`
- Stage 3: `84de19a4-2f96-4932-ab9c-8ddf4ba29a45`
- Stage 11: `5762923f-6951-4dc9-b19e-81fee9d4675a`

---

**Last Updated**: API configuration verified and tested  
**Source**: GoHighLevel API test results  
**Status**: ✅ Production ready
