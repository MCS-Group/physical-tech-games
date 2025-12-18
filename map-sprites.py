import csv
from pathlib import Path
import unicodedata

# Configuration
CSV_INPUT = 'players_2.csv'
CSV_OUTPUT = 'players_2_with_sprites.csv'
SPRITE_BASE_DIR = Path('assets/pixel_art_no_bg')

# Mongolian Cyrillic to Latin transliteration map
CYRILLIC_TO_LATIN = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'j', 'з': 'z', 'и': 'i', 'й': 'i', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'ө': 'u', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
    'у': 'u', 'ү': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh',
    'щ': 'sh', 'ъ': '', 'ы': 'i', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
    'Ж': 'J', 'З': 'Z', 'И': 'I', 'Й': 'I', 'К': 'K', 'Л': 'L', 'М': 'M',
    'Н': 'N', 'О': 'O', 'Ө': 'U', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
    'У': 'U', 'Ү': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh',
    'Щ': 'Sh', 'Ъ': '', 'Ы': 'I', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
}

def transliterate_mongolian(name):
    """Transliterate Mongolian Cyrillic to Latin"""
    if not name:
        return ""
    result = []
    for char in name:
        result.append(CYRILLIC_TO_LATIN.get(char, char))
    return ''.join(result)

def normalize_name(name):
    """Normalize name for comparison (lowercase, remove accents)"""
    if not name:
        return ""
    # Normalize unicode characters
    normalized = unicodedata.normalize('NFD', name)
    # Remove accents and convert to lowercase
    return ''.join(c for c in normalized if unicodedata.category(c) != 'Mn').lower()

def find_sprite_file(firstname, company, sprite_dir):
    """Find matching sprite file for a person"""
    if not firstname or not company:
        return ""

    company_dir = sprite_dir / company

    if not company_dir.exists():
        return ""

    # Get all sprite files in the company directory
    sprite_files = list(company_dir.glob('*_sprite.png'))

    # Normalize the firstname for comparison
    normalized_firstname = normalize_name(firstname)

    # Also transliterate if it's Cyrillic
    transliterated_firstname = normalize_name(transliterate_mongolian(firstname))

    # Try to find exact match (both Cyrillic and transliterated)
    for sprite_file in sprite_files:
        sprite_name = sprite_file.stem.replace('_sprite', '')
        normalized_sprite_name = normalize_name(sprite_name)

        if normalized_firstname == normalized_sprite_name:
            return f"{company}/{sprite_file.name}"

        if transliterated_firstname == normalized_sprite_name:
            return f"{company}/{sprite_file.name}"

    # Try partial match (firstname contains or is contained in sprite name)
    for sprite_file in sprite_files:
        sprite_name = sprite_file.stem.replace('_sprite', '')
        normalized_sprite_name = normalize_name(sprite_name)

        if normalized_firstname in normalized_sprite_name or normalized_sprite_name in normalized_firstname:
            return f"{company}/{sprite_file.name}"

        if transliterated_firstname in normalized_sprite_name or normalized_sprite_name in transliterated_firstname:
            return f"{company}/{sprite_file.name}"

    return ""

# Read the CSV and add sprite column
print("=" * 60)
print("Sprite Mapping Script")
print("=" * 60)

rows = []
with open(CSV_INPUT, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames

    # Add 'sprite' column if it doesn't exist
    if 'sprite' not in fieldnames:
        fieldnames = list(fieldnames) + ['sprite']

    print(f"\nProcessing {CSV_INPUT}...")

    matched = 0
    unmatched = 0
    unmatched_details = []

    for row in reader:
        firstname = row.get('firstname', '')
        company = row.get('company', '')
        row_id = row.get('id', '')

        # Find sprite file
        sprite_path = find_sprite_file(firstname, company, SPRITE_BASE_DIR)
        row['sprite'] = sprite_path

        if sprite_path:
            matched += 1
        else:
            unmatched += 1
            if firstname:  # Only show warning if there's a firstname
                unmatched_details.append(f"Row {row_id}: {company}")

        rows.append(row)

    # Show unmatched entries
    if unmatched_details:
        print(f"\n[MISS] Unmatched entries:")
        for detail in unmatched_details[:10]:  # Show first 10
            print(f"  {detail}")
        if len(unmatched_details) > 10:
            print(f"  ... and {len(unmatched_details) - 10} more")

# Write the updated CSV
print(f"\nWriting to {CSV_OUTPUT}...")
with open(CSV_OUTPUT, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print("\n" + "=" * 60)
print("Summary")
print("=" * 60)
print(f"Total rows: {len(rows)}")
print(f"  [OK] Matched: {matched}")
print(f"  [MISS] Unmatched: {unmatched}")
print(f"\nOutput saved to: {CSV_OUTPUT}")
