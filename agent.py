import os
import requests
import time
import google.generativeai as genai
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import datetime
from github import Github
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Load environment variables from a .env file
load_dotenv()

# --- Configuration ---
# Create a .env file in this directory and add your keys:
# ASSEMBLYAI_API_KEY=your_assemblyai_key
# GEMINI_API_KEY=your_gemini_key
# GITHUB_TOKEN=your_github_personal_access_token
# GITHUB_USERNAME=your_github_username
# EMAIL_ADDRESS=your_email_address
# SENDGRID_API_KEY=your_sendgrid_api_key
# SENDER_EMAIL=your_sender_email
ASSEMBLYAI_API_KEY = os.getenv("ASSEMBLYAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_USERNAME = os.getenv("GITHUB_USERNAME")
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
SENDER_EMAIL = os.getenv("SENDER_EMAIL")


# Configure the Gemini API
genai.configure(api_key=GEMINI_API_KEY)
gemini_model = genai.GenerativeModel('models/gemini-2.0-flash')
# Initialize GitHub
g = Github(GITHUB_TOKEN)
github_user = g.get_user()

# Initialize Flask App
app = Flask(__name__)

# --- AssemblyAI Helper Functions ---
def upload_to_assemblyai(file_storage):
    """Uploads a file to AssemblyAI and returns the upload URL."""
    upload_endpoint = 'https://api.assemblyai.com/v2/upload'
    headers = {'authorization': ASSEMBLYAI_API_KEY}
    response = requests.post(upload_endpoint, headers=headers, data=file_storage.read())
    response.raise_for_status()
    return response.json()['upload_url']

def start_transcription(audio_url):
    """Starts transcription and returns the transcript ID."""
    json = {
        "audio_url": audio_url,
        "speaker_labels": True,
        "punctuate": True,
        "format_text": True
    }
    transcript_endpoint = "https://api.assemblyai.com/v2/transcript"
    headers = {
        "authorization": ASSEMBLYAI_API_KEY,
        "content-type": "application/json"
    }
    response = requests.post(transcript_endpoint, json=json, headers=headers)
    response.raise_for_status()
    return response.json()['id']

def get_transcription_result(transcript_id):
    """Polls AssemblyAI until the transcript is complete."""
    transcript_endpoint = f"https://api.assemblyai.com/v2/transcript/{transcript_id}"
    headers = {"authorization": ASSEMBLYAI_API_KEY}
    while True:
        response = requests.get(transcript_endpoint, headers=headers)
        response.raise_for_status()
        transcript = response.json()
        if transcript['status'] == 'completed':
            return transcript['text']
        elif transcript['status'] == 'error':
            raise Exception(f"Transcription failed: {transcript['error']}")
        print("Transcription in progress...")
        time.sleep(5)

# --- Gemini Helper Function ---
def generate_wireframe_and_html(transcript_text):
    """Generates a high-fidelity wireframe and HTML code using Gemini."""
    prompt = f"""
    You are a world-class UI/UX designer and front-end developer, specializing in creating high-fidelity, visually stunning prototypes that look like they were designed in Figma or Canva.

    **Your Task:**
    1.  **Analyze the Transcript:** Read the provided meeting transcript to understand the project's goals, features, and target audience.
    2.  **Create a Design Brief:** Based on the transcript, write a short "Design Brief & Wireframe Logic" section.
    3.  **Generate a High-Fidelity HTML Prototype:** Create a single, self-contained `index.html` file.

    **Design & Technical Requirements for the HTML Prototype:**

    *   **Aesthetic:** Modern, clean, and professional. Think of a popular template on Canva or a Dribbble-worthy design.
    *   **Theme:** **Dark theme**. Use a dark background color (e.g., `#1a202c`) and light-colored text.
    *   **Layout:** Use CSS Flexbox and Grid to create a dynamic, responsive layout.
    *   **Color Palette:** Choose a harmonious and professional color palette suitable for a dark theme (e.g., a primary color, an accent, and light neutrals for text). Define these as CSS variables for consistency.
    *   **Typography:** Use a clean, readable, and modern web font.
    *   **Imagery:** **Crucially, use high-quality, relevant placeholder images** from `https://source.unsplash.com/` to bring the design to life. Use specific search terms related to the project (e.g., `https://source.unsplash.com/1600x900/?business,tech` or `https://source.unsplash.com/800x600/?team,collaboration`).
    *   **UI Components:** Style components with modern CSS. Use `box-shadow` for depth on cards and buttons, subtle gradients, and proper spacing/padding throughout.
    *   **Interactivity:** Add CSS hover effects to buttons and links to make the prototype feel responsive to the user.
    *   **Self-Contained:** All CSS must be in a `<style>` tag and any minor JS for interactivity (like a mobile menu toggle) must be in a `<script>` tag. No external libraries.
    *   **Code Quality:** The code must be well-commented, explaining each major section.

    **Transcript to Analyze:**
    "{transcript_text}"

    **Required Output Format:**
    Provide the output in a single block. Start with the design brief, use a clear separator, and then provide ONLY the complete, raw HTML code.

    DESIGN BRIEF & WIREFRAME LOGIC:
    [Your detailed design brief and logic here]

    ---HTML-CODE---
    <!DOCTYPE html>
    <html lang="en">
    ...
    </html>
    """
    response = genai.GenerativeModel('models/gemini-2.0-flash').generate_content(prompt)
    
    # Split the response into the two parts
    parts = response.text.split('---HTML-CODE---')
    wireframe_description = parts[0].replace("DESIGN BRIEF & WIREFRAME LOGIC:", "").strip()
    
    if len(parts) > 1:
        html_code = parts[1].strip()
        # Clean up potential markdown formatting
        if html_code.startswith("```html"):
            html_code = html_code[7:]
        if html_code.endswith("```"):
            html_code = html_code[:-3]
        html_code = html_code.strip()
    else:
        html_code = "<!-- HTML generation failed -->"
    
    return wireframe_description, html_code

# --- GitHub Helper Functions ---
def create_github_repo(repo_name):
    """Creates a new public GitHub repository."""
    print(f"Creating GitHub repo named {repo_name}...")
    repo = github_user.create_repo(repo_name, private=False)
    print("Repo created successfully.")
    return repo

def push_to_github(repo, html_content):
    """Pushes the index.html file to the repository."""
    print(f"Pushing index.html to {repo.name}...")
    repo.create_file(
        "index.html",
        "Initial commit: Add wireframe html",
        html_content,
        branch="main"
    )
    print("File pushed successfully.")

def enable_github_pages(repo):
    """Enables GitHub Pages for the repository."""
    print(f"Enabling GitHub Pages for {repo.name}...")
    # The PyGithub library doesn't have a direct way to enable pages with the new source format.
    # We will use requests to call the GitHub API endpoint directly.
    pages_endpoint = f"https://api.github.com/repos/{GITHUB_USERNAME}/{repo.name}/pages"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.switcheroo-preview+json"
    }
    data = {
        "source": {"branch": "main", "path": "/"}
    }
    response = requests.post(pages_endpoint, headers=headers, json=data)
    response.raise_for_status()
    pages_url = response.json().get('html_url')
    print(f"GitHub Pages enabled. URL: {pages_url}")
    return pages_url


