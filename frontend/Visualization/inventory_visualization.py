# inventory_visualization.py

import requests
import matplotlib.pyplot as plt

# ERP Inventory API URL
API_URL = "http://localhost:5000/api/inventory"

# Fetch inventory data
def fetch_inventory():
    try:
        response = requests.get(API_URL)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print("Error fetching inventory:", e)
        return []

# Plot inventory quantities
def plot_inventory(chart_type="bar"):
    items = fetch_inventory()
    if not items:
        print("No inventory data found.")
        return

    names = [item['name'] for item in items]
    quantities = [item['quantity'] for item in items]

    plt.figure(figsize=(10, 6))

    if chart_type == "bar":
        plt.bar(names, quantities, color='teal')
    elif chart_type == "line":
        plt.plot(names, quantities, marker='o', linestyle='-', color='orange')
    elif chart_type == "pie":
        plt.pie(quantities, labels=names, autopct="%1.1f%%", startangle=140)
    else:
        print("Invalid chart type, defaulting to bar chart.")
        plt.bar(names, quantities, color='teal')

    plt.title("📦 Inventory Stock Levels")

    if chart_type in ["bar", "line"]:
        plt.xlabel("Product Name")
        plt.ylabel("Quantity Available")
        plt.xticks(rotation=45, ha="right")

    plt.tight_layout()
    plt.show()

# Run manually
if __name__ == "__main__":
    choice = input("Enter chart type (bar, line, pie): ").strip().lower()
    plot_inventory(choice)
