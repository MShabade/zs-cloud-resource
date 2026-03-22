# ☁ Cloud Resource Utilization Management System

## Overview

This project is a **Cloud Resource Utilization Management System** designed to help organizations like **ZS Associates** monitor and manage cloud resources efficiently.

It simulates tracking of:

- CPU usage  
- Memory usage  
- Storage capacity  
- Cloud billing costs  

The system provides a **web-based dashboard** where users can view resources, manage them, and monitor usage in real-time with color-coded health indicators.

> ⚠ Note: This project is **partially implemented**. Some advanced features are planned for future development.

---

## Features Implemented

- **Dashboard Interface:** A simple web page displays resource data in a table.  
- **View Resources:** List all cloud resources with CPU, memory, storage, and billing details.  
- **Basic CRUD:** Add, update, and delete resources using a form connected to a JSON file.  
- **Search by Name:** Filter resources by name.  
- **Real-time Table Refresh:** Data can refresh automatically for a basic real-time feel.  
- **Color-coded Health Indicators:** CPU and memory usage are colored based on thresholds:
  - Green = Normal  
  - Yellow = Warning  
  - Red = Critical  

---

## Features Planned

- **Advanced Reporting:** Graphs and trends of resource usage over time.  
- **Configurable Thresholds:** Store thresholds in a separate configuration file.
- **Cloud Integration:** Connect to real cloud providers (AWS, Azure, GCP) to monitor live resources.  
- **Enhanced UI:** Progress bars, cards, and improved dashboard styling.

---

## How It Works (Current Version)

1. **Frontend (`public/`)**  
   - `index.html` provides a dashboard and form.  
   - `app.js` handles API requests, table rendering, and color-coded metrics.

2. **Backend (`server.js`)**  
   - Node.js server receives API requests (GET, PUT, DELETE).  
   - Reads/writes resource data from `data/resources.json`.  

3. **Data Storage**  
   - Stores cloud resources in a JSON file.  
   - Each resource has: `id`, `name`, `cpu`, `memory`, `storage`, `billing`.  

4. **Health Indicators**  
   - CPU and memory usage evaluated against thresholds.  
   - Table cells change color based on usage levels.

---

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js (built-in HTTP module)  
- **Data Storage:** JSON file  
- **Styling:** CSS grid layout, color-coded metrics

---

## Setup & Installation

1. **Clone the repository**

```bash
git clone https://github.com/MShabade/zs-cloud-resource.git
cd zs-cloud-resource