# --- Email Helper Function ---
def send_notification_email(transcript, wireframe, repo_url, pages_url):
    """Sends an email with the results using SendGrid."""
    if not SENDGRID_API_KEY or not SENDER_EMAIL:
        print("SendGrid API Key or Sender Email not configured. Skipping email.")
        return

    message_body = f"""
    <h2>Your Wireframe Generation is Complete!</h2>
    <p>Here are the results from your audio upload:</p>
    
    <h3><a href="{repo_url}">GitHub Repository</a></h3>
    <p>The full source code is available here: <a href="{repo_url}">{repo_url}</a></p>
    
    <h3><a href="{pages_url}">Live Wireframe Website</a></h3>
    <p>View the live, deployed wireframe here: <a href="{pages_url}">{pages_url}</a></p>
    
    <hr>
    
    <h3>Wireframe Description:</h3>
    <pre>{wireframe}</pre>
    
    <h3>Full Transcript:</h3>
    <pre>{transcript}</pre>
    """

    message = Mail(
        from_email=SENDER_EMAIL,
        to_emails=EMAIL_ADDRESS,
        subject='Your AI Wireframe is Ready!',
        html_content=message_body
    )
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        print(f"Email sent successfully! Status code: {response.status_code}")
    except Exception as e:
        print(f"Error sending email: {e}")


# --- Flask API Endpoint ---
@app.route('/process-audio', methods=['POST'])
def process_audio_endpoint():
    """Main endpoint to handle the entire workflow."""
    if 'audioFile' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files['audioFile']

    try:
        # 1. Transcribe with AssemblyAI
        print("Uploading to AssemblyAI...")
        audio_url = upload_to_assemblyai(audio_file)
        print(f"Upload complete. Audio URL: {audio_url}")

        print("Starting transcription...")
        transcript_id = start_transcription(audio_url)
        print(f"Transcription started. ID: {transcript_id}")

        transcript_text = get_transcription_result(transcript_id)
        if not transcript_text:
            return jsonify({"error": "No speech detected in audio."}), 400
        print(f"Transcription complete.")

        # 2. Generate Wireframe and HTML with Gemini
        print("Generating wireframe and HTML with Gemini...")
        wireframe_description, html_code = generate_wireframe_and_html(transcript_text)
        print(f"Content generation complete.")

        # 3. Create GitHub Repo and push file
        repo_name = f"wireframe-project-{datetime.datetime.now().strftime('%Y-%m-%d-%H%M%S')}"
        repo = create_github_repo(repo_name)
        push_to_github(repo, html_code)
        
        # 4. Enable GitHub Pages
        # It can take a minute for the repo to be ready for Pages activation
        print("Waiting for GitHub to process the new repository...")
        time.sleep(20) # Increased wait time for GitHub to be ready
        pages_url = enable_github_pages(repo)

        # 5. Send email notification
        send_notification_email(transcript_text, wireframe_description, repo.html_url, pages_url)

        # 6. Return the final result
        return jsonify({
            "transcript": transcript_text,
            "wireframe": wireframe_description,
            "repo_url": repo.html_url,
            "pages_url": pages_url
        })

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Runs the Flask app locally on port 5001
    app.run(debug=True, port=5001)
