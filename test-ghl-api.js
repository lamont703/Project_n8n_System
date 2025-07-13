#!/usr/bin/env node

/**
 * GoHighLevel API Key Test Script
 * This script tests your GHL API key to verify it's working correctly
 */

const https = require('https');
const readline = require('readline');

// ANSI color codes for better output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bright: '\x1b[1m'
};

class GHLAPITester {
  constructor() {
    this.apiKey = '';
    this.baseUrl = 'rest.gohighlevel.com';
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  async askForAPIKey() {
    return new Promise((resolve) => {
      this.rl.question('Enter your GoHighLevel API Key: ', (answer) => {
        resolve(answer.trim());
      });
    });
  }

  makeRequest(path, method = 'GET') {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: this.baseUrl,
        path: path,
        method: method,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'GHL-API-Tester/1.0',
          'Version': '2021-07-28'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              data: jsonData
            });
          } catch (error) {
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              data: data
            });
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      req.end();
    });
  }

  async testBasicConnection() {
    this.log('\n🔍 Testing basic API connection...', 'blue');
    
    try {
      const response = await this.makeRequest('/v1/locations/');
      
      if (response.statusCode === 200) {
        this.log('✅ API Connection: SUCCESS', 'green');
        this.log(`   Status Code: ${response.statusCode}`, 'green');
        
        if (response.data && response.data.locations) {
          this.log(`   Found ${response.data.locations.length} location(s)`, 'green');
          
          // Show first location info
          if (response.data.locations.length > 0) {
            const firstLocation = response.data.locations[0];
            this.log(`   First Location: ${firstLocation.name || 'N/A'}`, 'green');
            this.log(`   Location ID: ${firstLocation.id || 'N/A'}`, 'green');
          }
        } else if (response.data && response.data.id) {
          // Single location response
          this.log(`   Location Name: ${response.data.name || 'N/A'}`, 'green');
          this.log(`   Location ID: ${response.data.id || 'N/A'}`, 'green');
        }
        
        return true;
      } else {
        this.log('❌ API Connection: FAILED', 'red');
        this.log(`   Status Code: ${response.statusCode}`, 'red');
        this.log(`   Response: ${JSON.stringify(response.data, null, 2)}`, 'red');
        return false;
      }
    } catch (error) {
      this.log('❌ API Connection: ERROR', 'red');
      this.log(`   Error: ${error.message}`, 'red');
      return false;
    }
  }

  async testContactsAccess() {
    this.log('\n👥 Testing contacts access...', 'blue');
    
    try {
      const response = await this.makeRequest('/v1/contacts/?limit=1');
      
      if (response.statusCode === 200) {
        this.log('✅ Contacts Access: SUCCESS', 'green');
        this.log(`   Status Code: ${response.statusCode}`, 'green');
        
        if (response.data && response.data.contacts) {
          this.log(`   Total Contacts Available: ${response.data.meta?.total || 'Unknown'}`, 'green');
        } else if (response.data && Array.isArray(response.data)) {
          this.log(`   Found ${response.data.length} contact(s) in response`, 'green');
        }
        
        return true;
      } else {
        this.log('❌ Contacts Access: FAILED', 'red');
        this.log(`   Status Code: ${response.statusCode}`, 'red');
        this.log(`   Response: ${JSON.stringify(response.data, null, 2)}`, 'red');
        return false;
      }
    } catch (error) {
      this.log('❌ Contacts Access: ERROR', 'red');
      this.log(`   Error: ${error.message}`, 'red');
      return false;
    }
  }

  async testPipelinesAccess() {
    this.log('\n🔄 Testing pipelines access...', 'blue');
    
    try {
      const response = await this.makeRequest('/v1/pipelines/');
      
      if (response.statusCode === 200) {
        this.log('✅ Pipelines Access: SUCCESS', 'green');
        this.log(`   Status Code: ${response.statusCode}`, 'green');
        
        if (response.data && response.data.pipelines) {
          this.log(`   Found ${response.data.pipelines.length} pipeline(s)`, 'green');
          
          // Show pipeline info
          response.data.pipelines.forEach((pipeline, index) => {
            this.log(`   Pipeline ${index + 1}: ${pipeline.name || 'N/A'}`, 'green');
            this.log(`     ID: ${pipeline.id || 'N/A'}`, 'green');
            if (pipeline.stages && pipeline.stages.length > 0) {
              this.log(`     Stages: ${pipeline.stages.length}`, 'green');
              pipeline.stages.forEach((stage, stageIndex) => {
                this.log(`       Stage ${stageIndex + 1}: ${stage.name || 'N/A'} (ID: ${stage.id || 'N/A'})`, 'green');
              });
            }
          });
        } else if (response.data && Array.isArray(response.data)) {
          this.log(`   Found ${response.data.length} pipeline(s)`, 'green');
          
          // Show pipeline info for array response
          response.data.forEach((pipeline, index) => {
            this.log(`   Pipeline ${index + 1}: ${pipeline.name || 'N/A'}`, 'green');
            this.log(`     ID: ${pipeline.id || 'N/A'}`, 'green');
            if (pipeline.stages && pipeline.stages.length > 0) {
              this.log(`     Stages: ${pipeline.stages.length}`, 'green');
              pipeline.stages.forEach((stage, stageIndex) => {
                this.log(`       Stage ${stageIndex + 1}: ${stage.name || 'N/A'} (ID: ${stage.id || 'N/A'})`, 'green');
              });
            }
          });
        }
        
        return true;
      } else {
        this.log('❌ Pipelines Access: FAILED', 'red');
        this.log(`   Status Code: ${response.statusCode}`, 'red');
        this.log(`   Response: ${JSON.stringify(response.data, null, 2)}`, 'red');
        return false;
      }
    } catch (error) {
      this.log('❌ Pipelines Access: ERROR', 'red');
      this.log(`   Error: ${error.message}`, 'red');
      return false;
    }
  }

  async testCustomFieldsAccess() {
    this.log('\n🏷️  Testing custom fields access...', 'blue');
    
    try {
      const response = await this.makeRequest('/v1/custom-fields/');
      
      if (response.statusCode === 200) {
        this.log('✅ Custom Fields Access: SUCCESS', 'green');
        this.log(`   Status Code: ${response.statusCode}`, 'green');
        
        if (response.data && response.data.customFields) {
          this.log(`   Found ${response.data.customFields.length} custom field(s)`, 'green');
        } else if (response.data && Array.isArray(response.data)) {
          this.log(`   Found ${response.data.length} custom field(s)`, 'green');
        }
        
        return true;
      } else {
        this.log('❌ Custom Fields Access: FAILED', 'red');
        this.log(`   Status Code: ${response.statusCode}`, 'red');
        this.log(`   Response: ${JSON.stringify(response.data, null, 2)}`, 'red');
        return false;
      }
    } catch (error) {
      this.log('❌ Custom Fields Access: ERROR', 'red');
      this.log(`   Error: ${error.message}`, 'red');
      return false;
    }
  }

  async runAllTests() {
    this.log(`${colors.bright}🚀 GoHighLevel API Key Tester${colors.reset}`, 'blue');
    this.log('═══════════════════════════════════════', 'blue');
    
    this.apiKey = await this.askForAPIKey();
    
    if (!this.apiKey) {
      this.log('❌ No API key provided. Exiting.', 'red');
      this.rl.close();
      return;
    }
    
    this.log('\n🔄 Starting API tests...', 'yellow');
    
    const tests = [
      this.testBasicConnection(),
      this.testContactsAccess(),
      this.testPipelinesAccess(),
      this.testCustomFieldsAccess()
    ];
    
    const results = await Promise.allSettled(tests);
    
    // Summary
    this.log('\n📊 TEST SUMMARY', 'bright');
    this.log('═══════════════════════════════════════', 'blue');
    
    const passed = results.filter(r => r.status === 'fulfilled' && r.value === true).length;
    const total = results.length;
    
    if (passed === total) {
      this.log(`✅ All tests passed! (${passed}/${total})`, 'green');
      this.log('\n🎉 Your GoHighLevel API key is working correctly!', 'green');
      this.log('You can now use this API key in your n8n workflow.', 'green');
    } else {
      this.log(`⚠️  Some tests failed. (${passed}/${total} passed)`, 'yellow');
      this.log('\n💡 Recommendations:', 'yellow');
      this.log('• Check your API key permissions in GoHighLevel', 'yellow');
      this.log('• Make sure you have access to contacts, pipelines, and custom fields', 'yellow');
      this.log('• Verify your API key is active and not expired', 'yellow');
    }
    
    this.rl.close();
  }
}

// Run the tester
const tester = new GHLAPITester();
tester.runAllTests().catch(console.error); 