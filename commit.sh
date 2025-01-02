#!/bin/bash

echo "========================================================"
echo ">>> Cursor Ai <<<"
echo "Write in Chat to '@PR (Diff with Main Branch)'"
echo "Do not include any files."
echo "You are an engineer who wants to commit changes to the remote codebase. Your job is it to provide a short commit message about the recent changes as a one-liner."
echo "========================================================"

# Check if there are any changes to commit
if [[ -z $(git status -s) ]]; then
    echo "No changes to commit"
    exit 0
fi

# Show current changes
git status

# Get commit message from argument or prompt
if [ "$#" -eq 0 ]; then
    echo "Enter commit message:"
    read -r commit_message
    if [[ -z "$commit_message" ]]; then
        echo "Error: Commit message cannot be empty"
        exit 1
    fi
else
    commit_message="$*"
fi

# Add all changes
git add .

# Commit with the provided message
git commit -m "$commit_message"

# Push to the current branch
git push

echo "Changes committed and pushed successfully!"

# Print GitHub Actions workflow URL
echo "========================================================"
echo ">>> GitHub Actions <<<"
echo "View build status at:"
echo "https://github.com/svenmalvik/svenmalvik.com/actions/workflows/pages/pages-build-deployment"
echo "========================================================"