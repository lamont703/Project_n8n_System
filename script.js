document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const browseBtn = document.getElementById('browseBtn');
    const fileInput = document.getElementById('fileInput');
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const transcribeBtn = document.getElementById('transcribeBtn');
    const progressContainer = document.getElementById('progressContainer');
    const statusText = document.getElementById('statusText');
    const progressBar = document.getElementById('progressBar');
    const result = document.getElementById('result');
    const error = document.getElementById('error');
    const repoLink = document.getElementById('repoLink');
    const pagesLink = document.getElementById('pagesLink');
    const transcriptText = document.getElementById('transcriptText');
    const copyBtn = document.getElementById('copyBtn');

    const AGENT_URL = "http://127.0.0.1:5001/process-audio";
    let selectedFile = null;

    // --- Event Listeners ---
    dropZone.addEventListener('click', () => fileInput.click());
    browseBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => handleFileSelect(e.target.files));
    transcribeBtn.addEventListener('click', handleProcessRequest);
    copyBtn.addEventListener('click', handleCopy);

    // Drag and Drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        handleFileSelect(e.dataTransfer.files);
    });

    // --- Functions ---
    function handleFileSelect(files) {
        if (files.length === 0) return;
        selectedFile = files[0];
        fileName.textContent = `File: ${selectedFile.name}`;
        fileSize.textContent = `Size: ${formatFileSize(selectedFile.size)}`;
        fileInfo.style.display = 'block';
        transcribeBtn.disabled = false;
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    async function handleProcessRequest() {
        if (!selectedFile) {
            showError('Please select a file first.');
            return;
        }

        // Reset UI
        transcribeBtn.disabled = true;
        transcribeBtn.textContent = 'Processing...';
        progressContainer.style.display = 'block';
        result.style.display = 'none';
        error.style.display = 'none';
        updateStatus('Uploading file to agent...');
        updateProgress(10);

        try {
            const formData = new FormData();
            formData.append('audioFile', selectedFile);

            updateStatus('Agent is processing... This may take a few minutes.');
            updateProgress(30);

            const response = await fetch(AGENT_URL, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Request failed with status ${response.status}`);
            }

            const data = await response.json();
            updateProgress(100);
            updateStatus('Processing complete!');
            displayResult(data);

        } catch (err) {
            console.error('Processing error:', err);
            updateProgress(100);
            showError(`Processing failed: ${err.message}`);
        } finally {
            transcribeBtn.disabled = false;
            transcribeBtn.textContent = 'Create Wireframe';
        }
    }

    function updateStatus(message) {
        statusText.textContent = message;
    }

    function updateProgress(percent) {
        progressBar.style.width = `${percent}%`;
    }

    function showError(message) {
        error.textContent = message;
        error.style.display = 'block';
        progressContainer.style.display = 'none';
    }

    function displayResult(data) {
        // Ensure the main result container is visible
        result.style.display = 'block';

        // Set the href attributes for the links
        repoLink.href = data.repo_url;
        pagesLink.href = data.pages_url;

        // Construct the text content
        const fullResultText = `AGENT'S DESIGN BRIEF:\n\n${data.wireframe}\n\n\nFULL TRANSCRIPT:\n\n${data.transcript}`;
        transcriptText.textContent = fullResultText;
    }

    function handleCopy() {
        const text = transcriptText.textContent;
        navigator.clipboard.writeText(text).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy Full Output';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }
});
