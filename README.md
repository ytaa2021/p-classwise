# p-classwise

## GitHub Guidelines:

### Setup:
- **Installation:** Download and install [GitHub Desktop](https://desktop.github.com/).
- **Authentication:** Sign in with your GitHub account.
- **Initial Setup:** Clone the repository via File > Clone Repository.

### Branching:
- **Principle:** Always work in branches.
- **Branch Creation:** Create a new branch with a descriptive name for each feature/fix.
- **Branch Switching:** Switch between branches using the Current Branch dropdown.

### Committing Changes:
- **Commit Regularly:** Commit changes with meaningful messages.
- **Staging and Committing:** Stage your changes, then click 'Commit'.

### Syncing with Remote Repository:
- **Fetch Updates:** Fetch often with 'Fetch origin' to see remote updates.
- **Pushing:** Push your commits with 'Push origin'.
- **Pulling:** Pull the latest changes from main using 'Pull'.

### Creating Pull Requests:
- **PR Creation:** After pushing your branch, click 'Create Pull Request'.
- **Review Process:** Add necessary comments and tag reviewers on the GitHub site.

### Handling Merge Conflicts:
- **Conflict Resolution:** Resolve conflicts in the indicated files by editing the conflict markers and then commit the resolved files.

### Pair Programming:
- **Collaboration Tool:** Use [VSCode Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare).
- **Joint Work:** For joint commits, use the `Co-authored-by` tag in commit messages.

### Best Practices:
- Work only in branches. Never directly on `main`.
- Commit frequently with clear messages.
- Always test locally before pushing.
- PRs must be reviewed by at least 1-2 team members.
- Ensure open communication within the team.

## Front End:
- **Framework:** We're using [React](https://reactjs.org/) for our frontend. Make sure to have [Node.js](https://nodejs.org/) installed.
- **Setup:** Navigate to the frontend directory and run `npm install` to install necessary dependencies.
- **Running Locally:** Use `npm start` to launch the local development server.
- **Building:** Use `npm run build` to create an optimized build.

## Back End:
- **Framework:** We are utilizing [Flask](https://flask.palletsprojects.com/) for our backend.
- **Setting up Virtual Environment:**
  - **Navigation:** Navigate to the project's directory (open in GH Desktop).
  - **Creation:** Create the local venv using `python -m venv venv`.
  - **Activation:**
    - Windows: `.\venv\Scripts\activate`
    - Mac or Linux: `source venv/bin/activate`
  - **Dependencies:** Install required packages using `pip install -r requirements.txt`.
  - **Deactivation:** Exit the virtual environment with `deactivate`.
