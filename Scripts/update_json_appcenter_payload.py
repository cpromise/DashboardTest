import json
import sys
from utils import path_from_repo

FILE_PATH = path_from_repo("/src/variables/appcenter_payload.json")

def load_json(file_path):
    """Load data from JSON file."""
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
    except FileNotFoundError:
        data = []
    return data

def save_json(file_path, data):
    """Save data to JSON file."""
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

def update_or_append(file_path, new_record):
    """Update or append a record to the JSON data."""
    data = load_json(file_path)
    
    # Check if the record with the same date already exists
    for index, record in enumerate(data):
        if record['date'] == new_record['date']:
            # Update only the fields that have values
            for key, value in new_record.items():
                if value is not None:  # Skip None values
                    record[key] = value
            break
    else:
        # Append the new record if no match is found
        data.append(new_record)
    
    save_json(file_path, data)
    print(f"Record updated/appended successfully in {file_path}.")

def parse_date(date_str):
    date_part = date_str.split("T")[0]
    return date_part

if __name__ == "__main__":
    if len(sys.argv) < 5:
        print("Usage: python script.py <date> <sha> <url> [size] [duration]")
        sys.exit(1)

    date = sys.argv[1]
    sha = sys.argv[2]
    appcenter = sys.argv[3]
    
    # Attempt to parse optional fields if provided
    size = int(sys.argv[4]) if len(sys.argv) > 4 and sys.argv[4] else None
    duration = float(sys.argv[5]) if len(sys.argv) > 5 and sys.argv[5] else None

    # Check if both size and duration are missing
    if size is None and duration is None:
        print("Error: Either size or duration must be provided.")
        sys.exit(1)

    size_megabyte = size / 1_000_000
    size_megabyte = round(size_megabyte, 1)
    new_record = {
        "date": parse_date(date),
        "sha": sha,
        "appcenter": appcenter,
        "size": size_megabyte,
        "time": duration
    }

    update_or_append(FILE_PATH, new_record)