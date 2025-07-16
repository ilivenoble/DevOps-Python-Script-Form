document
  .getElementById("github-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const github_token = document.getElementById("github_token").value.trim();
    const repo_owner = document.getElementById("repo_owner").value.trim();
    const repo_name = document.getElementById("repo_name").value.trim();
    const api_key = document.getElementById("api_key").value.trim();

    // You can change the URL to your Python backend endpoint
    const url = "/submit"; // e.g., Flask: @app.route('/submit', methods=['POST'])

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          GITHUB_TOKEN: github_token,
          REPO_OWNER: repo_owner,
          REPO_NAME: repo_name,
          API_KEY: api_key,
        }),
      });

      const messageDiv = document.getElementById("message");
      if (response.ok) {
        const data = await response.json();
        messageDiv.style.color = "#22863a";
        messageDiv.textContent = data.message || "Form submitted successfully!";
        document.getElementById("github-form").reset();
      } else {
        const err = await response.json();
        messageDiv.style.color = "#d72c2c";
        messageDiv.textContent = err.message || "Submission failed!";
      }
    } catch (error) {
      document.getElementById("message").style.color = "#d72c2c";
      document.getElementById("message").textContent =
        "Network error. Please try again.";
    }
  });
