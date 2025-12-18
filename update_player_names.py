#!/usr/bin/env python3
import re

# Read the players.js file
with open('players.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Function to extract firstname from full name
def extract_firstname(full_name):
    # Remove (Generated) suffix
    full_name = full_name.replace(' (Generated)', '')

    # Split by space and take the first part (firstname)
    parts = full_name.strip().split()
    if len(parts) > 0:
        return parts[0]
    return full_name

# Find all name entries in the format: name: "Full Name"
def replace_name(match):
    full_name = match.group(1)

    # Check if it has (Generated) - replace with NP
    if '(Generated)' in full_name:
        firstname = extract_firstname(full_name)
        return f'name: "{firstname} NP"'
    else:
        # Just extract firstname
        firstname = extract_firstname(full_name)
        return f'name: "{firstname}"'

# Replace all name fields
pattern = r'name: "([^"]+)"'
content = re.sub(pattern, replace_name, content)

# Write back
with open('players.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Player names updated successfully!")
print("- Full names replaced with firstnames only")
print("- '(Generated)' replaced with 'NP' suffix")
